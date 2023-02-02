import React from 'react';
import Svg, {SvgProps, Path, G, Defs, ClipPath} from 'react-native-svg';

const TeamIcon = (props: SvgProps) => (
    <Svg
        width={16}
        height={10}
        fill='none'
        {...props}
    >
        <Path
            d='M6 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V2Z'
            fill='#6F7077'
        />
        <Path d='M0 2a2 2 0 0 1 2-2h8v10H2a2 2 0 0 1-2-2V2Z' fill='#808191'/>
        <G clipPath='url(#a)'>
            <Path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.087 7.035c.257-.272.87-.574 1.383-.752l.554.47a.233.233 0 0 0 .301 0l.554-.47c.513.178 1.126.48 1.383.752H3.087ZM5.9 5.799a.232.232 0 0 0-.221.044l-.504.428-.503-.428A.232.232 0 0 0 4.45 5.8c-.326.104-1.95.663-1.95 1.468 0 .129.104.233.233.233h4.883a.233.233 0 0 0 .233-.233c0-.805-1.624-1.364-1.95-1.468Zm-.725-2.834c.607 0 1.1.497 1.1 1.107 0 .611-.493 1.108-1.1 1.108-.606 0-1.1-.497-1.1-1.108 0-.61.494-1.107 1.1-1.107Zm0 2.68A1.57 1.57 0 0 0 6.74 4.072 1.57 1.57 0 0 0 5.174 2.5 1.57 1.57 0 0 0 3.61 4.072a1.57 1.57 0 0 0 1.565 1.573Z'
                fill='#fff'
            />
        </G>
        <Defs>
            <ClipPath id='a'>
                <Path
                    fill='#fff'
                    transform='translate(2.188 2.188)'
                    d='M0 0h5.938v5.625H0z'
                />
            </ClipPath>
        </Defs>
    </Svg>
);

export default TeamIcon;
