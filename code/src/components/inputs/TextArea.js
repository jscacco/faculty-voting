import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import { Fonts }        from '../theme/Fonts';

const propTypes = {
  placeholder: PropTypes.string,

  fontColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {
  placeholder: 'Write something...',
  fontColor: Colors.Black,
  borderColor: Colors.Blue,
}

const fontConfig = {
  fontFamily: Fonts.WorkSans,
  fontWeight: 'bold',
  extraSmall: { fontSize: 14, lineHeight: 20  },
  small: { fontSize: 16, lineHeight: 22 },
  medium: { fontSize: 20, lineHeight: 28  },
  large: { fontSize: 26, lineHeight: 36 },
  extraLarge: { fontSize: 32, lineHeight: 42 }
};

const TextAreaComponent = styled.textarea`
  font-family: ${fontConfig.fontFamily};
  font-weight: ${fontConfig.fontWeight};
  font-size: ${({fontSize}) => fontSize}px;
  color: ${({fontColor}) => fontColor};
  line-height: ${({lineHeight}) => lineHeight}px;
  width: 100%;
  height: ${({height}) => height}px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: solid 3px ${({borderColor}) => borderColor};
  border-radius: 4px;
  background-color: ${({backgroundColor}) => backgroundColor ? backgroundColor : `none`};
  overflow: visable;
  resize: none;
  ::placeholder {
    color: ${Colors.LightBlue};
  }
  &:focus {
    outline: none;
    border: solid 3px ${Colors.Green};
  }
`;

const TextArea = ( props ) => {

  const { placeholder, backgroundColor, borderColor,
          extraSmall, small, medium, large, extraLarge, value } = props;

  let sizeConfig;

  if (extraSmall) { sizeConfig = fontConfig.extraSmall }
  else if (small) { sizeConfig = fontConfig.small }
  else if (large) { sizeConfig = fontConfig.large }
  else if (extraLarge) { sizeConfig = fontConfig.extraLarge }
  else { sizeConfig = fontConfig.medium }

  const height = (sizeConfig.lineHeight * 3) + 24;

  return (
    <TextAreaComponent fontSize={sizeConfig.fontSize}
                       lineHeight={sizeConfig.lineHeight}
                       height={height} value={value}
                       {...props}/>
  );
};

TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;

export default TextArea;
