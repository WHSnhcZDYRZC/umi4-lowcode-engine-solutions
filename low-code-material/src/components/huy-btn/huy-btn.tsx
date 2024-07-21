import * as React from 'react';
import { createElement } from 'react';
import { Button, Icon } from '@alifd/next';
import './index.scss';

export interface HuyBtnProps {
  /**
   * 类型
   */
  type?: "primary" | "secondary" | "normal";
  color?: string;
  style?: object;
}

const HuyBtn: React.FC<HuyBtnProps> = function ColorfulButton({
  type = 'primary',
  color,
  style = {},
  ...otherProps
}) {
  const _style = style || {};
  if (color) {
    _style.backgroundColor = color;
  }
  const _otherProps = otherProps || {};
  _otherProps.style = _style;

  return (
    <Button type={type} {..._otherProps} >
      <Icon type="smile" />
      <Icon type="smile" />
      <Icon type="smile" />

      我的按钮
    </Button>
  );
};

HuyBtn.displayName = 'HuyBtn';
export default HuyBtn;


