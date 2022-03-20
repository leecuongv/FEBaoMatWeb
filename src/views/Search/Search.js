import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiMain from '../../api/apiMain'
import Story from '../../components/Story'
import ListStory from '../ListStory/ListStory'
import Section, {SectionHeading,SectionBody} from '../../components/section'


function Search(props) {
    const [datas,setDatas]=useState([])
    const query = useSelector(state=>state?.message?.query||"")
    useEffect(async()=>{
        if(!query){
            setDatas([])
            return
        }
        try {
            const response = await apiMain.getStorysByName({search:query})
            if(response){
                setDatas(response)
            }
        } catch (error) {
            console.log(error)
        }
    },[query])
  return (
    <>
    <a><span 
      className='imgHero'>
        </span></a>
    
      <div className="main">
        <div className="container">
          <div className="main-content">
          <div className='d-flex'>
          <Section>
             <SectionHeading>
              <h4 className='section-title'>Kết quả</h4>
            </SectionHeading>
            <SectionBody>
              <div className='list-story'>
               { datas.map((data,index)=><Story key={index} data={data}/>)}
            </div>
            </SectionBody>
          </Section>
              
        </div>
          </div>
        </div>
      </div>
           
    </>
    
  )
}

export default Search