Devlopment

```bash
npm install qier-text-cursor-popup
npm run dev
```

Usage

```javascript
import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import QierTextCursorPopup, { getCursorPosition, insertStr } from 'qier-text-cursor-pop';
import './App.less';

const usersLists = [
  {
    id: '1',
    avatar: 'http://img2.imgtn.bdimg.com/it/u=23084897,262291329&fm=11&gp=0.jpg',
    name: 'vortesnail',
  },
  {
    id: '2',
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2436369410,2358044874&fm=11&gp=0.jpg',
    name: '那你的哟',
  },
  {
    id: 3,
    avatar: 'http://img2.imgtn.bdimg.com/it/u=23084897,262291329&fm=11&gp=0.jpg',
    name: '我是一个小猫猫',
  },
  {
    id: 4,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2436369410,2358044874&fm=11&gp=0.jpg',
    name: '我好痒哦哦哦',
  },
  {
    id: 5,
    avatar: 'http://img2.imgtn.bdimg.com/it/u=23084897,262291329&fm=11&gp=0.jpg',
    name: '叮叮当当的笑爷爷',
  },
  {
    id: 6,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2436369410,2358044874&fm=11&gp=0.jpg',
    name: '自行车界离开家阿里事情',
  },
  {
    id: 7,
    avatar: 'http://img2.imgtn.bdimg.com/it/u=23084897,262291329&fm=11&gp=0.jpg',
    name: '互不干扰的生活',
  },
  {
    id: 8,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2436369410,2358044874&fm=11&gp=0.jpg',
    name: '是吧',
  },
];

const App = () => {
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [value, setValue] = useState<any>('');
  const [cursorPos, setCursorPos] = useState<number>(0);

  const onSelectUser = (selectedUser: IUser) => {
    setValue((tempValue: string) => {
      let resultStr = '';
      if (selectedUser.name) {
        resultStr = insertStr(tempValue, cursorPos, selectedUser.name);
      } else {
        resultStr = tempValue;
      }
      return resultStr;
    });
    setUsersList([]);
  };

  const onInputChange = (e: any) => {
    const curPos = getCursorPosition(e.target);
    if (e.target.value[curPos - 1] === '@') {
      setUsersList(usersLists);
    } else {
      setUsersList([]);
    }
    setCursorPos(curPos);
    setValue(e.target.value);
  };

  return (
    <div className='App'>
      <QierTextCursorPopup usersList={usersList} onSelectUser={onSelectUser}>
        <div className='test'>
          {' '}
          <textarea id='textareaId' value={value} onChange={onInputChange} />
          {/* <input type='text' name='app-input' id='textareaId' value={value} onChange={onInputChange} /> */}
        </div>
      </QierTextCursorPopup>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#example'));

```
