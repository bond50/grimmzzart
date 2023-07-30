import {useState} from 'react';

const useTogglePasswordVisibility = (form, setForm) => {
    const [passwordVisible, setPasswordVisible] = useState({});

    const togglePasswordVisibility = (id) => {
        setPasswordVisible((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));

        setForm((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                visible: !prevState[id].visible,
            },
        }));
    };

    return [passwordVisible, togglePasswordVisibility];
};

export default useTogglePasswordVisibility;
