import React ,{lazy} from 'react';
const Home  = lazy(() => import("./pages/Home.jsx"));
const Login  = lazy(() => import("./pages/Login.jsx"));
const Genre  = lazy(() => import("./pages/Genre.jsx"));
const Detail  = lazy(() => import("./pages/Detail.jsx"));

export const RoutesApp = () => {
    return {
        home: {id: 1, path: "/", component: Home, isPublic: false},
        login: {id: 2, path: "/login", component: Login, isPublic: true},
        genre: {id: 3, path: "/genre/:id", component: Genre, isPublic: false},
        detail: {id: 4, path: "/detail/:id", component: Detail, isPublic: false}
    }
}
