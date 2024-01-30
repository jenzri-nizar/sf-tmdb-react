// @ts-ignore
import React from 'react';
import {Layout, useProvideApp, appContext} from "../context/AppContext";

export default ({ children }) => {
    const auth = useProvideApp();
    return (

            <appContext.Provider value={auth}>
                <Layout>{children}</Layout>
             </appContext.Provider>
    );
}
