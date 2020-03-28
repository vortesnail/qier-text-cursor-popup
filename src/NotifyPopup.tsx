import React, { useState, useEffect } from 'react';
import useHotKeys from './CustomHooks/useHotKeys';
import './NotifyPopup.less';

type TProps = {
  usersList?: IUser[];
  onSelectUser?: (selectedUser: IUser) => void;
  isTextBoxFocus: boolean;
  textBoxEle: HTMLInputElement | HTMLDivElement | HTMLTextAreaElement | null;
  handleTextBoxFoucs: () => void;
};

export interface IUser {
  readonly id: string | number;
  readonly avatar?: string;
  readonly name?: string | null;
}

const NotifyPopup: React.FC<TProps> = (props) => {
  const { usersList = [], onSelectUser, isTextBoxFocus, textBoxEle } = props;
  const [curUserId, setCurUserId] = useState<number | string | undefined>(usersList[0].id);
  let curUserIndex = 0;

  const backToInitial = () => {
    curUserIndex = 0;
    setCurUserId(usersList[curUserIndex]?.id);
    const timer = setTimeout(() => {
      textBoxEle?.focus();
      clearTimeout(timer);
    }, 10);
  };

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

  const enterKey = (e: KeyboardEvent): void => {
    e.preventDefault();
    const selectedUser: IUser = {
      id: usersList[curUserIndex].id,
      avatar: usersList[curUserIndex].avatar,
      name: usersList[curUserIndex].name,
    };
    backToInitial();
    if (onSelectUser) {
      onSelectUser(selectedUser);
    }
  };

  useHotKeys('down', isTextBoxFocus, usersList, downForwardKey, [isTextBoxFocus]);
  useHotKeys('up', isTextBoxFocus, usersList, upForwardKey, [isTextBoxFocus]);
  useHotKeys('enter', isTextBoxFocus, usersList, enterKey, [isTextBoxFocus]);

  const handleUserSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const id = e.currentTarget.getAttribute('data-id')!;
    const avatar = e.currentTarget.querySelector('#avatar')!.getAttribute('src') || '';
    const name = e.currentTarget.querySelector('#name')!.textContent || '';
    const selectedUser: IUser = {
      id,
      avatar,
      name,
    };
    backToInitial();
    if (onSelectUser) {
      onSelectUser(selectedUser);
    }
  };

  return (
    <div className={`qier-notify-popup ${isTextBoxFocus ? 'show' : ''}`}>
      <div className='popup'>
        {usersList.map((item) => (
          <div
            key={item.id}
            data-id={item.id}
            className={`user ${item.id === curUserId ? 'active' : ''}`}
            onMouseDown={handleUserSelect}
          >
            <div className='avatar'>
              <img src={item.avatar} id='avatar' alt='avatar' />
            </div>
            <div className='name' id='name'>
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotifyPopup;
