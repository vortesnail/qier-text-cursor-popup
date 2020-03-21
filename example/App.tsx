import React from 'react';
import ReactDOM from 'react-dom';

import QierTextCursorPopup from '../src';

const App = () => {
  return (
    <div className='App'>
      <QierTextCursorPopup>
        <input type='text' name='app-input' id='textareaId' />
      </QierTextCursorPopup>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#example'));
