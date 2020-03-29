import React, { useState, useEffect } from 'react';
import useHotKeys from './CustomHooks/useHotKeys';
import { getCursorPosition } from './utils/util';
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
  const { usersList = [{ id: 0 }], onSelectUser, isTextBoxFocus, textBoxEle } = props;
  const [curUserId, setCurUserId] = useState<number | string | undefined>(usersList[0].id);
  let curUserIndex = 0;

  const returnUserAndCorrectCursor = (selectedUser: IUser) => {
    let cursorPos = 0;
    if (textBoxEle) {
      cursorPos = getCursorPosition(textBoxEle) + selectedUser.name!.length;
    }

    curUserIndex = 0;
    setCurUserId(usersList[curUserIndex]?.id);
    const timer = setTimeout(() => {
      textBoxEle?.focus();
      clearTimeout(timer);
    }, 10);

    if (onSelectUser) {
      onSelectUser(selectedUser);
    }

    if (textBoxEle) {
      if (textBoxEle.nodeName === 'INPUT' || textBoxEle.nodeName === 'TEXTAREA') {
        const timer2 = setTimeout(() => {
          (textBoxEle as HTMLInputElement | HTMLTextAreaElement).setSelectionRange(cursorPos, cursorPos);
          clearTimeout(timer2);
        }, 10);
      }
    }
  };

  const downForwardKey = (e: KeyboardEvent): void => {
    e.preventDefault();
    if (curUserIndex === usersList.length - 1) {
      curUserIndex = 0;
    } else {
      curUserIndex++;
    }
    setCurUserId(usersList[curUserIndex].id);
    const popEle = document.querySelector('.qier-notify-popup')!.querySelector('.popup');
    const curUserEle = popEle!.querySelectorAll('.user')![curUserIndex];
    const off =
      (curUserEle as HTMLDivElement).offsetTop +
      (curUserEle as HTMLDivElement).offsetHeight -
      (popEle as HTMLDivElement).offsetHeight;
    popEle!.scrollTop = off + 2;
  };

  const upForwardKey = (e: KeyboardEvent): void => {
    e.preventDefault();
    if (curUserIndex === 0) {
      curUserIndex = usersList.length - 1;
    } else {
      curUserIndex--;
    }
    setCurUserId(usersList[curUserIndex].id);
    const popEle = document.querySelector('.qier-notify-popup')!.querySelector('.popup');
    const curUserEle = popEle!.querySelectorAll('.user')![curUserIndex];
    const off =
      popEle!.scrollHeight - (curUserEle as HTMLDivElement).offsetTop - (popEle as HTMLDivElement).offsetHeight;
    popEle!.scrollTop = popEle!.scrollTop - off - 2;
  };

  const enterKey = (e: KeyboardEvent): void => {
    e.preventDefault();
    const selectedUser: IUser = {
      id: usersList[curUserIndex].id,
      avatar: usersList[curUserIndex].avatar,
      name: `${usersList[curUserIndex].name} `,
    };
    returnUserAndCorrectCursor(selectedUser);
  };

  useHotKeys('down', isTextBoxFocus, usersList, downForwardKey, [isTextBoxFocus]);
  useHotKeys('up', isTextBoxFocus, usersList, upForwardKey, [isTextBoxFocus]);
  useHotKeys('enter', isTextBoxFocus, usersList, enterKey, [isTextBoxFocus]);

  const handleUserSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const id = e.currentTarget.getAttribute('data-id')!;
    const avatar = e.currentTarget.querySelector('#avatar')!.getAttribute('src') || '';
    const name = `${e.currentTarget.querySelector('#name')!.textContent} ` || '';
    const selectedUser: IUser = {
      id,
      avatar,
      name,
    };
    returnUserAndCorrectCursor(selectedUser);
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
