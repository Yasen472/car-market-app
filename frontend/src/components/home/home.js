import React from 'react'
import './home.css'
import audiImage from '../images/pxfuel.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home">
          <div className="heading-container">
            <h4 className='heading'>EXPLORE THE BEST DEALS ON USED CARS WITH US</h4>
            <button className='heading-btn'>
              <Link style={{ textDecoration: 'none' }} to='/listings' className='btn-link'>
                Get Started
              </Link>
            </button>
          </div>

          <img src={audiImage} className='heading-image' />
        </div>
      </div>
    </>
  )
}

export default Home