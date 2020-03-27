import React, { useState, useEffect } from 'react';
import useHotKeys from './CustomHooks/useHotKeys';
import './NotifyPopup.less';

type TProps = {
  usersList?: IUser[];
  onSelectUser?: (selectedUser: IUser) => void;
  isTextBoxFocus: boolean;
  textBoxEle: HTMLInputElement | HTMLDivElement | HTMLTextAreaElement | null;
};

export interface IUser {
  readonly id: string | number;
  readonly avatar?: string;
  readonly name?: string | null;
}

const NotifyPopup: React.FC<TProps> = (props) => {
  const { usersList = [], onSelectUser, isTextBoxFocus, textBoxEle } = props;
  const [curUserId, setCurUserId] = useState<number | string>(usersList[0].id);
  let curUserIndex = 0;

  const backToInitial = () => {
    const timer = setTimeout(() => {
      setCurUserId(usersList[0]?.id);
      clearTimeout(timer);
    }, 10);
    textBoxEle?.focus();
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
    if (onSelectUser) {
      const selectedUser: IUser = {
        id: usersList[curUserIndex].id,
        avatar: usersList[curUserIndex].avatar,
        name: usersList[curUserIndex].name,
      };
      onSelectUser(selectedUser);
    }

    backToInitial();
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
    if (onSelectUser) {
      onSelectUser(selectedUser);
    }

    backToInitial();
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleTextBoxChange = (e: any) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    if (textBoxEle !== null) {
      textBoxEle.addEventListener('input', handleTextBoxChange);
    }
    return () => textBoxEle?.removeEventListener('input', handleTextBoxChange);
  }, [textBoxEle]);

  return (
    <div className={`qier-notify-popup ${isTextBoxFocus ? 'show' : ''}`}>
      <div className='popup'>
        {usersList.map((item) => (
          <div
            key={item.id}
            data-id={item.id}
            className={`user ${item.id === curUserId ? 'active' : ''}`}
            onClick={handleUserSelect}
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
