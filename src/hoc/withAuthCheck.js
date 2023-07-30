import {useDispatch, useSelector} from "react-redux";
import {useEffect, useCallback, useRef} from "react";
import {logout} from "../redux/slices/auth";
import {useNavigate} from "react-router-dom";
import Login from "../pages/auth/Login";
import AccessDenied from "../components/routes/AccessDenied";
import {currentAdmin} from "../services/auth.service";

const useAuthCheck = (checkAuthFunc) => {
    const {user: currentUser} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = useRef(null);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const logOut = useCallback((path) => {
        dispatch(logout());
        navigate(path);
    }, [dispatch, navigate]);

    const isTokenExpired = useCallback((token) => {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentDate = new Date();
        return decodedToken.exp * 1000 < currentDate.getTime();
    }, []);

    useEffect(() => {
        if (!currentUser || !currentUser.token) {
            logOut('/login');
            return;
        }

        if (isTokenExpired(currentUser.token)) {
            logOut('/login');
            return;
        }

        if (!currentUser.role.active || currentUser.role.code !== 1000) {
            logOut('/denied');
            return;
        }

        checkAuthFunc(currentUser.token, currentUser)
            .catch(() => {
                if (isMounted.current) {
                    logOut('/denied');
                }
            });
    }, [currentUser, logOut, isTokenExpired, checkAuthFunc]);

    if (!currentUser) {
        return {status: 'login'};
    }

    // If the user is not logged in or the token is expired, show the login page
    if (!currentUser.token || isTokenExpired(currentUser.token)) {
        return {status: 'login'};
    }

    // If the user is not an admin or their role is not active, show the access denied page
    if (!currentUser.role.active || currentUser.role.code !== 1000) {
        return {status: 'denied'};
    }

    return {status: 'authenticated'};
};

export const AdminRoute = ({children, checkAuthFunc = currentAdmin}) => {
    const authCheck = useAuthCheck(checkAuthFunc);

    switch(authCheck.status) {
        case 'login':
            return <Login />;
        case 'denied':
            return <AccessDenied />;
        case 'authenticated':
            return <>{children}</>;
        default:
            return null;
    }
};
