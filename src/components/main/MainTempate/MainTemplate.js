import React, { Component } from 'react';
import styles from './MainTemplate.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

class MainTemplate extends Component {
    render() {
        const { children } = this.props
        return (
            <div className={cx('main-template')}>
                {children}
            </div>
        );
    }
}

export default MainTemplate;