import React from 'react'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons'


const InfoBox = ({ text, link, btnText }) => (
  <div className='info-box'>
    <p className='font-medium sm:text-xl text-center'>{text}</p>
    <Link to={link} className='neo-brutalism-white neo-btn'>
      {btnText}
      <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
    </Link>
  </div>
)

const renderContent = {
  1: (
    <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
      Hello, i am <span className='font-semibold'>Kate</span> 👋
      <br/>
      A Frontend Engineer from Russia
    </h1>
  ),
  2: (
    <InfoBox
      text='Worked with many companies and picked up many skiils along the way'
      link='/about'
      btnText='Learn more'
    />
  ),
  3: (
    <InfoBox
      text='See my portfolio'
      link='/projects'
      btnText='Portfolio'
    />
  ),
  4: (
    <InfoBox
      text='Need a project done or looking for a dev?'
      link='/contact'
      btnText="Let's talk"
    />
  )
}


const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null
}

export default HomeInfo
