import React, { Component } from 'react';
import MyPageWrapper from '../../components/MyPage/MyPageWrapper';
import Header from '../../components/common/header';
import MyPageTemplate from '../../components/MyPage/MyPageTemplate';
import Post from '../../components/common/Post';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as postActions from '../../store/models/post';
import * as commentActions from '../../store/models/comment';
import * as signActions from '../../store/models/sign';
import * as userActions from '../../store/models/mypage';



class mypageContainer extends Component {

    state = {
        limit: 5
    }

    componentDidMount() {
        const { PostActions, SignActions, id } = this.props
        window.addEventListener("scroll", this.handleScroll);
        PostActions.myPostGet(id, 5)
        SignActions.user()
    }

    componentWillUnmount() {
        // 언마운트 될때에, 스크롤링 이벤트 제거
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = async () => {
        const { PostActions, id } = this.props
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        // IE에서는 document.documentElement 를 사용.
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
        try {
            if (scrollHeight - innerHeight - scrollTop <= 1) {
                // await PostActions.postGet(this.state.limit)
                this.setState({ limit: this.state.limit + 5 })
                setTimeout(() => {
                    PostActions.myPostGet(id, this.state.limit)
                }, 300);
            }
        } catch (e) {
            console.log(this.state.limit)
            return null;
        }
    };

    render() {
        const { posts, PostActions, CommentActions, user, comments, UserActions, userPage } = this.props
        const postlist = posts.map(
            (post, index) => {
                const { user_id, id, author, content, like } = post.toJS()
                return (
                    <Post key={index} user_id={user_id} id={id} author={author} content={content} like={like} PostActions={PostActions} CommentActions={CommentActions} user={user} url={this.props.id} comments={comments} />
                )
            }
        )
        return (
            <app-nav>
                <Header user={user} />
                <MyPageTemplate>
                    <MyPageWrapper UserActions={UserActions} id={this.props.id} user={user} userPage={userPage} />
                    <div className='post_div'>
                        {postlist}
                    </div>
                </MyPageTemplate>
            </app-nav>
        );
    }
}

export default connect(
    (state) => ({
        content: state.post.get('content'),
        posts: state.post.get('posts'),
        user: state.sign.get('user'),
        comments: state.comment.get('comments'),
        userPage: state.mypage.get('user')
    }),
    (dispatch) => ({
        SignActions: bindActionCreators(signActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch),
        CommentActions: bindActionCreators(commentActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
    })
)(mypageContainer)