/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from 'react';
import { ConfigContext } from '../context/context';
import FeedbackForm from './FeedbackForm';
import ThankYou from './ThankYou';

interface PropTypes{
    setCloseModal: (close: boolean) => void;
    showFeedbackForm: ()=>void;
    hideFeedbackForm: () => void;
}

const DetailModal:React.FC<PropTypes> = ({ setCloseModal, showFeedbackForm, hideFeedbackForm }) => (
  <div className="ej-modal">
    <div>
      <span className="ej-close" onClick={() => setCloseModal(true)} />
      {
          !showFeedbackForm
            ? (
              <div>
                <p>What do you think about our service? Give us your kind feedback.</p>
              </div>
            ) : (
              <FeedbackForm hideFeedbackForm={hideFeedbackForm} />
            )
    }
    </div>
  </div>
);

export default DetailModal;
