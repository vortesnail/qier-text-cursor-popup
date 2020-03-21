import hotkeys from 'hotkeys-js';
import { useEffect } from 'react';
import { IUser } from '../NotifyPopup';

type CallbackFn = (event: KeyboardEvent) => void;

export default function useHotkeys(
  keys: string,
  isTextAreaFocus: boolean,
  usersList: IUser[],
  callback: CallbackFn,
  deps: any[] = [],
) {
  useEffect(() => {
    if (isTextAreaFocus && usersList.length !== 0) {
      hotkeys(keys, callback);
    }

    return () => hotkeys.unbind('down', callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
