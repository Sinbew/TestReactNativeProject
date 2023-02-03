import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const AvatarIcon = (props: SvgProps) => (
    <Svg
        width={32}
        height={32}
        fill='none'
        {...props}
    >
        <Path
            d='M16 20a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z'
            stroke='#fff'
            strokeWidth={1.5}
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <Path
            d='M26 5H6a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z'
            stroke='#fff'
            strokeWidth={1.5}
            strokeLinecap='round'
            strokeLinejoin='round'
        />
        <Path
            d='M7.223 27a9.002 9.002 0 0 1 17.554 0'
            stroke='#fff'
            strokeWidth={1.5}
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </Svg>
);

export default AvatarIcon;
