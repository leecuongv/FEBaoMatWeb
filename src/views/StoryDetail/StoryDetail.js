import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import './_StoryDetail.scss'
import { useParams, Link, useLocation } from 'react-router-dom'
import apiMain from '../../api/apiMain'
import LoadingData from '../../components/LoadingData'
import Grid from '../../components/Grid'
import Comment from '../../components/Comment'

const nav = [
  {
    path: 'about',
    display: 'Giới thiệu'
  },
  {
    path: 'rate',
    display: 'Đánh giá'
  },
  {
    path: 'chapter',
    display: 'Ds Chương'
  },
  {
    path: 'comment',
    display: 'Bình luận'
  },
  {
    path: 'donate',
    display: 'Hâm mộ'
  }
]

function StoryDetail() {
  const { url } = useParams()
  const [truyen, setTruyen] = useState(null);
  const [catGiu, setCatGiu] = useState(100)
  const [main, setMain] = useState(null)
  const [tab, setTab] = useState('')
  const active = nav.findIndex(e => e.path === tab)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(async () => {
    let params = { url }
    apiMain.getStory(params).then(res => {
      setTruyen(res)
      setTab('about')
      setLoadingData(false)
    })
  }, [url])
  
  useEffect(() => {
    switch (tab) {
      case 'about':
        setMain(<About key={'about'} truyen={truyen} />)
        break
      case 'rate':
        setMain(<Rate key={'rate'} />)
        break
      case 'chapter':
        console.log(truyen.url)
        setMain(<Chapter key={'chapter'} url={truyen.url} />)
        break
      case 'comment':
        console.log(truyen.url)
        setMain(<Comment key={'comment'} url={truyen.url} />)
        break
      default:
        setMain(<Donate key={'donate'} />)
    }

  }, [tab])


  const onClickTab = async (e) => {
    setTab(e.target.name)
  }
  //style
  const liClass = "border-primary rounded-2 color-primary"
  return (
    <Layout >
      <div className="main-content">
        {loadingData ? <LoadingData />
          :
          <>
            <div className="heroSide d-flex">
              <div className="img-wrap">
                <img src={truyen?.hinhanh} alt="" />
              </div>
              <div className="heroSide__main">
                <h2 className='mb-1'>{truyen?.tentruyen}</h2>
                <ul className=''>
                  <li className={liClass}>{truyen?.tacgia}</li>
                  <li className={liClass}>{truyen?.trangthai}</li>
                  <li className={liClass}>{truyen?.theloai}</li>
                </ul>
                <ul className="heroSide__info">
                  <li>
                    <span className='fs-16 bold'>{truyen?.sochap || '0'}</span>
                    <br />
                    <span>Chương</span>
                  </li>
                  <li>
                    <span className='fs-16 bold'>{truyen?.luotdoc || '0'}</span>
                    <br />
                    <span>Lượt đọc</span>
                  </li>

                  <li>
                    <span className='fs-16 bold'>{catGiu || '0'}</span>
                    <br />
                    <span>Cất giữ</span>
                  </li>

                </ul>

                <div className="heroSide__rate">
                  <span className={`fa fa-star ${truyen?.danhgia >= 1 ? 'checked' : ''}`}></span>
                  <span className={`fa fa-star ${truyen?.danhgia >= 2 ? 'checked' : ''}`}></span>
                  <span className={`fa fa-star ${truyen?.danhgia >= 3 ? 'checked' : ''}`}></span>
                  <span className={`fa fa-star ${truyen?.danhgia >= 4 ? 'checked' : ''}`}></span>
                  <span className={`fa fa-star ${truyen?.danhgia >= 5 ? 'checked' : ''}`}></span>
                  <span>&nbsp;{truyen?.danhgia}/5   ({truyen?.soluongdanhgia} đánh giá)</span>
                </div>
                <div className=''>
                  <button className='btn-primary mr-1'>Đọc truyện</button>
                  <button className='btn-outline mr-1'>Đánh dấu</button>
                  <button className='btn-outline'>Đề cử</button>
                </div>

              </div>
            </div>

            <div className="story-detail">
              <div className="navigate">
                {
                  nav.map((item, index) => {
                    return (
                      <a className={`navigate__tab fs-20 bold ${active === index ? 'tab_active' : ''}`}
                        key={index}
                        name={item.path}
                        onClick={onClickTab}
                      >{item.display}</a>)
                  })
                }
              </div>
            </div>

            <div className="story-detail__tab__main">
              {main}
            </div>
          </>
        }
      </div>
    </Layout>
  )
}


const About = props => {
  return (<>
    <p>
      {props.truyen?.noidung}
    </p>
  </>)
}

const Rate = props => {
  return (
    <h1>Đánh giá</h1>
  )
}

const Chapter = props => {
  const [chapters, setChapters] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const location = useLocation()
  const url = props.url
  useEffect(async () => {
    const params = {
      page: 0,
      size: 1000
    }

    apiMain.getNameChapters(props.url, params).then(res => {
      setChapters(res)
      setLoadingData(false)
    })
  }, [props.url])

  return (
    <>
      <h3>Danh sách chương</h3>
      {
        loadingData ? <LoadingData /> :
          <Grid gap={15} col={3} snCol={1}>
            {
              chapters.map((item, index) => {
                return <Link to={`${location.pathname}/${item.chapnumber}`} key={index} className='text-overflow-1-lines'>{item.tenchap}</Link>
              })
            }
          </Grid>
      }

    </>
  )
}


const Donate = props => {
  return (
    <h1>Hâm mộ</h1>
  )
}
export default StoryDetail