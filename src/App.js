import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
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
    {
        path: '*',
        element: <Error />
    }
])

export { router };