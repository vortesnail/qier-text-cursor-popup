import React from 'react';
import NotifyPopup, { IUser } from './NotifyPopup';
import './QierTextCursorPopup.less';

const usersList: IUser[] = [
  {
    id: 1,
    avatar: 'http://img2.imgtn.bdimg.com/it/u=23084897,262291329&fm=11&gp=0.jpg',
    name: '爱的供养',
  },
  {
    id: 2,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2436369410,2358044874&fm=11&gp=0.jpg',
    name: '死变态',
  },
  {
    id: 3,
    avatar: 'http://img2.imgtn.bdimg.com/it/u=23084897,262291329&fm=11&gp=0.jpg',
    name: '我是一个小猫猫',
  },
  {
    id: 4,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2436369410,2358044874&fm=11&gp=0.jpg',
    name: '爱的供养',
  },
  {
    id: 5,
    avatar: 'http://img2.imgtn.bdimg.com/it/u=23084897,262291329&fm=11&gp=0.jpg',
    name: '爱的供养',
  },
  {
    id: 6,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2436369410,2358044874&fm=11&gp=0.jpg',
    name: '爱的供养',
  },
  {
    id: 7,
    avatar: 'http://img2.imgtn.bdimg.com/it/u=23084897,262291329&fm=11&gp=0.jpg',
    name: '爱的供养',
  },
  {
    id: 8,
    avatar: 'http://img4.imgtn.bdimg.com/it/u=2436369410,2358044874&fm=11&gp=0.jpg',
    name: '爱的供养',
  },
  {
    id: 9,
    avatar: 'http://img2.imgtn.bdimg.com/it/u=23084897,262291329&fm=11&gp=0.jpg',
    name: '爱的供养',
  },
  // {
  //   avatar: 'http://img4.imgtn.bdimg.com/it/u=2436369410,2358044874&fm=11&gp=0.jpg',
  //   name: '爱的供养',
  // },
  // {
  //   avatar: 'http://img2.imgtn.bdimg.com/it/u=23084897,262291329&fm=11&gp=0.jpg',
  //   name: '爱的供养',
  // },
  // {
  //   avatar: 'http://img4.imgtn.bdimg.com/it/u=2436369410,2358044874&fm=11&gp=0.jpg',
  //   name: '爱的供养',
  // },
];

interface IProps {
  defaultVisible?: boolean;
  visible?: boolean;
  showDelay?: number;
  disappearDelay?: number;
  debounce?: boolean;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  render?: () => HTMLElement;
}

const QierTextCursorPopup: React.FC<IProps> = (props) => {
  const { defaultVisible } = props;
  return (
    <div id='qier-text-cursor-popup'>
      <NotifyPopup usersList={usersList} />
    </div>
  );
};

export default QierTextCursorPopup;
