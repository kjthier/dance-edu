import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Auth: React.FC = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handleAuth = async () => {
        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup'
            const payload = isLogin ? { email, password } : { username, email, password }

            const response = await axios.post(`http://localhost:3000${endpoint}`, payload)

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
        <div>
            <button onClick={() => setIsLogin(true)}>Login</button>
            <button onClick={() => setIsLogin(false)}>Signup</button>

            {isLogin ? (
                <>
                    <h1>Login</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <h1>Signup</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </>
            )}

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleAuth}>
                {isLogin ? 'Login' : 'Signup'}
            </button>
        </div>
    )
    
}

export default Auth
