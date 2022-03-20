const lang ={
    "Wrong password":"Sai mật khẩu",
}

export const getMessage = (source)=>{
    return lang[source] || source;
}
export default lang