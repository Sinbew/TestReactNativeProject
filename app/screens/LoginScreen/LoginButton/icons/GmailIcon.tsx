import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const GmailIcon = (props: SvgProps) => (<Svg width={24} height={24} fill='none' {...props}>
    <Path
        d='M19.2 5H4.8C3.81 5 3 5.81 3 6.8v10.8c0 .99.81 1.8 1.8 1.8h14.4c.99 0 1.8-.81 1.8-1.8V6.8c0-.99-.81-1.8-1.8-1.8Zm0 12.6h-1.8V9.68L12 13.1 6.6 9.68v7.92H4.8V6.8h1.08L12 10.58l6.12-3.78h1.08v10.8Z'
        fill='#fff'
    />
</Svg>);

export default GmailIcon;
