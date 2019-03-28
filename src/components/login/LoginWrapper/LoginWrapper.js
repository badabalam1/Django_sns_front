import React, { Component } from 'react';
import styles from './LoginWrapper.css';
import classnames from 'classnames/bind';
import history from '../../../history';

const cx = classnames.bind(styles)

class LoginWrapper extends Component {

    componentDidMount() {
        if (localStorage.getItem("Token")) {
            history.push('/')
        }
    }

    handleChange = (e) => {
        const { handleChangeInput } = this.props
        const { value, name } = e.target
        handleChangeInput({ name, value })
    }

    handleLoginSubmit = () => {
        const { handleLoginSubmit } = this.props
        handleLoginSubmit()
    }

    handleLoginKeyPass = (e) => {
        const { handleLoginSubmit } = this
        if (e.key === 'Enter') {
            handleLoginSubmit()
        }
    }

    handleSignUpSubmit = () => {
        const { handleSignUpSubmit } = this.props
        handleSignUpSubmit()
    }

    handleSignUpKeyPass = (e) => {
        const { handleSignUpSubmit } = this
        if (e.key === 'Enter') {
            handleSignUpSubmit()
        }
    }

    render() {
        const { handleChange, handleLoginSubmit, handleLoginKeyPass, handleSignUpSubmit, handleSignUpKeyPass } = this
        return (
            < main className={cx('login-wrapper')}>
                <div className={cx('login-input')}>
                    <div className={cx('signin')}>
                        <form>
                            <input type='text' name='username' placeholder='Id' required="required" onChange={handleChange} onKeyPress={handleLoginKeyPass} />
                            <input type='current-password' name='password' placeholder='Password' required="required" onChange={handleChange} onKeyPress={handleLoginKeyPass} />
                            <button type='button' onClick={handleLoginSubmit}>로그인</button>
                        </form>
                    </div>
                    <div className={cx('signup')}>
                        <form>
                            <input type='text' name='username' placeholder='Id' required="required" onChange={handleChange} onKeyPress={handleSignUpKeyPass} />
                            <input type='current-password' name='password' placeholder='Password' required="required" onChange={handleChange} onKeyPress={handleSignUpKeyPass} />
                            <input type='text' name='name' placeholder='nickname' required="required" onChange={handleChange} onKeyPress={handleSignUpKeyPass} />
                            <input type='text' name='phone' placeholder='phone' required="required" onChange={handleChange} onKeyPress={handleSignUpKeyPass} />
                            <select name='gender' onChange={handleChange}>
                                <option value=''>성별</option>
                                <option value='male'>남자</option>
                                <option value='female'>여자</option>
                            </select>
                            <button type='button' onClick={handleSignUpSubmit}>회원가입</button>
                        </form>
                    </div>
                </div>
            </main >
        )
    }
}



export default LoginWrapper