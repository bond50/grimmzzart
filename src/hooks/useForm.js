import { useSelector } from "react-redux";
import { checkValidity, updateObject } from '../common/Utility';

const useForm = (setForm, setFormIsValid) => {
    const { auth } = useSelector(state => state)

    return (event, inputIdentifier) => {
        let value;
        let selectedOption;
        switch (inputIdentifier) {
            case "role":
            case "gender":
                value = event.value;
                selectedOption = event;
                break;
            case "dob":
                value = event;
                break;
            case "remember":
            case "terms":
                value = event.target.checked;
                break;
            default:
                value = event.target.value;
        }

        setForm((prevState) => {
            const validationResult = checkValidity(value, prevState[inputIdentifier]);

            const updatedFormElement = updateObject(prevState[inputIdentifier], {
                value,
                selectedOption: selectedOption || null,
                valid: validationResult.isValid,
                validationMessage: validationResult.validationMessage,
                touched: true,
            });

            const updatedForm = updateObject(prevState, {
                [inputIdentifier]: updatedFormElement,
            });

            if (inputIdentifier === 'password' && updatedForm.confirmPassword) {
                const confirmPasswordField = updatedForm.confirmPassword;
                updatedForm.confirmPassword = updateObject(confirmPasswordField, {
                    validation: updateObject(confirmPasswordField.validation, {
                        passwordValue: value,
                    }),
                });
            }

            const formIsValid = Object.keys(updatedForm).every((key) => updatedForm[key].valid);
            setFormIsValid(formIsValid);

            return updatedForm;
        });
    };
};

export default useForm;
