import { v4 as uuidv4 } from 'uuid'
//todo 添加一个临时id
function getUserTempId() {
    let userTempId = localStorage.getItem('SKUTEMPID_KEY');
    if (!userTempId) {
        userTempId = uuidv4();
        localStorage.setItem('SKUTEMPID_KEY', userTempId)
    }
    return userTempId
}
let TOKEN_KEY = 'TOKEN_KEY';
//todo  添加token
function setToken(token) {
    localStorage.setItem(TOKEN_KEY,token)
}
//todo 取出token
function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}
//todo 删除token
function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
}
    

export  {
    getUserTempId,
    removeToken,
    getToken,
    setToken
}