import React, { useEffect, useState, useRef } from 'react';
import NotifyPopup, { IUser } from './NotifyPopup';
import { getCursorPosition, getCaretCoordinates } from './utils/util';
import './QierTextCursorPopup.less';

interface IProps {
  // defaultVisible?: boolean;
  visible?: boolean;
  moveDuration?: number;
  xOffset?: number;
  yOffset?: number;
  // showDelay?: number;
  // disappearDelay?: number;
  // debounce?: boolean;
  // getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  usersList?: IUser[];
  onSelectUser?: (selectedUser: IUser) => void;
  render?: () => React.ReactNode;
}

const QierTextCursorPopup: React.FC<IProps> = (props) => {
  const {
    visible = true,
    moveDuration = 0.1,
    xOffset = 0,
    yOffset = 0,
    usersList = [],
    onSelectUser,
    render,
    children,
  } = props;
  const [textBoxEle, setTextBoxEle] = useState<HTMLInputElement | HTMLDivElement | HTMLTextAreaElement | null>(null);
  const [isTextBoxFocus, setIsTextBoxFocus] = useState<boolean>(false);
  const qierTextCursorPopupRef = useRef(null);

  const handleTextBoxFoucs = () => {
    setIsTextBoxFocus(true);
  };

  const handleTextBoxBlur = () => {
    setIsTextBoxFocus(false);
  };

  const moveTextBox = (moveDura: number) => {
    if (textBoxEle) {
      const cursorPos = getCursorPosition(textBoxEle);
      const coordinates = getCaretCoordinates(textBoxEle, cursorPos);
      const qierTextCursorPopupEle = qierTextCursorPopupRef.current;
      if (qierTextCursorPopupEle !== null) {
        (qierTextCursorPopupEle as HTMLDivElement).style.transition = `left ${moveDura}s, top ${moveDura}s linear`;
        (qierTextCursorPopupEle as HTMLDivElement).style.top = `${textBoxEle.offsetTop -
          textBoxEle.scrollTop +
          coordinates.top +
          yOffset -
          (qierTextCursorPopupEle as HTMLDivElement).offsetHeight -
          10}px`;
        (qierTextCursorPopupEle as HTMLDivElement).style.left = `${textBoxEle.offsetLeft -
          textBoxEle.scrollLeft +
          coordinates.left +
          xOffset -
          73}px`;
      }
    }
  };

  moveTextBox(0);

  useEffect(() => {
    moveTextBox(0);
  });

  const handleTextBoxChange = (e: any) => {
    moveTextBox(moveDuration);
  };

  useEffect(() => {
    const parentEle = document.querySelector('#qier-text-cursor-popup')!.parentElement;
    setTextBoxEle(() => {
      if (parentEle) {
        const textEle =
          parentEle.querySelector('input') ||
          parentEle.querySelector('textarea') ||
          parentEle.querySelector('div[contenteditable=true]');
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
    if (textBoxEle !== null) {
      textBoxEle.addEventListener('input', handleTextBoxChange);
    }

    return () => {
      textBoxEle?.removeEventListener('focus', handleTextBoxFoucs);
      textBoxEle?.removeEventListener('blur', handleTextBoxBlur);
      if (textBoxEle !== null) {
        textBoxEle?.removeEventListener('input', handleTextBoxChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textBoxEle]);

  // if `render` is exist, the return ReactNode will be rendered instead of default popbox.
  const getRednerNode = () => {
    if (render) {
      return render();
    }

    if (usersList && usersList.length !== 0) {
      return (
        <NotifyPopup
          visible={visible}
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
      <div id='qier-text-cursor-popup' ref={qierTextCursorPopupRef}>
        {getRednerNode()}
      </div>
      {children}
    </>
  );
};

export default QierTextCursorPopup;
