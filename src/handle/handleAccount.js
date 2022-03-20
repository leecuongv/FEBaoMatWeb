import apiMain from "../api/apiMain"
import { toast } from "react-toastify"
import { getMessage } from "../lang/lang"
import {setLoading} from '../redux/messageSlice'

export const handleChangePassword = async (user, dispatch, loginSuccess, params) => {
    dispatch(setLoading(true))
    apiMain.ChangePassword(user, dispatch, loginSuccess, params).then(res => {
        toast.success("Đổi mật khẩu thành công", {
            autoClose: 1000,
            hideProgressBar: true,
            pauseOnHover: false
        })
    }).catch(error => {
        let details = error.response.data?.details
        let _ = details.password || details.message || details[0] || "Lỗi đổi mật khẩu"

        toast.error(getMessage(_), {
            autoClose: 1000,
            hideProgressBar: true,
            pauseOnHover: false
        })
    })
    dispatch(setLoading(false))
}