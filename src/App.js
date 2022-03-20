import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './App.scss';
import Home from './views/Home/Home';
import Account from './views/Account/Account';
import Admin from './views/Account/Admin';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './views/PrivateRoute';
import StoryDetail from './views/StoryDetail/StoryDetail';
import Active from './views/Active/Active';
import Chapter from './views/Chapter/Chapter';
import Search from './views/Search/Search';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='truyen/:url' element={<StoryDetail />}></Route>
        <Route element={<PrivateRoute roles={['USER']} />}>
          <Route path='/user/*' element={<Account />}></Route>
        </Route>
        <Route element={<PrivateRoute roles={['ADMIN']} />}>
          <Route path='admin/*' element={<Admin />}>
          </Route></Route>
        <Route path='active/:token' element={<Active />}></Route>
        <Route path='truyen/:url/:chapnum' element={<Chapter />}></Route>
        <Route path='tim-kiem' element={<Search/>}/>
      </Routes>
      <ToastContainer autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover={false} />
    </HashRouter>
  );
}

export default App;
