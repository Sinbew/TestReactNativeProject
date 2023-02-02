import React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const WalkingIcon = (props: SvgProps) => (
    <Svg
        width={20}
        height={35}
        fill='none'
        {...props}
    >
        <G clipPath='url(#a)' fillRule='evenodd' clipRule='evenodd' fill='#EFD548'>
            <Path
                d='m18.058 12.14-2.623.997-1.955-2.602v-.396a2.86 2.86 0 0 0-2.859-2.86H9.4c-.947 0-1.78.467-2.301 1.178l-3.595 1.822c-.278.141-.503.37-.638.652L.781 15.267a1.422 1.422 0 0 0 2.561 1.23l1.875-3.902 1.324-.671v8.537l.341 4.241L.987 27.89a1.874 1.874 0 1 0 1.782 3.299L9.774 27.4a1.874 1.874 0 0 0 .973-1.855l-.318-2.873 2.033 3.66v6.141a1.875 1.875 0 0 0 3.75 0v-6.627c0-.319-.082-.632-.237-.91L13.48 20.46v-5.199l.326.434a1.418 1.418 0 0 0 1.64.475l3.621-1.377c.734-.28 1.102-1.1.822-1.832a1.417 1.417 0 0 0-1.83-.823ZM10.011 6.64a3.32 3.32 0 1 0 0-6.64 3.32 3.32 0 0 0 0 6.64Z'/>
        </G>
        <Defs>
            <ClipPath id='a'>
                <Path fill='#fff' d='M0 0h20v35H0z'/>
            </ClipPath>
        </Defs>
    </Svg>
);

export default WalkingIcon;
