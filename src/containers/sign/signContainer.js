import React, { Component } from 'react';
import LoginTemplate from '../../components/login/LoginTemplate';
import LoginWrapper from '../../components/login/LoginWrapper';
import Header from '../../components/common/login-header';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import history from '../../history';

import * as postActions from '../../store/models/post';
import * as signActions from '../../store/models/sign';

class signContainer extends Component {

    handleChangeInput = ({ name, value }) => {
        const { SignActions } = this.props;
        SignActions.changeInput({ name, value })
    }

    handleLoginSubmit = async () => {
        const { username, password, SignActions } = this.props
        try {
            await SignActions.signIn(username, password)
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    }

    handleSignUpSubmit = () => {
        const { username, password, name, phone, gender, SignActions } = this.props
        SignActions.signUp(username, password, name, phone, gender)
    }

    render() {
        const { handleChangeInput, handleLoginSubmit, handleSignUpSubmit } = this
        return (
            <app-nav>
                <Header />
                <LoginTemplate>
                    <LoginWrapper handleChangeInput={handleChangeInput}
                        handleLoginSubmit={handleLoginSubmit}
                        handleSignUpSubmit={handleSignUpSubmit} />
                </LoginTemplate>
            </app-nav>
        )
    }
}

export default connect(
    (state) => ({
        username: state.sign.get('username'),
        password: state.sign.get('password'),
        name: state.sign.get('name'),
        phone: state.sign.get('phone'),
        gender: state.sign.get('gender'),
    }),
    (dispatch) => ({
        SignActions: bindActionCreators(signActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(withRouter(signContainer))
