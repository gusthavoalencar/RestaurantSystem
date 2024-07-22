import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { API_BASE_URL } from '../../global/config';
import CompanyLogo from '../../components/SideNav/CompanyLogo';

interface ILoginCredentials {
    email: string;
    password: string;
}

const Login = () => {
    const [loginCredentials, setLoginCredentials] = useState<ILoginCredentials>({ email: '', password: '' });
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const result = await postData(API_BASE_URL + 'user/login', loginCredentials);
            login(result.token);
        } catch (error) {
            console.error("Error attempting to login:", error);
            return {
                email: '',
                password: '',
            };
        }
    };

    const postData = async (url: string, data: ILoginCredentials) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 grayBackground">
            <div>
                <CompanyLogo />
                <input type="email" className="form-control mb-3" value={loginCredentials.email} onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })} placeholder="Email" />
                <input type="password" className="form-control mb-3" value={loginCredentials.password} onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })} placeholder="Password" />
                <div className="d-flex flex-column align-items-stretch">
                    <button className="btn btn-primary mb-1 w-100" onClick={handleLogin}>Login</button>
                    <div className="d-flex justify-content-center">
                        <a href='forgotpassword'>Forgot password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;