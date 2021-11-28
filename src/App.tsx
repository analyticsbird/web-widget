import React from 'react';
import DetailModal from './components/DetailModal';
import EmojiRater from './components/EmojiRating';
import useStickyState from './hooks/useStickyState';
import randomUserId from './utils/userId';

const App: React.FC = () => {
  const initialState = {
    rating: 0,
    userId: randomUserId(),
    closeModal: false,
    showFeedbackForm: false,
  };

  const [state, setState] = useStickyState(initialState, 'ejRater');
  const { rating, closeModal, showFeedbackForm } = state;

  const setStateWrapper = (val:any) => setState((prev:any) => ({ ...prev, ...val }));

  const showFeedbackFormOnRate = (rating: number) => setStateWrapper({ rating, closeModal: false, showFeedbackForm: true });

  return (
    <div className="ej-widget">
      <div className="ej-emojirater">
        <EmojiRater rating={rating} setRating={showFeedbackFormOnRate} />
        {!closeModal
        && (
        <DetailModal
          setCloseModal={(closeModal: boolean) => setStateWrapper({ closeModal })}
          showFeedbackForm={showFeedbackForm}
          hideFeedbackForm={() => setStateWrapper({ showFeedbackForm: false })}
        />
        )}
      </div>
    </div>
  );
};

export default App;
