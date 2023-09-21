import React, { useEffect, useState } from 'react'
import { Box, Text, Heading, Flex } from '@radix-ui/themes'
import Avatr from './Avatar'
import logo from '../../assets/logo.png'
import axios from 'axios'
import './Header.css'

interface HeaderProps {
    userId: string
}

const Header: React.FC<HeaderProps> = ({ userId }) => {
    console.log('userId: ', userId)
    const [firstName, setFirstName] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://dance-edu.onrender.com/api/auth/user/${userId}`)
                setFirstName(response.data.firstName)
            } catch (error) {
                console.error('An error occurred while fetching data: ', error)
            }
        }

        fetchData()
    }, [userId])

    return (
        <div className='header'>
            <Heading className='logo'>
                <img src={logo} alt='DANCE-EDU logo' />
            </Heading>
            <Flex className='profile-block'>
                <Flex className='welcome'>
                    <Avatr />
                    <Box>
                        {firstName && (
                            <Text className='welcome-text' as='p' mb='1' size='2' weight='bold'>
                                Welcome, {firstName}!
                            </Text>
                        )}
                    </Box>
                </Flex>
                <Box>
                    <Text size='5' color='gray' className='quote'>
                        “Dancers are made, not born.” - Mikhail Baryshnikov
                    </Text>
                </Box>
            </Flex>
        </div>
    );
};

export default Header;
