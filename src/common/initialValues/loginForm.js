export const loginFormInitialValues = {
    loginForm: {
        identifier: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Email / Phone Number / Username',
                id: 'identifier',
                name: 'identifier',
            },

            value: '',
            validation: {
                required: true,
            },
            validationMessage: [],
            valid: false,
            touched: false
        },

        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                required: true,
                name: 'password',
                label: 'Your password'
            },
            value: '',
            validation: {
                required: true,
            },
            validationMessage: [],
            valid: false,
            touched: false
        }
    },
    formIsValid: false
}