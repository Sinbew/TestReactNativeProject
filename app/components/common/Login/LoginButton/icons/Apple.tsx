import * as React from 'react';
import Svg, {SvgProps, Mask, Path, G} from 'react-native-svg';

const AppleIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Mask
      id="a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={4}
      y={6}
      width={16}
      height={16}>
      <Path d="M4 6.725h15.965v14.88H4V6.726Z" fill="#fff" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.333 12.417c-.023-2.482 2.026-3.675 2.119-3.732-1.153-1.686-2.947-1.917-3.586-1.944-1.527-.155-2.98.899-3.753.899-.774 0-1.97-.876-3.236-.852-1.665.024-3.199.967-4.057 2.457-1.728 3-.441 7.445 1.243 9.879.824 1.19 1.805 2.53 3.095 2.48 1.242-.048 1.712-.802 3.212-.802 1.501 0 1.924.803 3.237.778 1.336-.024 2.182-1.213 3-2.408.946-1.382 1.335-2.72 1.358-2.788-.03-.014-2.605-1.001-2.632-3.967Z"
        fill="#fff"
      />
    </G>
    <Mask
      id="b"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={11}
      y={2}
      width={5}
      height={5}>
      <Path d="M11.933 2h3.973v4.526h-3.973V2Z" fill="#fff" />
    </Mask>
    <G mask="url(#b)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.866 5.13c.685-.829 1.145-1.981 1.02-3.13-.987.04-2.181.657-2.889 1.486-.634.734-1.19 1.907-1.04 3.033 1.1.085 2.223-.56 2.909-1.388Z"
        fill="#fff"
      />
    </G>
  </Svg>
);

export default AppleIcon;
