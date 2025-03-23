import { useNavigate } from 'react-router-dom';

export const useBackNavigation = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return handleBack;
};

export default useBackNavigation;