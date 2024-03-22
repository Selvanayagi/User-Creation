import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = sessionStorage.getItem('loggedIn') || false
    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes