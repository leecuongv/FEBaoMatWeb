import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import apiMain from '../api/apiMain';
import avt from '../assets/img/avt.png'
import { loginSuccess } from '../redux/authSlice';

function Comment(props) {
    const [count, setCount] = useState(0);
    const user = useSelector(state => state.auth.login?.user)
    const [comments, setComments] = useState([])
    const [content, setContent] = useState("")
    const url = props.url
    const dispatch = useDispatch()

    const onClickCreateComment = async (e) => {
        if (user) {
            const params = { url, content }
            apiMain.createComment(user, params, dispatch, loginSuccess)
                .then(res => {
                    setComments(pre => [res, ...pre])
                    setContent("")
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            toast.warning("Vui lòng đăng nhập trước khi bình luận", {
                hideProgressBar: true,
                pauseOnHover: false,
                autoClose: 1200
            })
        }
    }

    const getComments = async () => {
        try {
            const res = await apiMain.getCommentsByUrl({ url: url })
            if (res)
                return res
            return []
        } catch (error) {
            return []
        }
    }

    useEffect(() => {
        const loadComment = async () => {
            const data = await getComments()
            console.log(data)
            setCount(data?.length || 0)
            setComments(data)
        }
        loadComment();
    }, [])

    

    const onClickDeleteComment = async (e) => {
        if (user) {
            apiMain.deleteComment(user, { id: e.target.name }, dispatch, loginSuccess)
                .then(async (res) => {
                    toast.success(res.message, { hideProgressBar: true, pauseOnHover: false, autoClose: 1000 })
                    const data = await getComments()
                    setComments(data)
                })
                .catch(err => {
                    toast.error(err.response.data.detail.message, { hideProgressBar: true, pauseOnHover: false, autoClose: 1000 })
                }
                )
        }
    }

    const calDate = (createdAt) => {//xử lý thời gian
        let newDate = new Date()
        let createDate = new Date(createdAt)
        let diff = (newDate.getTime() - createDate.getTime()) / 60000

        if (diff / 60 >= 1) {
            if (diff / (60 * 24) >= 1) {
                if (diff / (60 * 24 * 30) >= 1) {
                    if (diff / (60 * 24 * 30 * 365) >= 1) {
                        return `${(diff / (60 * 24 * 30 * 365)).toFixed(0)} năm trước`
                    }
                    return `${(diff / (60 * 24 * 30)).toFixed(0)} tháng trước`
                }
                return `${(diff / (60 * 24)).toFixed(0)} ngày trước`
            }
            return `${(diff / 60).toFixed(0)} giờ trước`
        }
        return `${diff.toFixed(0)} phút trước`

    }
    return (
        <div className="comment__wrap">
            <h1>Bình luận {count || 0}</h1>
            <div className="comment__form d-flex w100">
                <div className="avatar--45 mr-1">
                    <img src={user?.image || avt} alt="" />
                </div>
                <div className="comment__input">
                    <textarea style={{ 'height': '100%', 'padding': '5px 20px 5px 5px' }} className='fs-15 fw-5' value={content} onChange={e => { setContent(e.target.value) }}></textarea>
                    <div className='d-flex comment__icon' ><span onClick={onClickCreateComment} className=" fs-20 "><i className="fa-solid fa-comment"></i></span></div>
                </div>

            </div>
            <hr />
            <div>
                {
                    comments.map((item, index) => {
                        return (
                            <div key={item.id} >
                                <div className='d-flex'>
                                    <div className="comment__avatar ">
                                        <div className="avatar--45 mr-1">
                                            <img src={item.image || avt} alt="" />
                                        </div>
                                    </div>
                                    <div className="comment__body">
                                        <div className="comment__author__info">
                                            <h4>{item.tenhienthi}</h4>
                                            <span className='fs-12 fw-4 text-secondary'>
                                                {
                                                    calDate(item.createdAt)
                                                }
                                            </span>
                                        </div>
                                        <div className="comment__content mb-1">
                                            {item.content}
                                        </div>
                                        <ul className="comment__nav">
                                            {item.username === user?.username ?
                                                <li name={item.id} onClick={onClickDeleteComment} className='fs-14 text-secondary'><i className="fa-solid fa-trash"></i> Xoá</li> : ''
                                            }
                                            <li className='fs-14 text-secondary'><i className="fa-solid fa-reply"></i> Trả lời</li>
                                            <li className='fs-14 text-secondary'><i className="fa-solid fa-flag"></i> Báo xấu</li>

                                        </ul>

                                    </div>
                                    </div>
                                <hr />
                            </div>)
                    })
                }
            </div>
        </div>
    )
}

export default Comment