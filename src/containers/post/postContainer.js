import React, { Component } from 'react';
import MainTemplate from '../../components/main/MainTempate';
import MainWrapper from '../../components/main/MainWrapper';
import Post from '../../components/common/Post';
import Header from '../../components/common/header';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import shouldCancel from '../../lib/shouldCancel';

import * as postActions from '../../store/models/post';
import * as commentActions from '../../store/models/comment';
import * as signActions from '../../store/models/sign';

class postContainer extends Component {

    state = {
        limit: 5
    }

    componentDidMount() {
        const { PostActions, SignActions } = this.props
        window.addEventListener("scroll", this.handleScroll);
        PostActions.postGet(5)
        SignActions.user()
    }

    componentWillUnmount() {
        // 언마운트 될때에, 스크롤링 이벤트 제거
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = async () => {
        const { PostActions } = this.props
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        // IE에서는 document.documentElement 를 사용.
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
        try {
            if (scrollHeight - innerHeight - scrollTop < 1) {
                // await PostActions.postGet(this.state.limit)
                this.setState({ limit: this.state.limit + 5 })
                setTimeout(() => {
                    PostActions.postGet(this.state.limit)
                }, 300);
            }
        } catch (e) {
            console.log(this.state.limit)
            return null;
        }
    };

    getPostList = () => {
        if (shouldCancel()) return
        const { PostActions } = this.props
        PostActions.postGet()
    }

    handlePutSubmit = (id, content) => {
        console.log(1234)
        const { PostActions } = this.props
        PostActions.postPut(id, content)
    }

    handleUpdateChange = ({ name, value, id }) => {
        const { PostActions } = this.props
        PostActions.updateInput({ name, value, id })
    }

    render() {
        const { loading, posts, user, PostActions, CommentActions, comments } = this.props
        if (loading) return null;
        const postlist = posts.map(
            (post, index) => {
                const { user_id, id, author, content, like } = post.toJS()
                return (
                    <Post key={index} user_id={user_id} id={id} author={author} content={content} like={like} PostActions={PostActions} user={user} CommentActions={CommentActions} comments={comments} />
                )
            }
        )
        return (
            <app-nav>
                <Header user={user} />
                <MainTemplate>
                    <MainWrapper PostActions={PostActions}>
                        {postlist}
                    </MainWrapper>
                </MainTemplate>
            </app-nav>
        );
    }
}

export default connect(
    (state) => ({
        content: state.post.get('content'),
        posts: state.post.get('posts'),
        user: state.sign.get('user'),
        comments: state.comment.get('comments')
    }),
    (dispatch) => ({
        SignActions: bindActionCreators(signActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch),
        CommentActions: bindActionCreators(commentActions, dispatch),
    })
)(postContainer)