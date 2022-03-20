import React from 'react'
import ListStory from '../ListStory/ListStory'
import './Home.scss'

function Home() {
  return (
    <>
    <a><span 
      className='imgHero'>
        </span></a>
    
      <div className="main">
        <div className="container">
          <div className="main-content">
             <ListStory/>
          </div>
        </div>
      </div>
           
    </>
    
  )
}

export default Home