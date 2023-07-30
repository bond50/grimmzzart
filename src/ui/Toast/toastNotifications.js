import {toast} from 'react-toastify';

export const showToast = (message, type, autoClose = 5000, minWidth = null) => {
    const options = {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose,
        ...(minWidth && {
            style: {
                minWidth,
            },
        }),
    };

    switch (type) {
        case 'success':
            toast.success(message, options);
            break;
        case 'error':
            toast.error(message, options);
            break;
        case 'warning':
            toast.warn(message, options);
            break;
        case 'info':
            toast.info(message, options);
            break;
        default:
            toast(message, options);
            break;
    }
};
