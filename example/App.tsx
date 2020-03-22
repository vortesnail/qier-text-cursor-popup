import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import QierTextCursorPopup from '../src';

// function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
//   console.log(e.target);
// }

const App = () => {
  // const inputRef = useRef(null);
  return (
    <div className='App'>
      <QierTextCursorPopup>
        <div className='test'>
          {' '}
          <input
            type='text'
            name='app-input'
            id='textareaId'
            // ref={inputRef}
            // onChange={handleInputChange}
          />
        </div>
      </QierTextCursorPopup>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#example'));
