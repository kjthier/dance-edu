import React from 'react'
import logo from '../../assets/logo.png'
import './Footer.css'

const Footer: React.FC = () => {
    return (
      <body>
        <section>
          <footer className='top'>
            <img src={logo} alt='DANCE-EDU logo' />
            <div className='links'>
              <div>
                <a>About</a>
                <a>Studios</a>
                <a>Media</a>
                <a>FAQs</a>
                <a>Contact</a>
              </div>
            </div>
          </footer>
          <footer className='bottom'>
            <div className='legal'>
              <span>© 2023 All rights reserved</span>
              <a>License</a>
              <a>Terms</a>
              <a>Privacy</a>
            </div>
            <div className='links'>
              <a className='fa-brands fa-instagram'></a>
              <a className='fa-brands fa-youtube'></a>
              <a className='fa-brands fa-facebook'></a>
            </div>
          </footer>
        </section>
      </body>
    );
  };
  
  export default Footer;
  
