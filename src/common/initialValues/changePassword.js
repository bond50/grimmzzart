export const changePasswordFormInitialValues = {
    passwordForm: {
        password: {
            elementType: 'password',
            elementConfig: {
                label: 'Password',
                id: 'password',
                name: 'password',
            },
            value: '',
            validation: {
                required: true,
                isPassword: true
            },
            validationMessage: [],
            valid: false,
            touched: false,
            visible: false,
        },
        confirmPassword: {
            elementType: 'password',
            elementConfig: {
                label: 'Confirm Password',
                id: 'confirmPassword',
                name: 'confirmPassword',
            },

            value: '',
            validation: {
                required: true,
                isEqual: 'password',
                passwordValue: '',
            },
            validationMessage: [],
            valid: false,
            touched: false,
            visible: false,
        },

    },
    formIsValid: false
}