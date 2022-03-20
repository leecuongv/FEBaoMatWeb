import React from 'react'
import {Link } from 'react-router-dom'
function Story(props) {
    const data=props.data;
  return (
    <>
    <div className='story-card'>
        <div className='story-card__img-wrap'>
            <img src={data.hinhanh} alt=""/>
        </div>
        <div className='story-card__content'>
            <h2 className='story-card__tilte'><Link to={`truyen/${data.url}`}>{data['tentruyen']}</Link></h2>
            <div className='story-card__description'>{data.noidung}</div>
            <div className='story-card__info'>
              <span className='story-card__author'>{data.tacgia}</span>
              <span className='story-card__type border border-primary color-primary fs-12' style={{padding:4+'px'}}>{data.theloai}</span>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Story