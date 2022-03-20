import React, { useCallback } from 'react'

import { Link, useLocation, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

import { useEffect,useState } from 'react';
import apiMain from '../../api/apiMain';
import { loginSuccess, logoutSuccess } from '../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import getData from '../../api/getData';
import ChangePassword from './ChangePassword'
import Profile from './Profile';
import TuTruyen from './TuTruyen';
import { toast } from 'react-toastify';
import CreateNovel from './CreateNovel';

function Account() {
  const menu = [
    {
      path: "profile",
      display: "Hồ sơ",
      icon: ""
    },
    {
      path: "change-password",
      display: "Đổi mật khẩu",
      icon: ""
    },
    {
      path: "tu-truyen/reading",
      display: "Tủ truyện",
      icon: ""
    },
    {
      path: "dang-truyen",
      display: "Đăng truyện",
      icon: ""
    },
  ]

  const [userInfo ,setUserInfo]=useState(null)
  const user = useSelector(state => state.auth.login?.user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const active = menu.findIndex(e => e.path === pathname.split('/')[2]);

useEffect(()=>{
  const getUsers = async () => {
    try{
      const res = getData(await apiMain.getUserInfo(user, dispatch, loginSuccess));
      setUserInfo(res.userInfo)
    }catch(err){
      if(err.response.status === 403 || err.response.status === 401){
        //toast.warning("Phiên đăng nhập của bạn đã hết. Vui lòng đăng nhập lại",
        //  {autoClose: 800,pauseOnHover: false,hideProgressBar: true})
        dispatch(logoutSuccess())
        //navigate('/')
      }
      else{
      toast.error("Lỗi thông tin",
          {autoClose: 800,pauseOnHover: false,hideProgressBar: true})
      }
    }
    
  }
  getUsers()
},[])

  const changeUserInfo=useCallback((data)=>{
    setUserInfo(data)
  })

  return (
    <Layout >
      <div className="main-content">
        <div className="d-flex">
          <div className="col-3">
            <ul className="list-group">
              {
                menu.map((item, index) => {
                  return <li key={index} className={`list-group__item ${index === active ? 'active' : ''}`} ><Link to={item.path}>{item.display}</Link></li>
                })
              }
            </ul>

          </div>
          <div className="col-9 "  style={{'minHeight':'500px'}}>
            <Routes>
              <Route path='profile' element={<Profile userInfo={userInfo} changeUserInfo={changeUserInfo}/>}></Route>
              <Route path='change-password' element={<ChangePassword />}></Route>
              <Route path='tu-truyen/*' element={<TuTruyen userInfo={userInfo}/>}></Route>
              <Route path='dang-truyen' element={<CreateNovel  userInfo={userInfo}  />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Layout>
  )
}


export default Account