import React, { Component } from 'react';
import styles from './LoginTemplate.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

class LoginTemplate extends Component {
    render() {
        const { children } = this.props
        return (
            <div className={cx('login-template')}>
                {children}
            </div>
        );
    }
}

export default LoginTemplate;