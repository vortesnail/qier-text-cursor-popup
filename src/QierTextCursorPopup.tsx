import React, { useEffect, useState } from 'react';
import NotifyPopup, { IUser } from './NotifyPopup';
import './QierTextCursorPopup.less';

interface IProps {
  // defaultVisible?: boolean;
  visible?: boolean;
  // showDelay?: number;
  // disappearDelay?: number;
  // debounce?: boolean;
  // getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  usersList?: IUser[];
  onSelectUser?: (selectedUser: IUser) => void;
  render?: () => React.ReactNode;
}

const QierTextCursorPopup: React.FC<IProps> = (props) => {
  const { usersList, onSelectUser, render, children } = props;
  const [textBoxEle, setTextBoxEle] = useState<HTMLInputElement | HTMLDivElement | HTMLTextAreaElement | null>(null);
  const [isTextBoxFocus, setIsTextBoxFocus] = useState<boolean>(false);

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleTextBoxFoucs = () => {
    setIsTextBoxFocus(true);
  };

  const handleTextBoxBlur = () => {
    setIsTextBoxFocus(false);
  };

  useEffect(() => {
    const parentEle = document.querySelector('#qier-text-cursor-popup')!.parentElement;
    setTextBoxEle(() => {
      if (parentEle) {
        const textEle = parentEle.querySelector('input');
        if (textEle) {
          return textEle;
        }
      }
      return null;
    });
  }, [textBoxEle]);

  useEffect(() => {
    textBoxEle?.addEventListener('focus', handleTextBoxFoucs);
    textBoxEle?.addEventListener('blur', handleTextBoxBlur);

    return () => {
      textBoxEle?.removeEventListener('focus', handleTextBoxFoucs);
      textBoxEle?.removeEventListener('blur', handleTextBoxBlur);
    };
  }, [textBoxEle]);

  // if `render` is exist, the return ReactNode will be rendered instead of default popbox.
  const getRednerNode = () => {
    if (render) {
      return render();
    }
    if (usersList && usersList.length !== 0) {
      return (
        <NotifyPopup
          usersList={usersList}
          onSelectUser={onSelectUser}
          isTextBoxFocus={isTextBoxFocus}
          textBoxEle={textBoxEle}
        />
      );
    }
    return null;
  };

  return (
    <>
      <div id='qier-text-cursor-popup'>{getRednerNode()}</div>
      {children}
    </>
  );
};

export default QierTextCursorPopup;
