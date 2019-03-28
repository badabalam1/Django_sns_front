import React, { Component, Fragment } from 'react';
import styles from './MyPageWrapper.css';
import classnames from 'classnames/bind';
import { List } from 'immutable';

const cx = classnames.bind(styles)

class MyPageWrapper extends Component {

    componentDidMount() {
        const { UserActions, id } = this.props
        UserActions.userPage(id)
    }

    handleFollow = () => {
        const { UserActions, id, userPage } = this.props
        if (!userPage.result) {
            UserActions.followPost(id)
        } else {
            UserActions.followDelete(id)
        }
    }

    handleLogout = () => {
        localStorage.removeItem('Token')
        window.location.replace('/login')
    }

    state = {
        follow: false
    }

    render() {
        const { handleFollow, handleLogout } = this
        const { userPage, user } = this.props
        console.log(userPage)
        return (
            <div className={cx('mypage-wrapper')}>
                <div className={cx('mypage')}>
                    <div className={cx('mypage-header')}>
                        <div className={cx('mypage-image-div')}>
                            <span className={cx('mypage-image')}>
                                <img src="https://scontent-hkg3-2.xx.fbcdn.net/v/t1.0-1/c47.0.160.160a/p160x160/10354686_10150004552801856_220367501106153455_n.jpg?_nc_cat=1&_nc_ht=scontent-hkg3-2.xx&oh=3771dbc1ac77da3d01749bd61dbc34e3&oe=5CEAE91E" />
                            </span>
                        </div>
                        <section className={cx('mypage-nickname')}>
                            <div className={cx('h2-button')}>
                                <h1>{userPage.name}</h1>
                                <span>
                                    {user.username !== userPage.username ? (
                                        <Fragment>
                                            {!userPage.result
                                                ? <button className={cx('follow')} onClick={handleFollow}>팔로우</button>
                                                : <button className={cx('unFollow')} onClick={handleFollow}>언팔로우</button>
                                            }
                                        </Fragment>
                                    ) : <button className={cx('follow')}>내 계정</button>}
                                </span>
                            </div>
                            <ul className={cx('count')} >
                                <li className={cx('post-count')}>
                                    <span>
                                        게시판
                                    <span>{userPage.postCount}</span>
                                    </span>
                                </li>
                                <li className={cx('followers')}>
                                    <span>
                                        팔로워
                                        <span>{userPage.following}</span>
                                    </span>
                                </li>
                                <li className={cx('follows')}>
                                    <span>
                                        팔로우
                                        <span>{userPage.followers}</span>
                                    </span>
                                </li>
                            </ul>
                            {user.username === userPage.username ? <div className={cx('logout_div')}>
                                <span>
                                    <span><button className={cx('logout')} onClick={handleLogout}>로그아웃</button></span>
                                </span>
                            </div>
                                : null}
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyPageWrapper;