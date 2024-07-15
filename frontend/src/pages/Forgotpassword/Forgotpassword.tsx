import React, { useState } from 'react';
import { API_BASE_URL } from '../../config/config';
import CompanyLogo from '../../components/SideNav/CompanyLogo';


const Forgotpassword = () => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        try {
            const result = await postData(API_BASE_URL + 'user/forgotpassword', email);
            return result;

        } catch (error) {
            console.error("Error attempting to send reset password email:", error);
        }
    };

    const postData = async (url: string, data: string) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: data })
        });
        const json = await response.json();
        return json;
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 grayBackground">
            <div>
                <CompanyLogo />
                <input type="email" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <div className="d-flex flex-column align-items-stretch">
                    <button className="btn btn-primary mb-1 w-100" onClick={handleForgotPassword}>Reset Password</button>
                    <div className="d-flex justify-content-center">
                        <a href='/login'>back</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forgotpassword;