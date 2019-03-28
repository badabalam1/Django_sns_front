import React, { Component } from 'react';
import styles from './Post.css';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles)

class Comment extends Component {

    state = {
        comment: []
    }

    render() {
        const { author_id, author_name, content } = this.props
        return (
            <div className={cx('Comment')}>
                <p className={cx('nickname')}>{author_name}</p>
                <p className={cx('content')}>{content}</p>
            </div>
        )
    }
}

class Post extends Component {

    state = {
        like: false,
        comment: false,
        menu: false,
        update: false,
        content: '',
        comments: this.props.comments
    }

    componentDidUpdate(nextProps, nextState) {
        const { CommentActions, id } = this.props
        console.log(this.props.comments)
        console.log(nextProps.comments)
        if (this.props.comments.size !== nextProps.comments.size) {
            if (this.props.comments.size !== 0) {
                if (this.props.comments.toJS()[0].post === id) {
                    CommentActions.commentGet(id)
                    this.setState({ comments: this.props.comments })
                }
            }
            // }
        }
        // if (this.props.comments.size !== nextProps.comments.size) {

        // }
    }

    handleDeleteSubmit = () => {
        const { PostActions, id } = this.props
        this.setState({ menu: !this.state.menu })
        PostActions.postDelete(id)
    }


    handlePutSubmit = () => {
        const { PostActions, id, content } = this.props
        PostActions.postPut(id, content)
    }

    handleMenuSubmit = (e) => {
        this.setState({ menu: !this.state.menu })
    }

    handleLikeUpdate = () => {
        this.setState({ like: !this.state.like })
    }

    handleCommentUpdate = () => {
        this.setState({ comment: !this.state.comment })
    }

    handlePutUpdate = () => {
        this.setState({ update: !this.state.update, menu: !this.state.menu })
    }

    handleChangeInput = (e) => {
        this.setState({ content: e.target.value })
    }

    handleCommentClick = () => {
        const { CommentActions, id } = this.props
        this.setState({ comment: !this.state.comment })
        // if (this.state.comment) {
        CommentActions.commentGet(id)
        // } else {

        // }
    }

    handleCommentKeyPress = (e) => {
        const { CommentActions, id } = this.props
        if (e.key === 'Enter') {
            CommentActions.commentPost(this.state.content, id)
            this.setState({ content: '' })
        }
    }

    render() {
        const { handleMenuSubmit, handleCommentClick, handleLikeUpdate, handlePutUpdate, handleDeleteSubmit, handlePutSubmit, handleCommentKeyPress, handleChangeInput } = this
        const { user_id, id, author, content, like, comments } = this.props
        const commentlist = this.state.comments.map(
            (comment, index) => {
                const { author_id, author_name, content } = comment.toJS()
                return (
                    <Comment author_id={author_id} author_name={author_name} content={content} />
                )
            }
        )
        return (
            <div className={cx('post')}>
                <p><b><a href={'/page/' + user_id}>{author}</a></b></p>
                <div className={cx('menu')}>
                    <span onClick={handleMenuSubmit}></span>
                    {this.state.menu ? <div className={cx('menu_list')}>
                        <p className={cx('delete')} onClick={handleDeleteSubmit}>삭제하기</p>
                        <p className={cx('put')} onClick={handlePutUpdate}>수정하기</p>
                    </div> : null}
                </div>
                {this.state.update ? <textarea className={cx('updateInput')} onChange={'1'} value={content}></textarea> : null}
                {this.state.update ? <button className={cx('updateButton')} type='button' onClick={handlePutSubmit}>수정하기</button> : null}
                {this.state.update ? null : <h2>{content}</h2>}
                <div className={cx('like_comment')}>
                    <div className={cx('like')}><div className={this.state.like ? cx('red') : cx('gray')} onClick={handleLikeUpdate}></div><p className={cx('likeCount')}>1</p></div>
                    <div className={cx('comment')}><div onClick={handleCommentClick}></div></div>
                </div>
                {this.state.comment ?
                    <div className={cx('comment-list')}>
                        <div>
                            <input type='text' name='comment' placeholder='댓글을 입력하세요' value={this.state.content} onChange={handleChangeInput} onKeyPress={handleCommentKeyPress} />
                        </div>
                        {commentlist}
                    </div>
                    : null}
            </div>
        );
    }
}

export default Post;