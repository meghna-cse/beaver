
import {useNavigate} from "react-router-dom";
import {createContext, useContext, useEffect, useMemo} from "react";
import {useLocalStorage} from "../hooks/UseLocalStorage";

const AuthContext = createContext({
    isAuthenticated:false,
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
});
export const AuthProvider = (props) => {
    // const [isAuthenticated, setAuthenticated] = useLocalStorage("isAuthenticated", null);
    const [user, setUser] = useLocalStorage("user", null);
    const [token, setToken] = useLocalStorage("token", null);
    const navigate = useNavigate();

    const login = (user, token) => {
        setUser(user);
        setToken(token);
    };

    // Add this useEffect hook in your component
    // useEffect(() => {
    //     if (user && token) {
    //         userDashboard(user);
    //     }
    // }, [user, token]);

    const logout = () => {
        setUser(null);
        setToken(null);
        navigate("/");
    }

    const value = useMemo(() => {
        return {
            user,
            token,
            isAuthenticated: !!user,
            login,
            logout,
        };
    }, [user, token]);

    // const userDashboard = (user) => {
    //     // check if user is student
    //     if (user.role_name === "student") {
    //         navigate("/student");
    //     }
    //     // check if user is instructor
    //     if (user.role_name === "instructor") {
    //         navigate("/instructor");
    //     }
    //     // check if user is coordinator
    //     if (user.role_name === "coordinator") {
    //         navigate("/coordinator");
    //     }
    //     // check if user is quality assurance
    //     if (user.role_name === "quality assurance") {
    //         navigate("/quality-assurance");
    //     }
    //     // check if user is administrator
    //     if (user.role_name === "administrator") {
    //         navigate("/administrator");
    //     }
    // };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

