import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const FaceBookIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill='none'
    {...props}>
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M20 6.667C20 5.266 18.735 4 17.333 4H6.667C5.265 4 4 5.266 4 6.667v10.666C4 18.734 5.265 20 6.667 20H12v-6.044h-1.956v-2.667H12V10.25c0-1.792 1.345-3.406 3-3.406h2.156v2.667H15c-.236 0-.511.287-.511.716v1.062h2.667v2.667h-2.667V20h2.844C18.735 20 20 18.734 20 17.333V6.667Z'
      fill='#F0F0F0'
    />
  </Svg>
);

export default FaceBookIcon;
