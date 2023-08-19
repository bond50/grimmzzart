import React from 'react';
import DatePicker from 'react-date-picker';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {Icon} from '@iconify/react';
import {MDBInput} from "mdb-react-ui-kit";

const Input = ({
                   elementType,
                   elementConfig,
                   label,
                   message,
                   id,
                   feedback,
                   disabled,
                   value,
                   required,
                   className,
                   wrapperClassName,
                   changed,
                   invalid,
                   shouldValidate,
                   touched,
                   selectedOption,
                   passwordVisible,
                   togglePasswordVisibility
               }) => {
    let inputElement = null;


    switch (elementType) {
        case 'password':
            inputElement = (
                <div className="input-group">
                    <MDBInput
                        type={passwordVisible ? 'text' : 'password'}
                        className={`form-control ${className}`}
                        required
                        id={id}
                        {...elementConfig}
                        disabled={disabled}
                        value={value}
                        onChange={changed}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? (
                            <Icon icon="ph:eye-slash-thin"/>
                        ) : (
                            <Icon icon="ph:eye"/>
                        )}
                    </button>
                </div>
            );
            break;
        case 'checkbox':
            inputElement = (
                <div className="form-check">
                    <input
                        className={`form-check-input ${className}`}
                        type="checkbox"
                        id={id}
                        {...elementConfig}
                        disabled={disabled}
                        checked={value === true}
                        value={value}
                        onChange={changed}
                    />
                    {elementConfig.label && (
                        <span>
                    {elementConfig.label} {required && <span className="text-danger">*</span>}
                </span>
                    )}
                </div>
            );
            break;

        case 'date':
            inputElement = (
                <DatePicker
                    id={id}
                    disabled={disabled}
                    className={`form-control ${className}`}
                    {...elementConfig}
                    value={value}
                    onChange={changed}
                />
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    className={`form-control ${className}`}
                    id={id}
                    disabled={disabled}
                    {...elementConfig}
                    value={value}
                    onChange={changed}
                />
            );
            break;
        case 'select':
            inputElement = (
                <Select
                    id={id}
                    value={selectedOption || value}
                    className="basic-single"
                    classNamePrefix="select"
                    {...elementConfig}
                    defaultValue={elementConfig.options && elementConfig.options[1]}
                    isDisabled={disabled}
                    options={elementConfig.options}
                    onChange={changed}
                />
            );
            break;
        default:
            inputElement = (
                <MDBInput
                    className={`form-control ${className}`}
                    id={id}
                    disabled={disabled}
                    {...elementConfig}
                    value={value}
                    onChange={changed}
                />
            );
    }

    const showError = invalid && touched && shouldValidate;

    return (
        <div className={`mb-3 ${wrapperClassName}`}>
            {/*{elementType !== 'checkbox' && label && (*/}
            {/*    <label htmlFor={id} className={showError ? 'text-danger' : ''}>*/}
            {/*        {label} {required && <span className="text-danger">*</span>}*/}
            {/*    </label>*/}
            {/*)}*/}

            {inputElement}
            {showError && message && (
                <ul className="text-danger small mt-1">
                    {message.map((errMsg, index) => (
                        <li key={index}>{errMsg}</li>
                    ))}
                </ul>
            )}
            {feedback && <div className="text-danger small mt-1">{feedback}</div>}
        </div>
    );

};

Input.propTypes = {
    elementType: PropTypes.string.isRequired,
    elementConfig: PropTypes.object,
    label: PropTypes.string,
    message: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string.isRequired,
    feedback: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.object,
    ]),
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    changed: PropTypes.func,
    invalid: PropTypes.bool,
    shouldValidate: PropTypes.bool,
    touched: PropTypes.bool,
};

Input.defaultProps = {
    elementConfig: {},
    label: '',
    message: '',
    feedback: '',
    disabled: false,
    value: '',
    className: '',
    wrapperClassName: '',
    changed: () => {
    },
    invalid: false,
    shouldValidate: false,
    touched: false,
};

export default Input;

