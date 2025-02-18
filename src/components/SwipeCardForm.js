import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useBackNavigation } from '../utils/navigationUtils';
import { supabase } from '../utils/supabase.ts';
import { getFromSupabase } from '../utils/supabaseUtils';
import { createSwipeCard, updateSwipeCard } from '../utils/swipeCardUtils';
import { PRESET_QUESTIONS, LONG_LIMIT, SHORT_LIMIT } from '../utils/constants.ts';

const SwipeCardForm = () => {
    const [availability, setAvailability] = useState('');
    const [role] = useState('');
    const [personalBlurb, setPersonalBlurb] = useState('');
    const [questions, setQuestions] = useState([
        { id: '1', question: '', answer: '' },
        { id: '2', question: '', answer: '' },
        { id: '3', question: '', answer: '' },
    ]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [wordCounts, setWordCounts] = useState({ availability: 0, blurb: 0, question1: 0, question2: 0, question3: 0 });

    const navigate = useNavigate();
    const handleBack = useBackNavigation();

    useEffect(() => {
        const fetchSwipeCard = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError) {
                setError('Error fetching user: ' + userError.message);
                return;
            }

            if (!user) {
                setError('User not authenticated');
                return;
            }

            const swipeCardResult = await getFromSupabase(user.id, "swipe_cards");

            if (swipeCardResult.success && swipeCardResult.data) {
                const swipeCard = swipeCardResult.data;
                setAvailability(swipeCard.availability);
                setPersonalBlurb(swipeCard.personal_blurb);
                setQuestions([
                    { id: '1', question: swipeCard.question1, answer: swipeCard.answer1 },
                    { id: '2', question: swipeCard.question2, answer: swipeCard.answer2 },
                    { id: '3', question: swipeCard.question3, answer: swipeCard.answer3 },
                ]);
                setIsUpdating(true);
            }
        };

        fetchSwipeCard();
    }, []);

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handlePresetQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index].question = value;
        setQuestions(newQuestions);
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        if (questions.length < 3) {
            const newQuestion = { id: (questions.length + 1).toString(), question: '', answer: '' };
            setQuestions([...questions, newQuestion]);
        }
    };

    const handleBlurbChange = (e) => {
        const value = e.target.value;
        const words = value.trim().split(/\s+/);
        if (words.length <= LONG_LIMIT) {
            setPersonalBlurb(value);
            setWordCounts({ ...wordCounts, blurb: words.length });
        }
    };

    const handleAvailabilityChange = (e) => {
        const value = e.target.value;
        const words = value.trim().split(/\s+/);
        if (words.length <= LONG_LIMIT) {
            setAvailability(value);
            setWordCounts({ ...wordCounts, availability: words.length });
        }
    };

    const handleAnswerChange = (index, value) => {
        const words = value.trim().split(/\s+/);
        if (words.length <= SHORT_LIMIT) {
            handleQuestionChange(index, 'answer', value);
            setWordCounts({ ...wordCounts, [`question${index + 1}`]: words.length });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) {
            setError('Error fetching user: ' + userError.message);
            return;
        }

        if (!user) {
            setError('User not authenticated');
            return;
        }

        const swipeCardData = {
            user_id: user.id,
            role: role,
            personal_blurb: personalBlurb,
            question1: questions[0]?.question || '',
            answer1: questions[0]?.answer || '',
            question2: questions[1]?.question || '',
            answer2: questions[1]?.answer || '',
            question3: questions[2]?.question || '',
            answer3: questions[2]?.answer || '',
        };

        let swipeCardResult;
        if (isUpdating) {
            swipeCardResult = await updateSwipeCard(swipeCardData);
        } else {
            swipeCardResult = await createSwipeCard(swipeCardData);
        }

        if (!swipeCardResult.success) {
            setError('Error creating swipe card: ' + swipeCardResult.error.message);
        } else {
            setMessage('Swipe card created successfully');
            navigate('/swipe-card');
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const newQuestions = Array.from(questions);
        const [movedQuestion] = newQuestions.splice(result.source.index, 1);
        newQuestions.splice(result.destination.index, 0, movedQuestion);

        setQuestions(newQuestions);
    };

    return (
        <div className="body-default">
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Personal Blurb"
                    className="input-default"
                    value={personalBlurb}
                    onChange={handleBlurbChange}
                />
                <p>{wordCounts.blurb}/{LONG_LIMIT}</p>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="questions">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {questions.map((q, index) => (
                                    <Draggable key={q.id} draggableId={q.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="draggable-item"
                                            >
                                                <span {...provided.dragHandleProps} className="drag-handle">☰</span>
                                                <select
                                                    value={q.question}
                                                    onChange={(e) => handlePresetQuestionChange(index, e.target.value)}
                                                >
                                                    <option value="">Select a question</option>
                                                    {PRESET_QUESTIONS.map((PRESET_QUESTIONS, i) => (
                                                        <option key={i} value={PRESET_QUESTIONS}>{PRESET_QUESTIONS}</option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="text"
                                                    className="input-default"
                                                    placeholder={'Your answer here'}
                                                    value={q.answer}
                                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                />
                                                <p>{wordCounts[`answer${index + 1}`]}/{SHORT_LIMIT}</p>
                                                <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove</button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                {questions.length < 3 && (
                    <button type="button" onClick={handleAddQuestion}>Add Question</button>
                )}
                <textarea
                    placeholder="General availability (ex. weekdays after 5pm, tu/wed at lunch)"
                    value={availability}
                    onChange={handleAvailabilityChange}
                    className="input-default"
                />
                <button type="button" className="button" onClick={handleBack}>Cancel without saving</button>
                <button type="submit" className="button">{isUpdating ? 'Update Swipe Card' : 'Create Swipe Card'}</button>
                {message && <p>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default SwipeCardForm;