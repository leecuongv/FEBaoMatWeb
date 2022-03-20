import React, { useEffect } from 'react'
import Section, { SectionBody, SectionHeading } from '../../components/section'

function NewestChapter() {
  
    useEffect(()=>{

    },[])
  return (
    <div className='d-flex'>
        <Section>
            <SectionHeading>
            <h4 className='section-title'>Mới cập nhật</h4>
              <a>Xem tất cả</a>
            </SectionHeading>
            <SectionBody>
                <table>
                  <tbody>
                    
                  </tbody>
                </table>
            </SectionBody>
        </Section>
    </div>
  )
}

export default NewestChapter