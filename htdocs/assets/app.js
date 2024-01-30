/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React from 'react';
import ReactDOM from "react-dom/client";
require('./bootstrap');
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import Init from "./Init";

function App() {
    return (
        <div>
            <Init />
        </div>
    )
}
if (document.getElementById('root-app')) {
    const Index = ReactDOM.createRoot(document.getElementById("root-app"));

    Index.render(<App />)
}
