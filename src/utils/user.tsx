import { Outlet, Navigate } from 'react-router-dom'

const UserRoutes = () => {
    let auth = sessionStorage.getItem('loggedIn') || false
    return(
        !auth ? <Outlet/> : <Navigate to="/user"/>
    )
}

export default UserRoutes