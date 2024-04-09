import { Link , useNavigate , useLocation, NavLink } from "react-router-dom"
import "./navbar.css"
import Swal from 'sweetalert2';
import { useState } from "react";

export default function Navbar(){
    const [mobileMenu , setmobileMenu] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    
    const handleLogout = (data: any) => {
        // Handle form submission logic
        Swal.fire({
          title: "Are You Sure You Want To Logout?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "hsl(220, 24%, 12%)",
          cancelButtonColor: "hsl(0, 0%, 37%)",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setmobileMenu(false)
            localStorage.removeItem('user')
            navigate('/login')
          }
        });
      };
    return (
      <>
        <nav>
          <div className="nav_wrapper">
          <Link to={'/brands'}><img className="logo" src="./logo.png"/></Link>
          <ul>
                {location.pathname != '/login' && 
                <>
                <li><NavLink className={({isActive, isPending})=>{ return isActive ? "active_link"  : "inactive_link";}}  to={'/brands'}>BRANDS</NavLink></li>
                <li><NavLink className={({isActive, isPending})=>{ return isActive ? "active_link"  : "inactive_link";}} to={'/motorcycles'}>MOTORCYCLES</NavLink></li>
                <li><NavLink className={({isActive, isPending})=>{ return isActive ? "active_link"  : "inactive_link";}} to={'/variants'}>VARIANTS</NavLink></li>
                <li><NavLink className={({isActive, isPending})=>{ return isActive ? "active_link"  : "inactive_link";}} to={'/images-upload'}>UPLOAD IMAGES</NavLink></li>
                </>
                }
            </ul>
          </div>
          {location.pathname != '/login' && <img onClick={()=>setmobileMenu(!mobileMenu)} className="ham_image" src="./bars-solid.svg"/>}
            {location.pathname != '/login' &&  <button type="button" className="btn btn-outline-light logout_btn" onClick={handleLogout}>LOGOUT</button>}
        </nav>

        <div className={  mobileMenu ? 'mobile_menu active' : 'mobile_menu'}>
        <ul>
                {location.pathname != '/login' && 
                <>
                <li><NavLink className={({isActive, isPending})=>{ return isActive ? "active_link"  : "inactive_link";}}  to={'/brands'}>BRANDS</NavLink></li>
                <li><NavLink className={({isActive, isPending})=>{ return isActive ? "active_link"  : "inactive_link";}} to={'/motorcycles'}>MOTORCYCLES</NavLink></li>
                <li><NavLink className={({isActive, isPending})=>{ return isActive ? "active_link"  : "inactive_link";}} to={'/variants'}>VARIANTS</NavLink></li>
                <li><NavLink className={({isActive, isPending})=>{ return isActive ? "active_link"  : "inactive_link";}} to={'/images-upload'}>UPLOAD IMAGES</NavLink></li>
                </>
                }
            </ul>
            {location.pathname != '/login' &&  <button type="button" className="btn btn-outline-light logout_btn" onClick={handleLogout}>LOGOUT</button>}
        </div>
        </>
    )
}