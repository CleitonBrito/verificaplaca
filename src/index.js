import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './App';

import { RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Maintenance from './pages/Maintenance';

const root = ReactDOM.createRoot(document.getElementById('root'));
(process.env.REACT_APP_MAINTENANCE !== 'true') ?
    root.render(
        <React.StrictMode>
                <ToastContainer autoClose={3000}/>
                <RouterProvider router={router}/>
        </React.StrictMode>
    )
    :
    root.render(
        <Maintenance />
    )
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals