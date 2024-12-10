import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './Counter.css';

function Counter(props) {
    let [count, setCount] = useState(0)
    
    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    return (
        <div style={{textAlign: 'center'}} className="Counter">
            <header className="Counter-header">
                <h3>Starter Lotus</h3>
                <div className="Buttons">
                    <Button variant="contained" onClick={increment}>+</Button>
                    <span> {count} </span>
                    <Button variant="contained" onClick={decrement}>-</Button>
                    <p>
                        This page was written on <code>Counter.jsx</code>.
                    </p>
                    <h1 className="Tester">ahhh</h1>
                </div>
            </header>
        </div>      
    );
};

export default Counter;