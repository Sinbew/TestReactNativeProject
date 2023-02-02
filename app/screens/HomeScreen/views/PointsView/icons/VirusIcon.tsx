import React from 'react';
import Svg, {
    SvgProps,
    Path,
    Defs,
    Pattern,
    Use,
    Image,
} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
    <Svg
        width={11}
        height={11}
        fill='none'
        {...props}
    >
        <Path fill='url(#a)' d='M0 0h11v11H0z'/>
        <Defs>
            <Pattern
                id='a'
                patternContentUnits='objectBoundingBox'
                width={1}
                height={1}
            >
                <Use xlinkHref='#b' transform='scale(.03333)'/>
            </Pattern>
            <Image
                id='b'
                width={30}
                height={30}
                xlinkHref='data:image/png;base64,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'
            />
        </Defs>
    </Svg>
);

export default SvgComponent;
