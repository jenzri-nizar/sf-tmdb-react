import React, {Suspense, useEffect, useState} from 'react';
import {Routes, Route, BrowserRouter, useNavigate} from "react-router-dom";
import {RoutesApp} from "./routes";
import AppProvide from "./provide/AppProvide.jsx";
import {useAuth} from "./context/AppContext";

const RoutePrivate = ({ component: Component, ...rest }) => {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (! auth.user) {
            navigate('/login');
        }
    },[auth.user]);
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...rest} />
            </Suspense>
        </div>
    );
}
const RoutePublic = ({ component: Component, ...rest }) => {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.user) {
            navigate('/');
        }
    },[auth.user]);
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...rest} />
            </Suspense>
        </div>
    );
}

const RouteSuspense = (route) => {
    if (route.isPublic) {
        return (<RoutePublic component={route.component}  key={route.id}/>);
    }
    return (<RoutePrivate component={route.component}  key={route.id}/>);
}

const renderRoutes = () => {
    const allRoutes = [];
    const routes = RoutesApp();
    for (const r of Object.keys(routes)) {
        allRoutes.push(<Route exact key={routes[r].id} path={routes[r].path} element={RouteSuspense(routes[r])}/>)
    }
    return allRoutes;
}
export default () => {

    return (
        <BrowserRouter>
            <AppProvide>
                <Routes>
                    {renderRoutes()}
                </Routes>
            </AppProvide>
        </BrowserRouter>
    )
}
