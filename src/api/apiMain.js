import { logoutSuccess } from "../redux/authSlice";
import ChangePassword from "../views/Account/ChangePassword";
import { axiosClient, axiosInstance } from "./axiosClient";
import getData from './getData'
const apiMain = {

    ///authentication
    login: async (params) => {
        const res = await axiosClient.post('/auth/login', params)
        return res.data;
    },
    register: async (params) => {
        const res = await axiosClient.post('/auth/register', params)
        return res.data;
    },
    forgetPassword: async (params) => {
        const res = await axiosClient.post('/auth/forgetpassword', params)
        return getData(res);
    },
    reActive: async (params) => {
        const res = await axiosClient.post('/auth/reactive', params)
        return getData(res);
    },
    verifyToken: async (user, dispatch, stateSuccess) => {
        const url = `/auth/verifytoken`
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return (await axi.get(url, { headers: { Authorization: `Bearer ${user.accessToken}` } })).data;
    },
    checkUsername:async (params) => {
        const res = await axiosClient.post('/auth/checkusername', params)
        return getData(res);
    },
    checkEmail:async (params) => {
        const res = await axiosClient.post('/auth/checkemail', params)
        return getData(res);
    },

    ///get data

    getStorys: async (params) => {
        const res = await axiosClient.get(`/novels/`, { params: params });
        return getData(res);

    },
    getStorysByName: async (params) => {
        const res = await axiosClient.get(`/novels/search`, { params: params });
        return getData(res);

    },
    getStorysByUserId: async (params) => {
        const res = await axiosClient.get(`/novels/created`, { params: params });
        return getData(res);

    },
    getStory: async (params) => {
        const res = await axiosClient.get(`/novels/novel/${params.url}`);
        return getData(res);

    },
    getChapters: async (url, params) => {
        const res = await axiosClient.get(`/novels/novel/${url}/chuong`, { params: params });
        return getData(res);

    },
    getNameChapters: async (url, params) => {
        const res = await axiosClient.get(`/novels/novel/${url}/mucluc`, { params: params });
        return getData(res);
    },
    getChapterByNumber: async (tentruyen, chapnum) => {
        return getData(await axiosClient.get(`/novels/novel/${tentruyen}/chuong/${chapnum}`));

    },
    setReading: async (params, user, dispatch, stateSuccess) => {
        const url = `/novels/novel/reading`
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return (await axi.post(url, params, { headers: { Authorization: `Bearer ${user.accessToken}` } })).data;
    },
    createChapter: async (params, user, dispatch, stateSuccess) => {
        const url = `/novels/novel/chuong/create`
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.post(url, params));
    },
    updateChapter: async (params, user, dispatch, stateSuccess) => {
        const url = `/novels/novel/chuong/edit`
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.put(url, params));
    },

    deleteChapter: async (params, user, dispatch, stateSuccess) => {
        const url = `/novels/novel/chuong`
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.delete(url, { params }));
    },
    getReadings: async (user, dispatch, stateSuccess) => {
        const url = `/novels/readings`
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.get(url, { headers: { Authorization: `Bearer ${user.accessToken}` } }));
    },
    createNovel: async (params, user, dispatch, stateSuccess) => {
        const url = `/novels/novel/create`
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return (await axi.post(url, params)).data;
    },
    updateNovel: async (params, user, dispatch, stateSuccess) => {
        const url = `/novels/novel/edit`
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.put(url, params));
    },
    deleteNovel: async (params, user, dispatch, stateSuccess) => {
        const url = `/novels/novel`
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.delete(url, {params}));
    },
    ///Comment

    createComment: async (user, params, dispatch, stateSuccess) => {
        const url = `/comment/create`
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.post(url, params, { headers: { Authorization: `Bearer ${user.accessToken}` } }));
    },
    getCommentsByUrl: async (params) => {
        const url = `/comment/getcomment/${params.url}`;
        return getData(await axiosClient.get(url));
    },
    deleteComment: async (user, params, dispatch, stateSuccess) => {
        const url = `/comment/delete`
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.post(url, params, { headers: { Authorization: `Bearer ${user.accessToken}` } }));
    },

    ///user

    getAllUser: async (user, dispatch, stateSuccess) => {
        const url = 'user/getusers'
        let axi = axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.get(url, { headers: { Authorization: `Bearer ${user.accessToken}` }, }));
    },

    refreshToken: async (user) => {
        const params = { refreshToken: user.refreshToken }
        const res = await axiosClient.post('/auth/refreshtoken', params, { headers: { Authorization: `Bearer ${user.accessToken}` }, })
        return res.data
    },

    getUserInfo: async (user, dispatch, stateSuccess) => {
        const axi = await axiosInstance(user, dispatch, stateSuccess)
        return await axi.get('/user/info', { headers: { Authorization: `Bearer ${user.accessToken}` } });
    },
    updateUserInfo: async (user, dispatch, stateSuccess, params) => {

        const axi = await axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.put('/user/info', params, { headers: { Authorization: `Bearer ${user.accessToken}` } }));

    },

    ChangePassword: async (user, dispatch, stateSuccess, params) => {
        const axi = await axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.put('/user/info/password', params, { headers: { Authorization: `Bearer ${user.accessToken}` } }));

    },
    activeAccount: async (params) => {
        const res = await axiosClient.get(`/auth/active`, { params: params });
        return res.data;
    },
    activeByAdmin: async (user, dispatch, stateSuccess, params) => {
        const axi = await axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.put(`/auth/activebyadmin`, params))
    },
    inactiveByAdmin: async (user, dispatch, stateSuccess, params) => {
        const axi = await axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.put(`/auth/inactivebyadmin`, params))
    },
    updateRole: async (user, dispatch, stateSuccess, params) => {
        const axi = await axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.put('/user/updateroles', params));
    },
    deleteAccount: async (user, dispatch, stateSuccess, params) => {
        const axi = await axiosInstance(user, dispatch, stateSuccess)
        return getData(await axi.delete(`/user?id=${params.id}`, { headers: { Authorization: `Bearer ${user.accessToken}` } }));
    }
}
export default apiMain;