import {useState} from "react";
import {showToast} from "../ui/Toast/toastNotifications";

const useHandleSubmit = (customAction, form, resetForm) => {
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessful(false);
        const formData = Object.keys(form).reduce((acc, key) => {
            let value = form[key].value;
            if (key === "dob" && typeof value === "object") {
                value = value.toISOString().substr(0, 10);
            }

            if (key === "phoneNumber") {
                if (value.startsWith("+254")) {
                    value = "0" + value.substr(4);
                }
            }

            return {
                ...acc,
                [key]: value,
            };
        }, {});


        try {
            const response = await customAction(formData);


            if (response && response.message) {
                showToast(response.message, "success");
                setLoading(false);
                setShowForm(false);
                setSuccessful(true);
                resetForm();
            } else {
                setLoading(false);
                setShowForm(true);
                setSuccessful(false);
            }
        } catch (error) {
            setLoading(false);
            showToast(
                error.response.data.message || error,
                "error",
                3000,
                "350px"
            );
        }
    };

    return {handleSubmit, loading, successful, showForm};
};

export default useHandleSubmit;
