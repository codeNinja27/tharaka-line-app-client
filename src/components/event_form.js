import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {postEvents} from '../actions/events';
import {required, nonEmpty, isNum} from '../validators';
import './event_form.css';

export class EventForm extends React.Component {
    onSubmit(values) {
        this.props.dispatch(postEvents(values.title, values.hours, values.pay));
        this.props.reset();//Clearing input fields
    }

    render() {
    let successMessage;

        if (this.props.submitSucceeded) {
            successMessage = (
                <div className="message message-success elementToFadeInAndOut">
                    Message submitted successfully
                </div>
            );
        }

        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <div className="message message-error elementToFadeInAndOut">{this.props.error}</div>
            );
        }
        return (
            <div className="eventFormContainer">
                <h3>Post an Event</h3>
                <form
                    className="event-form"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    {successMessage}
                    {errorMessage}
                   
                    <Field
                        component={Input}
                        type="text"
                        placeholder="Title"
                        name="title"
                        id="title"
                        validate={[required, nonEmpty]}
                    />
                   
                    <Field
                        component={Input}
                        type="hours"
                        placeholder="Hours"
                        name="hours"
                        id="hours"
                        validate={[required, nonEmpty, isNum]}
                    />
                  
                    <Field
                        component={Input}
                        type="pay"
                        placeholder="Pay"
                        name="pay"
                        id="pay"
                        validate={[required, nonEmpty, isNum]}
                    />                
                    <button className="eventPostButton" disabled={this.props.pristine || this.props.submitting}>
                        Post
                    </button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'post',
    onSubmitFail: (errors, dispatch) => dispatch(focus('post', 'title'))
})(EventForm);
