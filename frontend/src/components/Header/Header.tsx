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
    console.log(`Fetching data for user ID: ${userId}`)
    fetch(`https://dance-edu.onrender.com/api/auth/user/${userId}`)
    // fetch(`http://localhost:3000/api/auth/user/${userId}`)
    .then(res => res.json())
    
    .then(data => {
      console.log("Data from server:", data)

      setFirstName(data.firstName)

    })
  }, [userId])
  console.log("Updated firstName:", firstName)



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