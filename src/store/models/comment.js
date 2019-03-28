import { createAction, handleActions } from 'redux-actions';

import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import history from '../../history';

import * as api from '../../lib/api';

const COMMENT_POST = 'comment/COMMENT_POST';
const COMMENT_GET = 'comment/COMMENT_GET';

export const commentPost = createAction(COMMENT_POST, api.Comment_Post)
export const commentGet = createAction(COMMENT_GET, api.Comment_Get)

const initialState = Map({
    comments: []
})

export default handleActions({
    ...pender({
        type: COMMENT_POST,
        onSuccess: (state, action) => {
            const { data } = action.payload
            return state.update('comments', comments => comments.push(fromJS(data)))
        },
        onFailure: (state, action) => {
            return state.set('')
        }
    }),
    ...pender({
        type: commentGet,
        onSuccess: (state, action) => {
            console.log(action)
            const { data } = action.payload
            return state.set('comments', fromJS(data))
            // return state.set('comments', fromJS(data))
        }
    })
}, initialState)