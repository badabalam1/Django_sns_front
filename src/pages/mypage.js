import React from 'react';
import MyPage from '../containers/mypage/mypageContainer';


const mypage = ({ match }) => {
    const { id } = match.params
    return (
        <MyPage id={id} />
    );
}

export default mypage;