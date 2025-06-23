import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the token
        localStorage.removeItem('token');

        // Optional: You can clear other localStorage/sessionStorage values if needed
        // sessionStorage.clear();

        // Redirect to login page after short delay
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
                <h2 className="text-4xl font-semibold text-purple-800 mb-2">
                    Logging out...
                </h2>
                <p className="text-3xl text-blue-500">You will be redirected shortly.</p>
            </div>
        </div>
    );
};

export default Logout;
