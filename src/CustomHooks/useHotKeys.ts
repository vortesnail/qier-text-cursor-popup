import hotkeys from 'hotkeys-js';
import { useEffect } from 'react';
import { IUser } from '../NotifyPopup';

type CallbackFn = (event: KeyboardEvent) => void;

export default function useHotkeys(
  keys: string,
  isTextBoxFocus: boolean,
  usersList: IUser[],
  callback: CallbackFn,
  deps: any[] = [],
) {
  useEffect(() => {
    hotkeys.filter = function(e) {
      const { nodeName } = (e.target as any) || (e.srcElement as any);
      return (e.target as HTMLDivElement).isContentEditable || nodeName === 'INPUT' || nodeName === 'TEXTAREA';
    };

    if (isTextBoxFocus && usersList.length !== 0) {
      hotkeys(keys, callback);
    }

    return () => hotkeys.unbind(keys, callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
