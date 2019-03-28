import React, { Component } from 'react';
import styles from './MyPagePost.css';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

class MyPagePost extends Component {
    render() {
        return (
            <div classnames={cx('mypage-post')}>
                <p><b>닉네임</b></p>
                <div className={cx('menu')}>
                    <span></span>
                </div>
                <h2>123</h2>
                <div className={cx('like_comment')}></div>
            </div>
        );
    }
}

export default MyPagePost;