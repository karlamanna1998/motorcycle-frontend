import { Link , useNavigate , useLocation, NavLink } from "react-router-dom"
import "./navbar.css"
import Swal from 'sweetalert2';

export default function Navbar(){

    const navigate = useNavigate()
    const location = useLocation()
    console.log(location);
    
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
            localStorage.removeItem('user')
            navigate('/login')
          }
        });
      };
    return (
        <nav>
            <ul>
            <li><Link to={'/brands'}><img src="./logo.png"/></Link></li>
                {location.pathname != '/login' && 
                <>
                <li><NavLink className={({isActive, isPending})=>{ return isActive ? "active_link"  : "inactive_link";}}  to={'/brands'}>BRANDS</NavLink></li>
                <li><NavLink className={({isActive, isPending})=>{ return isActive ? "active_link"  : "inactive_link";}} to={'/motorcycles'}>MOTORCYCLES</NavLink></li>
                <li><NavLink className={({isActive, isPending})=>{ return isActive ? "active_link"  : "inactive_link";}} to={'/variants'}>VARIANTS</NavLink></li>
                <li><NavLink className={({isActive, isPending})=>{ return isActive ? "active_link"  : "inactive_link";}} to={'/images-upload'}>UPLOAD IMAGES</NavLink></li>
                </>
                }
            </ul>
            {location.pathname != '/login' &&  <button type="button" className="btn btn-outline-light" onClick={handleLogout}>LOGOUT</button>}
        </nav>
    )
}