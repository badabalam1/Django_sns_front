import { createAction, handleActions } from 'redux-actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as api from '../../lib/api';

// action types
const INITIALIZE = 'sign/INITIALIZE';
const CHANGE_INPUT = 'sign/CHANGE_INPUT';
const SIGNIN = 'sign/SIGNIN';
const SIGNUP = 'sign/SIGNUP';
const USER = 'post/USER';

// action creators
export const initialize = createAction(INITIALIZE)
export const changeInput = createAction(CHANGE_INPUT)
export const signIn = createAction(SIGNIN, api.Login_Post)
export const signUp = createAction(SIGNUP, api.Register_post)
export const user = createAction(USER, api.User)

// initial state
const initialState = Map({
    username: '',
    password: '',
    name: '',
    phone: '',
    gender: '',
    user: []
})

//reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: SIGNIN,
        onSuccess: (state, action) => {
            localStorage.setItem('Token', action.payload.data.token.token)
            toast.success('로그인를 성공하였습니다.', {
                position: toast.POSITION.TOP_RIGHT
            })
            // window.location.replace('/')
            return state.set('user', action.payload.data.user)
        },
        onFailure: (state, action) => {
            toast.error(action.payload.response.data.error, {
                position: toast.POSITION.TOP_RIGHT
            })
            // alert(action.payload.response.data.error)
            return state.set('')
        }
    }),
    ...pender({
        type: SIGNUP,
        onSuccess: (state, action) => {
            toast.success('회원가입에 성공했습니다.', {
                position: toast.POSITION.TOP_RIGHT
            })
            window.location.replace('/')
            return state.set('')
        },
        onFailure: (state, action) => {
            toast.error(action.payload.response.data.restul, {
                position: toast.POSITION.TOP_RIGHT
            })
            return state.set('')
        }
    }),
    ...pender({
        type: USER,
        onSuccess: (state, action) => {
            const { data } = action.payload
            return state.set('user', data)
        }
    }),
}, initialState)