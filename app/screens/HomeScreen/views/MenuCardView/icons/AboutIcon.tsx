import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const AboutIcon = (props: SvgProps) => (
    <Svg
        width={28}
        height={28}
        fill='none'
        {...props}
    >
        <Path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5.6 1.4a1.4 1.4 0 1 1 2.8 0v1.4h11.2V1.4a1.4 1.4 0 1 1 2.8 0v1.4h1.4A4.2 4.2 0 0 1 28 7v16.8a4.2 4.2 0 0 1-4.2 4.2H4.2A4.2 4.2 0 0 1 0 23.8V7a4.2 4.2 0 0 1 4.2-4.2h1.4V1.4Z'
            fill='#808191'
        />
        <Path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.85 14a1.4 1.4 0 1 0 0 2.8h9.8a1.4 1.4 0 1 0 0-2.8h-9.8Zm-4.2 5.6a1.4 1.4 0 1 0 0 2.8h8.4a1.4 1.4 0 1 0 0-2.8h-8.4Z'
            fill='#fff'
        />
    </Svg>
);

export default AboutIcon;
