/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from 'react';
import URLS from '../config/apiUrls';
import { ConfigContext } from '../context/context';
import useForm from '../hooks/useForm';
import apiRequests from '../utils/api';
import ThankYou from './ThankYou';

interface PropTypes{
    hideFeedbackForm: () => void;
}

const FeedbackForm:React.FC<PropTypes> = ({ hideFeedbackForm }) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const { appId } = useContext(ConfigContext);
  const validate = (values:any) => {
    const errors:any = {};
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.feedback) errors.feedback = 'Feedback is required';

    return errors;
  };

  const submitForm = (values:any) => {
    const customerData = JSON.parse(localStorage.getItem('ejRater') || '{}');
    const data = {
      app_id: appId,
      customer_id: customerData?.userId,
      ...values,
    };
    apiRequests.patch(URLS.FEEDBACK, data).then(() => setFeedbackSubmitted(true));
  };
  const {
    handleChange,
    handleSubmit,
    errors,
  } = useForm(submitForm, validate);
  return (
    <>
      <div className="ej-backContainer">
        <div className="ej-backBtn" onClick={() => hideFeedbackForm()}>
          <span className="ej-line ej-tLine" />
          <span className="ej-line ej-mLine" />
          <span className="ej-line ej-bLine" />
        </div>
      </div>
      {!feedbackSubmitted ? (
        <>
          <h3 className="ej-feedbackheading">Submit your feedback</h3>
          <div className="ej-form">
            <form onSubmit={handleSubmit}>
              <div className="ej-inputContainer">
                <input
                  className={`ej-input ${errors.email && 'ej-errorBorder'}`}
                  name="email"
                  placeholder="Email address"
                  onChange={handleChange}
                />
                {errors.email && <span className="ej-error">{errors.email}</span>}
              </div>
              <span />
              <div className="ej-inputContainer">
                <textarea
                  className={`ej-input ej-textarea ${errors.email && 'ej-errorBorder'}`}
                  rows={4}
                  name="feedback"
                  placeholder="Feedback"
                  onChange={handleChange}
                />
                {errors.feedback && <span className="ej-error">{errors.feedback}</span>}
              </div>
              <button className="ej-button" type="submit">submit</button>
            </form>
          </div>
        </>
      ) : <ThankYou />}
    </>

  );
};

export default FeedbackForm;
