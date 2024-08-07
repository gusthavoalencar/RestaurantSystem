import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../global/config';
import CompanyLogo from '../../components/SideNav/CompanyLogo';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/PopupModal';

interface IResetPasswordCredentials {
    email: string;
    password: string;
    confirmpassword: string;
    token: string;
}

const Resetpassword = () => {
    const [resetPasswordCredentials, setResetPasswordCredentials] = useState<IResetPasswordCredentials>({ email: '', password: '', confirmpassword: '', token: '' });
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
    const navigate = useNavigate();
    const { showModal } = useModal();

    // Handle reset password
    const handleResetPassword = async () => {
        try {
            // API request to reset password
            const result = await postData(API_BASE_URL + 'user/resetpassword', resetPasswordCredentials);
            if (result.error) {
                showModal(result.error, "error");
            }
            else {
                showModal("Password changed successfully", "success");
                navigate('/login');
            }
        } catch (error) {
            console.error("Error attempting to change password:", error);
            showModal("Error attempting to change password", "error");

        }
    };

    // Post request without token
    const postData = async (url: string, data: IResetPasswordCredentials) => {
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

    useEffect(() => {
        // Set props from URL
        const setPropsFromURL = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const email = urlParams.get('email');
            const token = urlParams.get('token');
            setResetPasswordCredentials(prevState => ({
                ...prevState,
                email: email ?? '',
                token: token ?? ''
            }));
        };

        setPropsFromURL();
    }, []);

    // Handle password change
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setResetPasswordCredentials({ ...resetPasswordCredentials, password: value });
        setPasswordsMatch(value === resetPasswordCredentials.confirmpassword && value.length > 0);
    };

    // Handle confirm password change
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setResetPasswordCredentials({ ...resetPasswordCredentials, confirmpassword: value });
        setPasswordsMatch(value === resetPasswordCredentials.password && value.length > 0);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 grayBackground">
            <div>
                <CompanyLogo />
                <p className="pt-3 mb-3 text-center text-white fs-3">{resetPasswordCredentials.email}</p>
                <input type="password" className="form-control mb-3" value={resetPasswordCredentials.password} onChange={handlePasswordChange} placeholder="New password" />
                <input type="password" className="form-control mb-3" value={resetPasswordCredentials.confirmpassword} onChange={handleConfirmPasswordChange} placeholder="Confirm password" />
                <div className="d-flex flex-column align-items-stretch">
                    <button className="btn btn-primary mb-1 w-100" onClick={handleResetPassword} disabled={!passwordsMatch}>Confirm</button>
                    <div className="d-flex justify-content-center">
                        <a href='/login'>back</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resetpassword;