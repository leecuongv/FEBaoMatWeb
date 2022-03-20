
import {Link, useLocation, useNavigate} from 'react-router-dom'
function Reading(props) {
  const data=props.data
  const location = useLocation()
  const navigate = useNavigate()
  console.log(navigate)
const onClickTruyen=(e)=>{
  navigate('/truyen/'+e.target.name)
}

  return (
    <div className="reading-card">
      <div className="reading-card__img-wrap">
        <img src={data.hinhanh} alt="" />
      </div>
      <div className="reading-card__content">
        <a onClick={onClickTruyen} name={data?.url} className="reading-card__title">
          {data.tentruyen}
        </a>
        <div className="reading-card__chap">
          Đã đọc: {data.dadoc}/{data?.total}
        </div>
      </div>
    </div>
  )
}

export default Reading