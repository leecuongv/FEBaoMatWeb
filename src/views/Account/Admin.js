
import { Link, useLocation, Route, Routes } from 'react-router-dom';
import Layout from '../../components/Layout';

import { useEffect,useState } from 'react';
import apiMain from '../../api/apiMain';
import { loginSuccess } from '../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import getData from '../../api/getData';
import ChangePassword from './ChangePassword'
import Profile from './Profile';
import Users from './Users'
import TuTruyen from './TuTruyen';
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
      path: "users",
      display: "Thành viên",
      icon: ""
    },
    {
      path: "add-user",
      display: "Thêm thành viên",
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

  const user = useSelector(state => state.auth.login?.user);
  const [userInfo, setUserInfo] = useState(null);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const active = menu.findIndex(e => e.path === pathname.split('/')[2]);

  useEffect(() => {
    const getUsers = async () => {
      const res = getData(await apiMain.getUserInfo(user, dispatch, loginSuccess));
      setUserInfo(res.userInfo)
    }
    getUsers()
  }, [])



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
          <div className="col-9 " style={{'minHeight':'500px'}}>
            <Routes>
              <Route path='profile' element={<Profile userInfo={userInfo}/>}></Route>
              <Route path='change-password' element={<ChangePassword />}></Route>
              <Route path='users' element={<Users dispatch={dispatch}/>}></Route>
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