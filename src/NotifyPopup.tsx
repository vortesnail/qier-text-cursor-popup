import React, { useEffect, useState } from 'react';
import useHotKeys from './CustomHooks/useHotKeys';
import './NotifyPopup.less';

type TProps = {
  usersList: IUser[];
  isTextAreaFocus: boolean;
};

export interface IUser {
  readonly id: string | number;
  readonly avatar?: string;
  readonly name?: string;
}

const handleUserSelect = () => {
  console.log(121);
};

const NotifyPopup: React.FC<TProps> = (props) => {
  const { usersList = [], isTextAreaFocus } = props;
  const [curUserId, setCurUserId] = useState<number | string>(usersList[0].id);
  let curUserIndex = 0;

  const downForwardKey = (e: KeyboardEvent): void => {
    e.preventDefault();
    if (curUserIndex === usersList.length - 1) {
      curUserIndex = 0;
    } else {
      curUserIndex++;
    }
    setCurUserId(usersList[curUserIndex].id);
  };

  const upForwardKey = (e: KeyboardEvent): void => {
    e.preventDefault();
    if (curUserIndex === 0) {
      curUserIndex = usersList.length - 1;
    } else {
      curUserIndex--;
    }
    setCurUserId(usersList[curUserIndex].id);
  };

  useHotKeys('down', isTextAreaFocus, usersList, downForwardKey, []);
  useHotKeys('up', isTextAreaFocus, usersList, upForwardKey, []);

  return (
    <div className={`qier-notify-popup ${isTextAreaFocus ? 'show' : ''}`}>
      <div className='popup'>
        {usersList.map((item) => (
          <div
            key={item.id}
            className={`user ${item.id === curUserId ? 'active' : ''}`}
            onClick={handleUserSelect}
          >
            <div className='avatar'>
              <img src={item.avatar} alt='avatar' />
            </div>
            <div className='name'>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotifyPopup;
