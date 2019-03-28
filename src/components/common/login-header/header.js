import React, { Component } from 'react';
import styles from './login_header.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

class header extends Component {
    render() {
        return (
            <nav className={cx('header')}>
                <div className={cx('title')}><a href='/'>SNS</a></div>
                <div className={cx('menu')}></div>
                <div className={cx('LoginForm')}></div>
            </nav >
        );
    }
}

export default header;