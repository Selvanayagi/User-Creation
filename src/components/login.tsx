import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginComp = () => {

    const navigate = useNavigate();

    const [email, setEmailId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const login = (e: any) => {
        e.preventDefault();
        if(email === 'admin' && password === 'admin') {
            navigate('/user');
            sessionStorage.setItem('loggedIn', 'true');
        } else {
            toast.error('Wrong username or passoword')
        }
    }

    return(
        <div className='login-comp'>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Welcome</h1>
            <form style={{ textAlign: "center" }}>
                <input type="text" value={email} onChange={(e) => { setEmailId(e.target.value) }}  />
                <br />
                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}  />
                <br />
                <button type="submit" onClick={(e) => {login(e)}}>Login</button>
            </form>
        </div>
    )
}

export default LoginComp