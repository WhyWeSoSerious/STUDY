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
export  {
    getUserTempId
}