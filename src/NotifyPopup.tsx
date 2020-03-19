import React from 'react';
import './NotifyPopup.less';

type TUsersList = {
  usersList: IUser[];
};

export interface IUser {
  id: string | number;
  avatar?: string;
  name?: string;
  active?: boolean;
}

const NotifyPopup: React.FC<TUsersList> = (props) => {
  const { usersList } = props;
  usersList[0].active = true;

  return (
    <div className='qier-notify-popup'>
      <div className='popup'>
        {usersList.map((item) => (
          <div className={`user ${item.active ? 'active' : ''}`} key={item.id}>
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
