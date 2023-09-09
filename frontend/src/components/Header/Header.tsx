import React from 'react'
import { Box, Text, Heading, Flex } from '@radix-ui/themes'
import Avatr from './Avatar'
import logo from '../../assets/logo.png'
import './Header.css'

const Header: React.FC = () => {

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
                  Welcome, Karin!
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