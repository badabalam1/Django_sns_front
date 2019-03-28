import axios from 'axios';

const url = 'http://127.0.0.1:8000';

//회원가입 및 로그인
export const Login_Post = (username, password) => axios.post(`${url}/api/login/`, { username: username, password: password })
export const Register_post = (username, password, name, phone, gender) => axios.post(`${url}/api/register/`, { username: username, password: password, name: name, phone: phone, gender: gender })

//유저 확인
export const User = () => axios.get(`${url}/api/login/`, { headers: { 'authorization': localStorage.getItem('Token') } })
//글 REST
// export const Post_Get = () => axios.post(`${url}/post/register/`)
export const Post_Post = (content) => axios.post(`${url}/post/write/`, { content: content }, { headers: { 'authorization': localStorage.getItem('Token') } })
export const My_Post_Get = (id, limit) => axios.get(`${url}/post/user/${limit}/${id}/`, { headers: { 'authorization': localStorage.getItem('Token') } })
export const Post_get = (limit) => axios.get(`${url}/post/list/${limit}/`, { headers: { 'authorization': localStorage.getItem('Token') } })
export const Post_delete = (post_id) => axios.delete(`${url}/post/${post_id}/`, { headers: { 'authorization': localStorage.getItem('Token') } })
export const Post_Put = (post_id, content) => axios.put(`${url}/post/${post_id}/`, { content: content }, { headers: { 'authorization': localStorage.getItem('Token') } })

//댓글 REST
export const Comment_Post = (content, post_id) => axios.post(`${url}/post/comment/${post_id}/`, { content: content }, { headers: { 'authorization': localStorage.getItem('Token') } })
export const Comment_Get = (post_id) => axios.get(`${url}/post/comment/${post_id}/`, { headers: { 'authorization': localStorage.getItem('Token') } })

//User 정보
export const User_Page_Get = (user_id) => axios.get(`${url}/api/user/${user_id}/`, { headers: { 'authorization': localStorage.getItem('Token') } })

// follow 
export const Follow_Post = (user_id) => axios.post(`${url}/api/${user_id}/follow/`, {}, { headers: { 'authorization': localStorage.getItem('Token') } })
export const Follow_Delete = (user_id) => axios.delete(`${url}/api/${user_id}/follow/`, { headers: { 'authorization': localStorage.getItem('Token') } })