import React, { useState, useEffect } from 'react';
import useHotKeys from './CustomHooks/useHotKeys';
import './NotifyPopup.less';

type TProps = {
  usersList: IUser[];
  isTextAreaFocus: boolean;
  textBoxEle: HTMLInputElement | HTMLDivElement | HTMLTextAreaElement | null;
};

export interface IUser {
  readonly id: string | number;
  readonly avatar?: string;
  readonly name?: string;
}

function handleUserSelect(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  textBoxEle: HTMLInputElement | HTMLDivElement | HTMLTextAreaElement | null,
) {
  e.stopPropagation();
  const nameEle = e.currentTarget.querySelector('#name');
  (textBoxEle as HTMLInputElement).value = `${(textBoxEle as HTMLInputElement).value + nameEle?.textContent} `;
  textBoxEle?.focus();
}

const NotifyPopup: React.FC<TProps> = (props) => {
  const { usersList = [], isTextAreaFocus, textBoxEle } = props;
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
    <div className={`qier-notify-popup ${isTextAreaFocus ? 'show' : ''}`}>
      <div className='popup'>
        {usersList.map((item) => (
          <div
            key={item.id}
            className={`user ${item.id === curUserId ? 'active' : ''}`}
            onClick={(e) => {
              handleUserSelect(e, textBoxEle);
            }}
          >
            <div className='avatar'>
              <img src={item.avatar} alt='avatar' />
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
