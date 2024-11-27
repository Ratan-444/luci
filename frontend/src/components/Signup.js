import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            setError('Name, email, and password are required.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const url = 'http://localhost:5000/auth/signup';

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            if (response.ok) {
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                setError(result.error?.details[0]?.message || result.message || 'Signup failed.');
            }
        } catch (err) {
            setError('An error occurred while signing up. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                    />
                </div>
                {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
                <button type='submit' disabled={loading}>
                    {loading ? 'Signing up...' : 'Signup'}
                </button>
                <p>
                    Already have an account?{' '}
                    <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
