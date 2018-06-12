import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed, email} from '../validators';
import './registration_form.css';

const passwordLength = length({min: 10, max: 72});
const usernameLength = length({min: 1, max: 20});
// let matchesPassword
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName, email} = values;
        const user = {username, password, firstName, lastName, email};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
            
                <Field component={Input} type="text" placeholder="First Name" name="firstName" />
            
                <Field component={Input} type="text" placeholder="Last Name" name="lastName" />
            
                <Field component={Input} type="text" placeholder="Email Address" name="email" validate={[email]} />

        
                <Field
                    component={Input}
                    type="text"
                    placeholder="Username"
                    name="username"
                    validate={[required, nonEmpty, isTrimmed, usernameLength]}
                />
           
                <Field
                    component={Input}
                    type="password"
                    placeholder="Password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
           
                <Field
                    component={Input}
                    type="password"
                    placeholder="Confirm Password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button
                    className="registrationButton"
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
