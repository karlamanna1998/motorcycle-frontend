import axios from "axios"
import { useState } from "react"
import { Router, useNavigate } from "react-router-dom"
import './login.css'


export default function Login(){
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const login = async (e : any) => {
        e.preventDefault()
        try {
            let user = await axios.post('http://localhost:5000/api/v1/admin/login', { username, password })
            localStorage.setItem('user', user.data.data.token)
            navigate('/motorcycles')
        } catch (err: any) {
            console.log(err);
        }
    }
    return (
        <div className="page_container">
        <div className="login_wrapper">
            <form onSubmit={(e)=>login(e)}>

       
            <div className="login_container">
                <h2 className='mb-2'>LOGIN</h2>
                <div className="input_box">
                    <input type="text" id="username" className="input" name="userName" placeholder="User Name" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input_box">
                    <input type="password" id="password" className="input" name="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="add_btn" >Login</button>
            </div>
            </form>
        </div>
    </div>
    )
}