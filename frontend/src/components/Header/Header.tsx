import { useEffect, useState } from 'react'
import { Box, Text, Heading, Flex } from '@radix-ui/themes'
import Avatr from './Avatar'
import logo from '../../assets/logo.png'
import './Header.css'
interface HeaderProps {
  userId: string 
}

const Header: React.FC<HeaderProps> = ({ userId }) => {
  const [firstName, setFirstName] = useState('')

  useEffect(() => {
    fetch(`https://dance-edu.onrender.com/api/auth/user/${userId}`)
    .then(res => res.json())
    .then(data => {
      setFirstName(data.firstName)
    })
  }, [userId])

    return (
        <div className='header'>
          <Heading className='logo'>
            <img src={logo} alt='DANCE-EDU logo' />
          </Heading>
          <Flex className='profile-block'>
            <Flex className='welcome'>
              <Avatr />
              <Box >
                <Text as="p" mb="1" size="2" weight="bold">
                  Welcome, {firstName}!
                </Text>
              </Box>
            </Flex>
            <Box >
              <Text size="5" color="gray" className="quote" >
                  “Dancers are made, not born.” - Mikhail Baryshnikov
              </Text>
            </Box>
          </Flex>
        </div>
    )
 }
 
export default Header