import React, { useContext } from 'react';
import { FaGoogle } from "react-icons/fa";
import { setAuthToken } from '../../api/auth';
import { AuthContext } from '../../contexts/Authprovider/Authprovider';

const SocialLogin = () => {

    const { googleLogin } = useContext(AuthContext)

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user
                console.log(user)
                // get jwt token -
                setAuthToken(user)
            })
            .catch(error => console.error(error))
    }

    return (
        <div>
            <p className='text-center font-semibold text-blue-500'>Social Login</p>
            <button onClick={handleGoogleLogin} className="btn btn-outline btn-error"><FaGoogle className='text-xl'></FaGoogle></button>
        </div>
    );
};

export default SocialLogin;