import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import axios from 'axios'

const Auth: React.FC = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    // hardcoded user as logged in for dev
    // useEffect(() => {
    //     const autoLogin = async () => {
    //         if (process.env.NODE_ENV === 'development') {
    //             const baseURL = 'https://dance-edu.onrender.com'
    //             const endpoint = '/api/auth/login'

    //             // Your test user's credentials
    //             const testEmail = 'karint@example.com'
    //             const testPassword = '1234'

    //             try {
    //                 const response = await axios.post(`${baseURL}${endpoint}`, {
    //                     email: testEmail,
    //                     password: testPassword,
    //                 })

    //                 if (response.data.token) {
    //                     localStorage.setItem('authToken', response.data.token)
    //                     localStorage.setItem('userId', response.data.userId)
    //                     navigate(`/student/${response.data.userId}/schedule`)
    //                 }
    //             } catch (error) {
    //                 console.log('Auto-login failed:', error)
    //             }
    //         }
    //     }

    //     autoLogin()
    // }, [navigate])

    const handleAuth = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const baseURL = 'https://dance-edu.onrender.com'
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
            const payload = isLogin
                ? { email, password }
                : { firstName, lastName, username, email, password }

            const response = await axios.post(`${baseURL}${endpoint}`, payload)

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token) // store received JWT in local storage
                localStorage.setItem('userId', response.data.userId) // store received userId in local storage
                navigate(`/student/${response.data.userId}/schedule`)
            }
        } catch (error) {
            console.log('An error occured during login:', error)
        }
    }

    return (
        <div className='login'>
            <div className='form'>
                <form onSubmit={handleAuth}>
                    {isLogin ? (
                        <>
                            <span>Welcome!</span>
                            <input
                                type='email'
                                placeholder='email'
                                className='form-control inp_text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type='password'
                                placeholder='password'
                                className='form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <span>Signup</span>
                            <input
                                type='text'
                                placeholder='choose a username'
                                className='form-control inp_text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder='first name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder='last name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <input
                                type='email'
                                placeholder='email'
                                className='form-control inp_text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type='password'
                                placeholder='create a password'
                                className='form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    )}

                    <button type='submit'>
                        {isLogin ? 'Login' : 'Create account'}
                    </button>
                    {isLogin ? (
                        <button
                            className='conditional-btn'
                            onClick={() => setIsLogin(false)}
                            type='button'
                        >
                            or create an account
                        </button>
                    ) : (
                        <button
                            className='conditional-btn'
                            onClick={() => setIsLogin(true)}
                            type='button'
                        >
                            or login
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Auth