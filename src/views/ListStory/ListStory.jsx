import { useEffect,useState } from 'react'
import apiMain from '../../api/apiMain';
import Reading from '../../components/Reading';
import Section, {SectionHeading,SectionBody} from '../../components/section';
import Story from '../../components/Story';
import getData from '../../api/getData';
import { useDispatch,useSelector } from 'react-redux';
import {loginSuccess} from '../../redux/authSlice'
import './ListStory.scss'

function ListStory() {

    const [datas,setData]=useState([]);
    const [readings,setReadings]=useState([])
  const user = useSelector(state=>state.auth.login.user)
  const dispatch = useDispatch()
  useEffect(async()=>{
    if(user){
      apiMain.getReadings(user,dispatch,loginSuccess)
        .then(res=>{
          console.log(res)
          setReadings(res)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },[])

    useEffect(()=>{
        const getStory = async()=>{
          const res = getData(await apiMain.getStorys({size:6}));
          setData(res);
        }
        getStory();

    },[])
  return (
    <>
    <div className='d-flex'>
        <div className='col-8'>
          <Section>
             <SectionHeading>
              <h4 className='section-title'>Biên tập viên đề cử</h4>
              <a>Xem tất cả</a>
            </SectionHeading>
            <SectionBody>
              <div className='list-story'>
               { datas.map((data,index)=><Story key={index} data={data}/>)}
            </div>
            </SectionBody>
          </Section>
              
        </div>

        <div className='col-4'>
          <Section>
            <SectionHeading>
            <h4 className='section-title'>Đang đọc</h4>
            <a>Xem tất cả</a>
            </SectionHeading>
            <SectionBody>
              <div className='list-reading'>
              {readings.map((item,i)=><Reading key={i} data={{
              tentruyen:item.dautruyenId?.tentruyen,
              hinhanh:item.dautruyenId?.hinhanh,
              dadoc:item.chapNumber,
              total:item.dautruyenId?.sochap,
              url:item.dautruyenId?.url
              }}/>)}
            </div>
            </SectionBody>
          </Section>
          
        </div>
    </div>
    </>

  )
}

export default ListStory