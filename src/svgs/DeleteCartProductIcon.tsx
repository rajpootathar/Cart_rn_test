import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
export const DeleteCartProductIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#909090"
      d="M5.143 2.287V.57A.571.571 0 0 1 5.714 0h4.572a.572.572 0 0 1 .571.571v1.716h4.572a.571.571 0 1 1 0 1.142H.57a.571.571 0 1 1 0-1.142h4.572Zm1.143 0h3.428V1.144H6.286v1.143ZM2.286 16a.571.571 0 0 1-.572-.571v-12h12.572v12a.571.571 0 0 1-.572.571H2.286Zm4-3.428A.571.571 0 0 0 6.857 12V6.286a.571.571 0 1 0-1.143 0V12a.571.571 0 0 0 .572.572Zm3.428 0a.571.571 0 0 0 .572-.572V6.286a.571.571 0 1 0-1.143 0V12a.571.571 0 0 0 .571.572Z"
    />
  </Svg>
);
