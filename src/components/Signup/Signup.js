import React from 'react';
import fire from '../../firebase/init';
import eye from '../../EyeSlash.svg';
import './Signup.scss';

class Signup extends React.Component {

    state = {
        email: '',
        password: '',
        showPassword: false,
        emailError: '',
        passwordError: '',
        rememberCheckbox: false,
        resetEmailError: '',
        isPopup: false,
        isPasswordReset: false,
        loggedIn: false
    }

    componentDidMount() {
        if (localStorage.checked && localStorage.checked !== '') {
            this.setState({
                rememberCheckbox: true,
                email: localStorage.email
            })
        }
    }

    validate = () => {
        // Destructuring
        const { email } = this.state;

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email || reg.test(email) === false){
            this.setState({
                emailError: 'Email is not valid'
            });
            return false;
        }
        return true;
    }

    submitHandler = (e) => {
        // Destructuring
        const { email, password } = this.state;

        e.preventDefault();

        if(this.validate()) {
            fire.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ loggedIn: true })
            })
            .catch( e => {
                this.setState({ passwordError: e.message })
            })
        }
    }

    handleForgottenPassword = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({ isPopup: true })
    }

    hidePopup = () => {
        this.setState({ isPopup: false })
    }

    forgottenPasswordHandler = (e) => {
        e.preventDefault();

        fire.auth().sendPasswordResetEmail(this.state.email)
        .then(() => {
            this.setState({ isPasswordReset: true})
        }).catch((error) => {
            this.setState({ resetEmailError: error.message })
        });
    }

    rememberMeCheck = (e) => {
        this.setState({ rememberCheckbox: e.target.checked });

        setTimeout( () => {
            if(this.state.rememberCheckbox && this.state.email) {
                localStorage.email = this.state.email
                localStorage.checked = this.state.rememberCheckbox
            } else {
                localStorage.email = ''
                localStorage.checked = ''
            }
        }, 1000)
    }

    render() {
        // Destructuring
        const {
            email,
            password,
            showPassword,
            emailError,
            passwordError,
            rememberCheckbox,
            resetEmailError,
            isPopup,
            isPasswordReset,
            loggedIn
        } = this.state;

        const errorMsg = emailError ? emailError : ''
        const passErrorMsg = passwordError ? passwordError : '';
        const resetErrorMsg = resetEmailError ? resetEmailError : '';

        return (
            <div className="Signup">
                <div className="header">
                    <p>User <span className="text">login</span></p>
                    <hr />
                </div>
                <div className="form">
                    <form onSubmit={ this.submitHandler }>
                        <label>
                            Email
                            <input 
                                type="text"
                                placeholder="Email"
                                autoComplete="nope"
                                required
                                value={ email }
                                onChange={ e => this.setState({ email: e.target.value }) }
                            />
                        </label>
                        <p className="error">
                        { errorMsg }
                        </p>

                        <div className="password-wrap">
                            <label>
                                Password
                                <input 
                                    type={ showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    autoComplete="new-password"
                                    required
                                    value={ password }
                                    onChange={ e => this.setState({ password: e.target.value }) }
                                />
                            </label>
                            <img 
                                src={eye}
                                onClick={ e => this.setState({ showPassword: !showPassword })}
                                alt="Show password"
                            />
                        </div>
                        <p className="error">
                            { passErrorMsg }
                        </p>

                        <div className="additional">
                            <label className="Checkbox-label">
                                <p>Remember me?</p>
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    checked={ rememberCheckbox }
                                    onChange={ this.rememberMeCheck }
                                />
                            </label>

                            <p className="forgot-password" onClick={ this.handleForgottenPassword }>Forgot password?</p>
                        </div>

                        <button className="button" type="submit" onClick={ this.submitHandler }>Login</button>
                        { loggedIn ? <p className="success">Successfully logged in</p> : ''}
                    </form>
                </div>

                <div className={`popup ${isPopup ? 'active' : '' }`}>
                    <div className="content">
                    <div className="close" onClick={ this.hidePopup }>x</div>
                        { isPasswordReset ? <p>An email has been sent</p> : 
                        <>
                        <p className="title">Reset your password</p>
                            <input 
                                type="text"
                                placeholder="Email"
                                autoComplete="nope"
                                required
                                value={ email }
                                onChange={ e => this.setState({ email: e.target.value }) }
                            />
                            <p className="error">
                            { resetErrorMsg }
                            </p>

                            <button className="button" type="submit" onClick={ this.forgottenPasswordHandler }>Reset password</button>
                        </>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;