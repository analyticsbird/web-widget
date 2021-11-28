/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import URLS from '../config/apiUrls';
import { ConfigContext } from '../context/context';
import apiRequests from '../utils/api';

interface PropTypes{
  rating: number;
  setRating: (rating: number) => void
}

const EmojiRater: React.FC <PropTypes> = ({
  rating, setRating,
}) => {
  const { appId } = useContext(ConfigContext);
  const setRateRequest = (val: number) => {
    const customerData = JSON.parse(localStorage.getItem('ejRater') || '{}');
    setRating(val);
    const data = {
      app_id: appId,
      rating: val,
      customer_id: customerData?.userId,
    };
    apiRequests.post(URLS.RATING, data);
    window.parent.postMessage('message', '*');
  };
  return (
    <div className="ej-emojiContainer">
      <span className={rating === 1 ? 'ej-activerating' : ''} onClick={() => setRateRequest(1)}>😍</span>
      <span className={rating === 2 ? 'ej-activerating' : ''} onClick={() => setRateRequest(2)}>😃</span>
      <span className={rating === 3 ? 'ej-activerating' : ''} onClick={() => setRateRequest(3)}>😟</span>
      <span className={rating === 4 ? 'ej-activerating' : ''} onClick={() => setRateRequest(4)}>😢</span>
      <span className={rating === 5 ? 'ej-activerating' : ''} onClick={() => setRateRequest(5)}>😠</span>
    </div>
  );
};

export default EmojiRater;
