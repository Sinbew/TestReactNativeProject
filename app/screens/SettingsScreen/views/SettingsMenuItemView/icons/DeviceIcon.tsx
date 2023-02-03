import React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const DeviceIcon = (props: SvgProps) => (
    <Svg
        width={32}
        height={32}
        fill='none'
        {...props}
    >
        <Path
            d='M6.667 9.333a2.667 2.667 0 0 1 2.666-2.667h13.333a2.667 2.667 0 0 1 2.667 2.667v13.333a2.667 2.667 0 0 1-2.666 2.667H9.332a2.667 2.667 0 0 1-2.667-2.666V9.332Z'
            fill='#808191'
        />
        <Path
            d='M13.334 14.667c0-.737.596-1.333 1.333-1.333h2.667c.736 0 1.333.596 1.333 1.333v2.667c0 .736-.597 1.333-1.334 1.333h-2.666a1.333 1.333 0 0 1-1.333-1.334v-2.666ZM12 2.667c-.736 0-1.334.596-1.334 1.333v2.667h2.667V4c0-.737-.597-1.333-1.333-1.333ZM13.333 28v-2.667h-2.667V28a1.333 1.333 0 1 0 2.667 0ZM18.666 4a1.333 1.333 0 0 1 2.667 0v2.667h-2.666V4ZM21.333 28v-2.667h-2.666V28a1.333 1.333 0 1 0 2.666 0ZM28 10.666a1.333 1.333 0 1 1 0 2.667h-2.667v-2.667H28ZM4 13.333h2.667v-2.667H4a1.333 1.333 0 0 0 0 2.667ZM28 18.666a1.333 1.333 0 1 1 0 2.667h-2.667v-2.666H28ZM4 21.333h2.667v-2.666H4a1.333 1.333 0 0 0 0 2.666Z'
            fill='#fff'
        />
    </Svg>
);

export default DeviceIcon;
