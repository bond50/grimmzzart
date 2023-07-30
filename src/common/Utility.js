export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};


const checkRequired = (value, validationMessage) => {
    const isEmpty =
        (typeof value === 'string' && value.trim() === '') ||
        (typeof value === 'boolean' && value === false) ||
        (typeof value === 'number' && value === 0);

    if (isEmpty) {
        validationMessage.push('This field is mandatory');
    }

    return validationMessage;
};


const validateEmail = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasAtSymbol = value.includes('@');
    const hasValidFormat = pattern.test(value);

    const messages = [];
    if (!hasAtSymbol) {
        messages.push('Please include the @ symbol');
    } else if (!hasValidFormat) {
        messages.push('Please enter a valid email address');
    }

    return {valid: hasAtSymbol && hasValidFormat, messages};
};

const validatePassword = (value) => {
    let isValid = true;
    const errors = [];

    if (value.length < 8) {
        errors.push('Your password must be at least 8 characters.');
        isValid = false;
    }
    if (value.search(/[A-Z]/) < 0) {
        errors.push('Your password must contain at least one uppercase.');
        isValid = false;
    }
    if (value.search(/[a-z]/) < 0) {
        errors.push('Your password must contain at least one lowercase.');
        isValid = false;
    }
    if (value.search(/[0-9]/) < 0) {
        errors.push('Your password must contain at least one digit.');
        isValid = false;
    }
    if (value.search(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/) < 0) {
        errors.push('Your password must contain at least one special character.');
        isValid = false;
    }

    const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    isValid = pattern.test(value) && isValid;

    return {valid: isValid, messages: errors};
};

const validatePhoneNumber = (value) => {
    const pattern = /^(?:\+254|0)[17]\d{8}$/;
    const valid = pattern.test(value);
    const messages = valid ? [] : ['Must be a valid Kenyan phone number'];

    return {valid, messages};
};

const validateKenyanId = (value) => {
    const pattern = /^[0-9]{1,9}$/;
    const valid = pattern.test(value);
    const messages = valid ? [] : ['Must be a valid Kenyan ID number'];

    return {valid, messages};
};

const validateKenyanDrivingLicense = (value) => {
    const pattern = /^[A-Za-z0-9]+$/;

    const valid = pattern.test(value);
    const messages = valid ? [] : ['Must be a valid Kenyan driving license number'];

    return {valid, messages};
};

export const checkValidity = (value, field, selectedRoleCode, loggedInRoleCode) => {
    let isValid = true;
    let validationMessage = [];

    if (!field || !field.validation || !field.validation.required) {
        return {isValid: true, validationMessage};
    }


    const {
        required,
        minLength,
        maxLength,
        isEmail,
        isPassword,
        isEqual,
        isTerms,
        isDate,
        isPhoneNumber,
        idNo,
        drivingLicense,
    } = field.validation;

    const isDriverRole = selectedRoleCode === 4000;
    const isIdNoOrDrivingLicense = idNo || drivingLicense;

    if (required || (isDriverRole && isIdNoOrDrivingLicense)) {
        validationMessage = checkRequired(value, validationMessage);
        isValid = validationMessage.length === 0 && isValid;
    }

    if (isDriverRole && isIdNoOrDrivingLicense && (typeof value === 'string' && value.trim() === '')) {
        validationMessage.push('This field is mandatory for the selected role');
        isValid = false;
    } else if (!isDriverRole && isIdNoOrDrivingLicense) {
        // Don't reset the validationMessage and isValid for non-driver roles, only check if it's required
        if (required) {
            validationMessage = checkRequired(value, validationMessage);
            isValid = validationMessage.length === 0 && isValid;
        } else {
            validationMessage = [];
            isValid = true;
        }
    }

    if (idNo && typeof value === 'string') {
        const {valid, messages} = validateKenyanId(value);
        isValid = valid && isValid;
        validationMessage = [...validationMessage, ...messages];
    }

    if (drivingLicense && typeof value === 'string') {
        const {valid, messages} = validateKenyanDrivingLicense(value);
        isValid = valid && isValid;
        validationMessage = [...validationMessage, ...messages];
    }


    if (typeof value === 'string') {
        if (minLength) {
            isValid = value.length >= minLength && isValid;
        }
        if (maxLength) {
            isValid = value.length <= maxLength && isValid;
        }
    }

    if (isEmail && typeof value === 'string') {
        const {valid, messages} = validateEmail(value);
        isValid = valid && isValid;
        validationMessage = [...validationMessage, ...messages];
    }
    if (isPassword && typeof value === 'string' && loggedInRoleCode !== 1000) {
        const {valid, messages} = validatePassword(value);
        isValid = valid && isValid;
        validationMessage = [...validationMessage, ...messages];
    }
    if (isEqual && typeof value === 'string') {
        if (value.trim() !== field.validation.passwordValue.trim()) {
            validationMessage.push('Password does not match');
            isValid = false;
        }
    }
    if (isTerms && typeof value === 'boolean') {
        if (value === false) {
            validationMessage.push('You must accept our terms to continue');
            isValid = false;
        }
    }
    if (isDate && value === null) {
        validationMessage.push('This field is mandatory');
        isValid = false;
    }
    if (isPhoneNumber && typeof value === 'string') {
        const {valid, messages} = validatePhoneNumber(value);
        isValid = valid && isValid;
        validationMessage = [...validationMessage, ...messages];
    }

    return {isValid, validationMessage};
};

export const errorHelper = (error) => {
    const err =
        (error.response &&
            error.response.data &&
            error.response.data.error) ||
        error.message ||
        error.toString();
    return {
        err
    };
};



