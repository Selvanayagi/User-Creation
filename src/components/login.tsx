import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginComp = () => {

    const navigate = useNavigate();

    const [email, setEmailId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [showPassword, setShowPassword] = useState(false);

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
                <input placeholder='username' type="text" value={email} onChange={(e) => { setEmailId(e.target.value) }}  />
                <br />
                <input placeholder='password' type={!showPassword ? "password" : "text"} value={password} onChange={(e) => { setPassword(e.target.value) }}  />
                <img src="https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png"
                    onClick={() => { setShowPassword(!showPassword) }}
                     style={{
                        position: "absolute",
                        marginLeft: "-6.5%",
                        verticalAlign: "middle",
                        width: "25px",
                        marginTop: "10px",
                        cursor: "pointer"
                     }}
                     id="togglePassword" />
                <br />
                <button type="submit" onClick={(e) => {login(e)}}>Login</button>
            </form>
        </div>
    )
}

export default LoginComp