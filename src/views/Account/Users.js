import Modal,{ModalContent} from '../../components/modal'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiMain from '../../api/apiMain'
import { loginSuccess } from '../../redux/authSlice'
import { toast } from 'react-toastify'

function Users(props) {
  const user = useSelector(state => state.auth.login?.user)
  const [listUser, setListUser] = useState([])
  const [choose, setChoose]=useState(null)
  const [roles,setRoles]=useState([])
  const [id,setId] = useState("")
  const [modalRole,setModalRole]=useState(false)
  const dispatch = useDispatch()

  const onClickRole =(e)=>{
    const role = document.getElementById(`roles-${e.target.name}`).innerText
    setModalRole(true)
    setRoles(role.length===0?[]:role.split(', '))
  }
  const onClickShow = (e)=>{
    if(choose===e.target.id){
      setChoose(null)
      setId(null)
    }
    else{
      setChoose(e.target.id)
      setId(e.target.id)
    }
  }

  const onClickDelete =async(e)=>{
    if(id){
      console.log(id)
      apiMain.deleteAccount(user,dispatch,loginSuccess,{id:id})
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }

  const onClickActive=async(e)=>{
    if(id){
      apiMain.activeByAdmin(user,dispatch,loginSuccess,{id})
      .then(res=>{
        const newList = listUser.map(item =>{return item._id===res?._id?res:item})
        setListUser(newList)
        toast.success("Kích hoạt thành công",{hideProgressBar:true,pauseOnHover:false,autoClose:1000})
      })
      .catch(err=>{
        toast.error("Kích hoạt thất bại",{hideProgressBar:true,pauseOnHover:false,autoClose:1000})
      })
    }
  }

  const onClickInActive=async(e)=>{
    if(id){
      apiMain.inactiveByAdmin(user,dispatch,loginSuccess,{id})
      .then(res=>{
        const newList = listUser.map(item =>{return item._id===res?._id?res:item})
        setListUser(newList)
        toast.success("Khoá thành công",{hideProgressBar:true,pauseOnHover:false,autoClose:1000})
      })
      .catch(err=>{
        toast.error("Khoá thất bại",{hideProgressBar:true,pauseOnHover:false,autoClose:1000})
      })
    }
  }

  const closeModalRole = useCallback(()=>{
    setModalRole(false)
  })
  const hideMenu =(e)=>{
    setChoose(null)
  }

  useEffect(() => {
    const loadUsers = async()=>{
      apiMain.getAllUser(user, props.dispatch, loginSuccess)
      .then(res=>{
        setListUser(res)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    loadUsers();   
  }, [])

  return (
    <>
      <h1>All Users</h1>

      <table className='user-table' style={{ "width": "90%" }}>
        <thead>
        <tr>
          <th>Tên đăng nhập</th>
          <th>Email</th>
          <th>Trạng thái</th>
          <th>Quyền hạn</th>
          <th>Thao tác</th>
        </tr></thead>
        <tbody>
          {
            listUser.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td key={item.active}>{item.active ? "Đã kích hoạt" : "Chưa kích hoạt"}</td>
                  <td id={`roles-${item._id}`}>{item.roles?.map(e=>e.name).join(', ') || ""}</td>
                  <td tabIndex={index} onBlur={hideMenu}>
                    <div  className='d-flex user__item' >
                      <a className='ma' id={item._id}  onClick={onClickShow} >
                        <i id={item._id} name={item._id}  className="ma fs-20 fa-solid fa-ellipsis"></i>
                        </a>
                    </div>
                    <div className={`user__menu ${choose===item._id?'active':''}`}>
                      <ul>
                        <li><a key={item.active} name={item._id} onClick={item.active?onClickInActive:onClickActive}>
                          {item.active?'Khoá tài khoản':'Kích hoạt'}</a></li>
                        <li><a name={item._id} onClick={onClickRole}>Cấp quyền</a></li>
                        <li><a name={item._id} onClick={onClickDelete}>Xoá</a></li>
                      </ul>
                    </div>
                  
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {modalRole&&<Modal active={modalRole}>
          <ModalContent onClose={closeModalRole}>
                <ChooseRoles roles={roles} userId={id}/>
          </ModalContent>
      </Modal>}

    </>

  )
}

const roleBase = [
  'ADMIN','USER'
]
const ChooseRoles = (props)=>{
  const user = useSelector(state=>state.auth.login?.user)
  const [roles,setRoles]=useState(props.roles)
  const dispatch = useDispatch();
  
  const  onClickUpdateRole =async(e)=>{
    e.preventDefault();
    const params = {roles,id:props.userId}
    if(user)
    apiMain.updateRole(user,dispatch,loginSuccess,params)
      .then(res => {
        toast.success("Cập nhật quyền thành công",{hideProgressBar:true,autoClose:1200,pauseOnHover:false})
      })
      .catch(err=>{
        let _=err.response?.details?.message
        toast.error(_,{hideProgressBar:true,autoClose:1200,pauseOnHover:false})
      })


  }

  const onClickChooseRole=(e)=>{
    
    if(e.target.name){
      let role=e.target.name
      
      if(roles.includes(role)){
        let newRoles = roles.filter((item)=>{
          return item !==role
        })
        if(newRoles.length===0){
          toast.warning("Phải chọn ít nhất một quyền",{hideProgressBar:true,autoClose:1200})
          return
        }
        setRoles(newRoles)
      }
      else{
         setRoles([...roles,role])
      }
    }
  }
  return(
    <div>
      <form className='choose-roles' action="">
        <h3 style={{"textAlign":"center"}}>Chọn quyền</h3>
        {roleBase.map(item=>{
          return (
              <label key={item} htmlFor={item} onClick={onClickChooseRole} name={item} className='remember-label'>
                {item}
                <input name={item} readOnly type={'checkbox'} checked={roles.includes(item)} id={item}></input>
                <span className='checkmark'></span>
              </label>
   
          )
        })}
        <button onClick={onClickUpdateRole}>Cấp quyền</button>
      </form>
    </div>
  )
}
export default Users