import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
// import Metrics from './pages/Metrics'
import Error from './pages/Error'

import Private from './routes/Private';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Private> <Home /> </Private>
    },
    {
        path: '/login',
        element: <Login />
    },
    // {
    //     path: '/metrics',
    //     element: <Private> <Metrics /> </Private>
    // },
    {
        path: '*',
        element: <Error />
    }
])

export { router };