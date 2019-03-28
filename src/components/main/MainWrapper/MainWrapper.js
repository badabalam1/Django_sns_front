import React, { Component } from 'react';
import styles from './MainWrapper.css';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles)

class MainWrapper extends Component {

    state = {
        content: '',
    }

    handleChangeInput = (e) => {
        const { PostActions } = this.props
        this.setState({ content: e.target.value })
        const { name, value } = e.target
        PostActions.changeInput({ name, value })
    }

    handlePostSubmit = () => {
        const { PostActions } = this.props
        const { content } = this.state
        PostActions.postPost(content)
        this.setState({ content: '' })

    }

    render() {
        const { handlePostSubmit, handleChangeInput } = this
        const { children } = this.props
        return (
            <main className={cx('main-wrapper')}>
                <div className={cx('main-list')}>
                    <div className={cx('postCreate')}>
                        <div>
                            <textarea placeholder='글을 작성하세요.' onChange={handleChangeInput} name='content' value={this.state.content}></textarea>
                        </div>
                        <button onClick={handlePostSubmit} type='button'>작성하기</button>
                    </div>
                    {children}
                </div>
            </main>
        )
    }
}

export default MainWrapper