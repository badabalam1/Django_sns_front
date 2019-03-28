import { createAction, handleActions } from 'redux-actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import history from '../../history';

import * as api from '../../lib/api';


// action types
const INITIALIZE = 'post/INITIALIZE';
const CHANGE_INPUT = 'post/CHANGE_INPUT';
const UPDATE_INPUT = 'post/UPDATE_INPUT';
const POST_POST = 'post/POST_POST';
const MY_POST_GET = 'post/MY_POST_GET';
const POST_GET = 'post/POST_GET';
const POST_DELETE = 'post/POST_DELETE';
const POST_PUT = 'post/POST_PUT';

// action creators
export const initialize = createAction(INITIALIZE)
export const changeInput = createAction(CHANGE_INPUT)
export const updateInput = createAction(UPDATE_INPUT)
export const postPost = createAction(POST_POST, api.Post_Post)
export const myPostGet = createAction(MY_POST_GET, api.My_Post_Get)
export const postGet = createAction(POST_GET, api.Post_get)
export const postDelete = createAction(POST_DELETE, api.Post_delete)
export const postPut = createAction(POST_PUT, api.Post_Put)


// initial state
const initialState = Map({
    content: '',
    updateInput: '',
    posts: []
})

//reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    // [UPDATE_INPUT]: (state, action) => {
    //     const { name, value, id } = action.payload;
    //     return state.set('posts', state.get('posts').get(state.get('posts').findIndex(x => x.get('id') === id)).update(
    //         'posts', posts => console.log(1)
    //     ))
    // },
    ...pender({
        type: POST_POST,
        onSuccess: (state, action) => {
            alert('글을 작성했습니다.')
            const { data } = action.payload
            return state.update('posts', posts => posts.push(fromJS(data)))
        },
        onFailure: (state, action) => {
            return state.set('')
        }
    }),
    ...pender({
        type: POST_PUT,
        onSuccess: (state, action) => {
            // console.log(action)
            // let a = state.get('posts').findIndex(x => x.get('id') === action.payload.data.post_id)
            // console.log(state.set('posts', state.get('posts').update(
            //     state.get('posts').findIndex(x => x.get('id') === action.payload.data.post_id)
            // )))
            // console.log(state.toJS())
            // state.get('posts').findIndex(x => x.get('id') === action.payload.data.post_id))))
            return state.update('posts', posts => console.log(posts[(posts.get('posts').posts.findIndex(x => x.get('id') === action.payload.data.post_id))]))
        },
        onFailure: (state, action) => {
            alert(action.payload.response.data.message)
            return state.set('')
        }
    }),
    ...pender({
        type: POST_DELETE,
        onSuccess: (state, action) => {
            alert(action.payload.data.message)
            return state.set('posts', state.get('posts').delete(
                state.get('posts').findIndex(x => x.get('id') === action.payload.data.post_id)
            ))
        },
        onFailure: (state, action) => {
            alert(action.payload.response.data)
            return state.set('')
        }
    }),
    ...pender({
        type: POST_GET,
        onSuccess: (state, action) => {
            const { data } = action.payload
            return state.set('posts', fromJS(data))
        },
        onFailure: (state, action) => {
            localStorage.removeItem('Token')
            console.log(action)
            toast.error('세션이 완료되었습니다.', {
                position: toast.POSITION.TOP_RIGHT
            })
            history.push('/login')
            return state.set('')
        }
    }),
    ...pender({
        type: MY_POST_GET,
        onSuccess: (state, action) => {
            console.log(action)
            const { data } = action.payload
            return state.set('posts', fromJS(data))
        },
        onFailure: (state, action) => {
            // localStorage.removeItem('Token')
            // history.push('/login')
            return state.set('')
        }
    })
}, initialState)