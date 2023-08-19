import React from 'react';
import Input from "../../ui/input/Input";

const Form = ({
                  form,
                  formSteps,
                  step,
                  handleChange,
                  togglePasswordVisibility = () => {
                  },
                  passwordVisible = {},
                  children,
              }) => {

    return (
        <>
            {Object.entries(form).map(([id, config]) => {
                if (formSteps && step !== undefined && !formSteps[step].includes(id)) {
                    return null;
                }

                let isRequired = config.validation && config.validation.required;


                return (
                    <Input
                        key={id}
                        elementType={config.elementType}
                        elementConfig={config.elementConfig}
                        label={config.elementConfig.label}
                        id={id}
                        value={config.value}
                        selectedOption={config.selectedOption}
                        invalid={!config.valid}
                        shouldValidate={!!config.validation}
                        touched={config.touched}
                        message={config.validationMessage}
                        passwordVisible={passwordVisible[id]}
                        togglePasswordVisibility={() => togglePasswordVisibility(id)}
                        className="col-12"
                        changed={(event) => handleChange(event, id)}
                        required={isRequired}
                    />
                );
            })}
            {children}
        </>
    );
};

export default Form;
