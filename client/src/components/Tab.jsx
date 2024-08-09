import React from 'react';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import TimerIcon from '@mui/icons-material/Timer';
import MicIcon from '@mui/icons-material/Mic';

const iconComponents = {
  ChatIcon: ChatIcon,
  InfoIcon: InfoIcon,
  TimerIcon: TimerIcon,
  MicIcon: MicIcon,
};

const Tab = ({ tab, isInputTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);

  const activeStyles = isInputTab && isActiveTab 
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: "#9DD2F2", opacity: 1 };

  const IconComponent = iconComponents[tab.icon];

  return (
    <div
      key={tab.name}
      className={isInputTab ? 'mic-btn' : 'tab-btn'}
      onClick={handleClick}
      style={activeStyles}
    >
      {IconComponent && <IconComponent className={isInputTab ? 'mic-icon' : 'tab-icon'} />}
    </div>
  );
}

export default Tab;
