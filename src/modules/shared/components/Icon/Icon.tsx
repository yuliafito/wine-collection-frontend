import React from 'react';
import cn from 'classnames';
import { icons } from '../../constants/icons';
import styles from './Icon.module.scss';

type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const icon = icons[name];

  if (!icon) {
    return null;
  }

  return <img src={icon.path} alt={icon.title} className={cn(styles.icon, className)} />;
};
