// @ts-ignore
import React, { useState, useEffect, useContext, createContext } from "react";
import Menu from "../components/Menu";
export const appContext = createContext();
export const useAuth = () => {
    return useContext(appContext);
};
// Provider hook that creates auth object and handles state
export const useProvideApp =  () => {

    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const [startLoad, setStartLoad] = useState(true);


    const loadProfile = () => {
        setUser({})
        setStartLoad(false)
    };

    const signin = (token) => {
        localStorage.setItem('token', token);
        loadProfile();
    };


    const signout = () => {
        console.log('signout => ' );
       // throw new Error('Parameter is not a number!');
        localStorage.removeItem('token');
        setUser(null);
    };


    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        let Usertoken = localStorage.getItem('token');
        if ( Usertoken ) {
            loadProfile();
            setToken(Usertoken);
        } else {
            setToken("")
        }
        // Cleanup subscription on unmount
        return () => {
            console.log('Clear Data')
        };
    }, []);

    useEffect(() => {
        if(token === "") {
            setUser(null);
            setStartLoad(false);
            signout();
        }
    }, [token]);


    // Return the user object and auth methods
    return {
        user,
        startLoad,
        signin,
        signout
    };
}

export const Layout = ({ children }) => {
    const auth = useAuth();
    const [isLogged, setLogged] = useState(false);
    const [isWittoLOad, setIsWittoLOad] = useState(true);

    useEffect(() => {
        if (auth.user) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    },[auth.user]);
    useEffect(() => {
        setIsWittoLOad(auth.startLoad)
    },[auth.startLoad]);

    if(isWittoLOad){
        return (
            <React.Fragment>
                Wait
            </React.Fragment>
        );
    }
    if (! isLogged) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div
                            className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/"
                               className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline">Menu</span>
                            </a>
                            <Menu/>
                        </div>
                    </div>
                    <div className="col py-3">
                        {children}
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}

