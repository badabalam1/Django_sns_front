import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import history from '../../history';

import * as api from '../../lib/api';
import { serialize } from 'uri-js';

// action types
const USER_PAGE = 'mypage/USER_PAGE';
const FOLLOW_POST = 'mypage/FOLLOW_POST';
const FOLLOW_DELETE = 'mypage/FOLLOW_DELETE';

export const userPage = createAction(USER_PAGE, api.User_Page_Get)
export const followPost = createAction(FOLLOW_POST, api.Follow_Post)
export const followDelete = createAction(FOLLOW_DELETE, api.Follow_Delete)

const initialState = Map({
    user: {}
})

export default handleActions({
    ...pender({
        type: FOLLOW_POST,
        onSuccess: (state, action) => {
            const { data } = action.payload
            console.log(1234)
            // console.log(state.get('user').result.update('result', result => result = true))
            return state.setIn(['user', 'result'], true).setIn(['user', 'followers'], state.getIn(['user', 'followers']) + 1)
            // ).update('result', result => result.result = true)
        }
    }),
    ...pender({
        type: FOLLOW_DELETE,
        onSuccess: (state, action) => {
            const { data } = action.payload
            // console.log(1234)
            // console.log(state.update('user'))
            return state.setIn(['user', 'result'], false).setIn(['user', 'followers'], state.getIn(['user', 'followers']) - 1)
            // return state.update('user', user => console.log(user.result.result))
        }
    }),
    ...pender({
        type: USER_PAGE,
        onSuccess: (state, action) => {
            const { data } = action.payload
            return state.set('user', data)
        }
    })
}, initialState)