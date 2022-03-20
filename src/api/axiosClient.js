
import axios from 'axios';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';
import getData from './getData';
const baseURL='https://thichtruyenchu.herokuapp.com/api'
//const baseURL='http://localhost:5000/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});



const refreshToken = async (user) => {
    const res = await axiosClient.post('/auth/refreshtoken', { refreshToken: user.refreshToken  }, { headers: { Authorization: `Bearer ${user.accessToken}` }, })
    console.log(res)
    return res.data
}

export const axiosInstance = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create({
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json"
        },
        paramsSerializer: (params) => queryString.stringify(params)
    });
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodeToken = jwt_decode(user?.accessToken);
            if (decodeToken.exp < date.getTime() / 1000) {
                const newAccessToken = getData(await refreshToken(user));
                console.log(newAccessToken.accessToken)
                const newUser = {
                    ...user,
                    accessToken: newAccessToken.accessToken
                }
                dispatch(stateSuccess(newUser))
                config.headers['Authorization'] = `Bearer ${newAccessToken.accessToken}`;

            }else{
                config.headers['Authorization'] = `Bearer ${user.accessToken}`;
            }
            
            return config;
        },
        err => {
            return Promise.reject(err)
        }
    );
    return newInstance;

}
