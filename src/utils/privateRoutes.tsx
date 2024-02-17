import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoutes(){
    let auth  = localStorage.getItem('user')
    return (
       auth ? <Outlet/> : <Navigate to={'/login'}/>
    )
}