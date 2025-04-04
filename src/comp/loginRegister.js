import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginRegister.css';

export default function LoginRegister() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const { username, email: regEmail, password: regPassword } = registerData;
    const { email: logEmail, password: logPassword } = loginData;

    const onLoginChange = e => setLoginData({ ...loginData, [e.target.name]: e.target.value });
    const onRegisterChange = e => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

    const onLoginSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();
    
            if (response.ok) {
                const userId = data.userId;
                localStorage.setItem('username', userId); // Ensure userId is correctly set
                navigate(`/front1/${userId}`);
            } else {
                console.error(data);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };
    

    const onRegisterSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });
            const data = await response.json();

            if (response.ok) {
                const userId = data.userId;
                localStorage.setItem('username', userId);
                navigate(`/front1/${userId}`);
            } else {
                console.error(data.error); 
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="main-login-register">
            <input type="checkbox" id="chk" aria-hidden="true" checked={isLogin} onChange={() => setIsLogin(!isLogin)} />

            <div className={`login-login-register ${isLogin ? '' : 'hidden-login-register'}`}>
                <form className="form-login-register" onSubmit={onLoginSubmit}>
                    <label htmlFor="chk" aria-hidden="true">Log in</label>
                    <input className="input-login-register" type="email" name="email" placeholder="Email" value={logEmail} onChange={onLoginChange} required />
                    <input className="input-login-register" type="password" name="password" placeholder="Password" value={logPassword} onChange={onLoginChange} required />
                    <button type="submit">Log in</button>
                </form>
            </div>

            <div className={`register-login-register ${isLogin ? 'hidden-login-register' : ''}`}>
                <form className="form-login-register" onSubmit={onRegisterSubmit}>
                    <label htmlFor="chk" aria-hidden="true">Register</label>
                    <input className="input-login-register" type="text" name="username" placeholder="Username" value={username} onChange={onRegisterChange} required />
                    <input className="input-login-register" type="email" name="email" placeholder="Email" value={regEmail} onChange={onRegisterChange} required />
                    <input className="input-login-register" type="password" name="password" placeholder="Password" value={regPassword} onChange={onRegisterChange} required />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}
