
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin, handleRegister } from '../handle/handleAuth';

function AddUser() {
  
    const [emailRegister, setEmailRegister] = useState("");
    const [usernameRegister, setUsernameRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [passwordCfRegister, setPasswordCfRegister] = useState("");
    const msgRegister = useSelector(state => state.message.register?.msg)
    const onRegister = async (e) => {
      e.preventDefault();
      const user = {
        username: usernameRegister,
        password: passwordRegister,
        email: emailRegister
      };
      await handleRegister(user, props.dispatch, props.navigate);
    }
  
    return (
      <div className="form-wrap">
        <form>
          <div className="form-group d-flex">
            <label>Email</label>
            <div className="field-wrap">
              <input placeholder="example@gmail.com" required name="emailRegister" type="text" value={emailRegister}
                onChange={e => { setEmailRegister(e.target.value) }}
              />
            </div>
  
          </div>
          <div className="form-group d-flex">
            <label>Tên đăng nhập</label>
            <div className="field-wrap">
              <input required name="usernameRegister" type="text" value={usernameRegister}
                onChange={e => { setUsernameRegister(e.target.value) }} />
            </div>
  
          </div>
          <div className="form-group d-flex">
            <label>Mật khẩu</label>
            <div className="field-wrap">
              <input required={true} name={"passwordRegister"} type='password' value={passwordRegister}
                onChange={e => { setPasswordRegister(e.target.value) }}
              />
            </div>
  
          </div>
          <div className="form-group d-flex">
            <label>Nhập lại mật khẩu</label>
            <div className="field-wrap">
              <input required={true} name={"passwordCfRegister"} type='password' value={passwordCfRegister}
                onChange={e => { setPasswordCfRegister(e.target.value) }}
              />
            </div>
          </div>
          <span>{msgRegister}</span>
          <button onClick={onRegister}>Đăng ký</button>
  
        </form>
      </div>
    )
}

export default AddUser