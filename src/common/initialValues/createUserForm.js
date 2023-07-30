export const createUserFormInitialValues = {
    userForm: {
        phoneNumber: {
            elementType: 'input',
            elementConfig: {
                type: 'tel',
                label: 'Phone Number',
                id: 'phoneNumber',
                name: 'phoneNumber',
                pattern: '[0-9]{10}',
            },

            value: '',
            validation: {
                required: true,
                isPhoneNumber: true
            },
            validationMessage: [],
            valid: false,
            touched: false
        },
        firstName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'First Name',
                id: 'firstName',
                name: 'firstName',
            },

            value: '',
            validation: {
                required: true,
            },
            validationMessage: [],
            valid: false,
            touched: false
        },
        middleName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Middle Name',
                id: 'middleName',
                name: 'middleName',
            },

            value: '',
            validation: {
                required: false,
            },
            validationMessage: [],
            valid: true,
            touched: false
        },
        surname: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Surname',
                name: 'surname',
                id: 'surname',
            },

            value: '',
            validation: {
                required: true,
            },
            validationMessage: [],
            valid: false,
            touched: false
        },
        role: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: '', label: 'Select role'},
                ],
                label: 'Role',
                id: 'role',
                name: 'role',
            },

            value: {value: '', label: 'Select role'},
            validation: {
                required: true,
            },
            validationMessage: [],
            valid: false,
            touched: false,
            selectedOption: '',
        },
        drivingLicense: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'Driving License',
                id: 'drivingLicense',
            },

            value: '',
            validation: {
                required: false,
                drivingLicense: true,
            },
            validationMessage: [],
            valid: true,
            touched: false
        },
        idNo: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'ID Number',
                name: 'idNo',
                id: 'idNo',
            },

            value: '',
            validation: {
                required: false,
                idNo: true,
            },
            validationMessage: [],
            valid: true,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                label: 'Email',
                id: 'email',
                name: 'email',
            },

            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            validationMessage: [],
            valid: false,
            touched: false
        },
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

        dob: {
            elementType: 'date',
            elementConfig: {
                format: 'dd/MM/yyyy',
                clearIcon: null,
                dayPlaceholder: 'DD',
                monthPlaceholder: 'MM',
                yearPlaceholder: 'YYYY',
                id: 'dob',
                label: 'Date of Birth',
                name: 'dob'
            },

            value: '',
            validation: {
                required: true,
            },
            validationMessage: [],
            valid: false,
            touched: false
        },
        gender: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: '', label: 'Select gender'},
                    {value: 'male', label: 'Male'},
                    {value: 'female', label: 'Female'},
                ], label: 'Gender',
                id: 'gender',
                name: 'gender',
            },
            selectedOption: '',

            value: {value: '', label: 'Select gender'},
            validation: {
                required: true,
            },
            validationMessage: [],
            valid: false,
            touched: false

        },
    },
    formIsValid: false
}