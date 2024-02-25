import { Link , useNavigate } from "react-router-dom"
import "./navbar.css"
import Swal from 'sweetalert2';

export default function Navbar(){

    const navigate = useNavigate()

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
                <li><Link to={'/brands'}>BRANDS</Link></li>
                <li><Link to={'/motorcycles'}>MOTORCYCLES</Link></li>
                <li><Link to={'/variants'}>VARIANTS</Link></li>
            </ul>
            <button type="button" className="btn btn-outline-light" onClick={handleLogout}>LOGOUT</button>
        </nav>
    )
}