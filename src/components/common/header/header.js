import React, { Component } from 'react';
import styles from './header.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

class header extends Component {

    componentDidMount() {
        if (!localStorage.getItem("Token")) {
            window.location.replace('/login')
        }
    }

    render() {
        const { user } = this.props
        return (
            <app-nav>
                <nav className={cx('main_header')}>
                    <div className={cx('main_title')}><a href='/'>SNS</a></div>
                    <div className={cx('main_search')}><input type='text' name='search' placeholder='검색' /></div>
                    <div className={cx('main_menu')}>
                        <div className={cx('main_mypage')}><a href={'/page/' + user.id}><div></div></a></div>
                    </div>
                </nav>
                <nav className={cx('m_main_header')}>
                    <div className={cx('main_title')}><a href='/'>피드</a></div>
                    <div className={cx('main_mypage')}><a href={'/page/' + user.id}><div></div></a></div>
                </nav>
            </app-nav>
        );
    }
}

export default header;