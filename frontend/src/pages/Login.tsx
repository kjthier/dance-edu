import React, { useState } from 'react'
import axios from 'axios'

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password
        })
        
}
        catch (error) {
            console.log(error)
        }
    }

}

    export default Login