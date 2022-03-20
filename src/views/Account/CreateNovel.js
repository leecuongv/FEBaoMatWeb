import { useState, useEffect} from 'react';
import apiMain from '../../api/apiMain';
import { loginSuccess } from '../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import avt from '../../assets/img/avt.png'
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { setLoading } from '../../redux/messageSlice'
import Loading from '../../components/Loading';
import LoadingData from '../../components/LoadingData';
import getData from '../../api/getData';

function CreateNovel({userInfo}) {
    const types = ["Tiên hiệp", "Dã sử", "Kì ảo", "Kiếm hiệp", "Huyền huyễn", "Khoa huyễn"]
    const user = useSelector(state=>state.auth.login.user)
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState(avt)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tacgia, setTacgia] = useState("");
    const [theloai, setTheloai] = useState(types[0]);
    const loading = useSelector(state => state.message.loading)
    const [loadingUser, setLoadingUser] = useState(true)
    const dispatch = useDispatch()

    


    useEffect(async() => {
        if (userInfo) {
          setLoadingUser(false)
        }
      }, [userInfo])


    const handleCreateNovel = async (data) => {
        try {
            apiMain.createNovel(data,user, dispatch, loginSuccess )
                .then(res =>{
                    toast.success("Đăng truyện thành công", { autoClose: 1000, hideProgressBar: true, pauseOnHover: false })
                    dispatch(setLoading(false))
                })
                .catch(err=>{
                    
                    dispatch(setLoading(false))
                    toast.error(getData(err.response)?.details.message, { autoClose: 1000, hideProgressBar: true, pauseOnHover: false })
                })
        } catch (error) {
            console.log(error)
            toast.error("Lỗi cập nhật thông tin", { autoClose: 1000, hideProgressBar: true, pauseOnHover: false })
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        if (image == null)
            return;
        dispatch(setLoading(true))
        const url = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').filter(i=>i!=='').join('-').toLowerCase()
        const storageRef = ref(storage, `/images/truyen/${url}`);
        uploadBytes(storageRef, image).then((result) => {
            getDownloadURL(result.ref).then(async (urlImage) => {//lấy liên kết tới ảnh
                const data = {
                    tentruyen: name,
                    hinhanh: urlImage,
                    tacgia,
                    theloai,
                    url,
                    nguoidangtruyen:userInfo?._id
                }
                await handleCreateNovel(data)
            })
        })

    }

    ///OnChange event
    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeImage = (e) => {
        if (e.target.files.lenght !== 0) {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    const labelStyle = { 'minWidth': '100px', 'display': 'inline-block' }
    return (
        <>
            {
                loadingUser ? <LoadingData />
                    :
                    <div className="profile__wrap d-flex">
                        <div className="col-5 profile__avt">
                            <img src={preview} alt="" />
                            <input type={"file"} accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" name={"avatar"} onChange={onChangeImage} />
                        </div>
                        <div className="col-7 ">
                            <div className="profile__main">
                                <form>
                                    <div className="group-info">
                                        <label htmlFor="" style={labelStyle}>Tên truyện</label>
                                        <input onChange={onChangeName} value={name || ""} />
                                    </div>
                                    <div className="group-info">
                                        <label htmlFor="" style={labelStyle}>Mô tả</label>
                                        <input onChange={e => { setDescription(e.target.value) }} value={description}></input>
                                    </div>
                                    <div className="group-info">
                                        <label style={labelStyle}>Tác giả</label>
                                        <input required onChange={e => { setTacgia(e.target.value) }} value={tacgia}></input>
                                    </div>
                                    <div className="group-info">
                                        <label for="types">Thể loại</label>
                                        <select style={labelStyle} onChange={e => { console.log(e.target.value); setTheloai(e.target.value) }} value={theloai} id="types" name="types">
                                            {
                                                types.map(item => { return (<option value={item}>{item}</option>) })
                                            }
                                        </select>
                                    </div>
                                    <div className="d-flex">
                                        <button onClick={handleCreate}>{loading ? <Loading /> : ''} Đăng truyện</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            }</>

    )
}

export default CreateNovel