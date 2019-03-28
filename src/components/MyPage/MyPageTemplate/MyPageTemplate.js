import React, { Component } from 'react';
import styles from './MyPageTemplate.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

class MyPageTemplate extends Component {
    render() {
        const { children } = this.props
        return (
            <div className={cx('mypage-template')}>
                {children}
            </div>
        );
    }
}

export default MyPageTemplate;