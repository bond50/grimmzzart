import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createUser} from "../../services/userManagement.service";
import {getRoles} from "../../services/role.service";
import useForm from "../../hooks/useForm";
import Form from "../../components/Form";

import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";
import useHandleSubmit from "../../hooks/useFormSubmit";
import {createUserFormInitialValues} from "../../common/initialValues/createUserForm";
import Auth from "../../components/wrappers/Auth";

const UserCreate = () => {
    const {token} = useSelector(state => state.auth.user);
    const [formIsValid, setFormIsValid] = useState(false);
    const [form, setForm] = useState(createUserFormInitialValues.userForm);
    const handleChange = useForm(setForm, setFormIsValid);

    const [passwordVisible, togglePasswordVisibility] = useTogglePasswordVisibility(form, setForm);
    const resetForm = () => {
        setForm({...createUserFormInitialValues.userForm});
        setFormIsValid(false);
    };


    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const fetchedRoles = await getRoles(token);
                const roleOptions = fetchedRoles.map((role) => ({
                    value: role._id,
                    label: role.name,
                    code: role.code,
                }));

                setForm((prevForm) => {
                    return {
                        ...prevForm,
                        role: {
                            ...prevForm.role,
                            elementConfig: {
                                ...prevForm.role.elementConfig,
                                options: [
                                    ...roleOptions,
                                ],
                            },
                        },
                    };
                });

            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        fetchRoles();
    }, [token]);
    const customAction = async (formData) => {
        return await createUser(formData, token);
    };

    const {handleSubmit, loading, successful, showForm} = useHandleSubmit(
        customAction,
        form,
        resetForm
    );


    return (
        <Auth cardTitle='User create'>
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit}>
                <Form
                    form={form}
                    handleChange={handleChange}
                    togglePasswordVisibility={togglePasswordVisibility}
                    passwordVisible={passwordVisible}>
                    <button type="submit" className="btn btn-primary" disabled={!formIsValid}>
                        Submit
                    </button>
                </Form>
            </form>
        </Auth>
    );
};

export default UserCreate;
