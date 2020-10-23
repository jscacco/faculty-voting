import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import { Fonts }        from '../theme/Fonts';

const propTypes = {
  value: PropTypes.string,
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

// const InputFieldComponent = styled.input`
//   font-family: ${fontConfig.fontFamily};
//   font-weight: ${fontConfig.fontWeight};
//   font-size: ${({fontSize}) => fontSize}px;
//   color: ${({fontColor}) => fontColor};
//   line-height: ${({lineHeight}) => lineHeight}px;
//   width: 100%;
//   height: ${({height}) => height}px;
//   padding: 8px 10px;
//   box-sizing: border-box;
//   border: none;
//   border-bottom: solid 3px ${({borderColor}) => borderColor};
//   background-color: ${({backgroundColor}) => backgroundColor ? backgroundColor : `none`};
//   overflow: visable;
//   resize: none;
//   ::placeholder {
//     color: ${Colors.LightBlue};
//   }
//   &:focus {
//     outline: none;
//     border: none;
//     border-bottom: solid 3px ${Colors.Green};
//   }
// `;

// class InputField extends React.Component {
//
//   constructor(props){
//     super(props);
//
//     const { placeholder, backgroundColor, borderColor,
//             extraSmall, small, medium, large, extraLarge } = props;
//
//
//     if (extraSmall) { this.sizeConfig = fontConfig.extraSmall }
//     else if (small) { this.sizeConfig = fontConfig.small }
//     else if (large) { this.sizeConfig = fontConfig.large }
//     else if (extraLarge) { this.sizeConfig = fontConfig.extraLarge }
//     else { this.sizeConfig = fontConfig.medium }
//
//     this.height = this.sizeConfig.lineHeight + 16;
//
//     this.state = {
//       value: props.value
//     }
//     console.log(props.value)
//
//     this.onChange = this.onChange.bind(this);
//   }
//
//   onChange = (event) => {
//
//     console.log('onChage')
//     this.setState({
//       value: event.target.value
//     })
//
//     this.props.onChange && this.props.onChange(event);
//   }
//
//   render() {
//
//     const valueProps = (this.state.value && this.state.value !== '') ?
//                        { value: this.state.value} : {};
//
//     return (
//       <InputFieldComponent  fontSize={this.sizeConfig.fontSize}
//                             lineHeight={this.sizeConfig.lineHeight}
//                             height={this.height}
//                             onChange={this.onChange}
//                             borderColor={this.props.borderColor}
//                             backgroundColor={this.props.backgroundColor}
//                             fontColor={this.props.fontColor}
//                             {...valueProps}/>
//     );
//
//   }
// }
//
// InputField.propTypes = propTypes;
// InputField.defaultProps = defaultProps;

const InputFieldComponent = styled.textarea`
  font-family: ${fontConfig.fontFamily};
  font-weight: ${fontConfig.fontWeight};
  font-size: ${({fontSize}) => fontSize}px;
  color: ${({fontColor}) => fontColor};
  line-height: ${({lineHeight}) => lineHeight}px;
  width: 100%;
  height: ${({height}) => height}px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: none;
  border-bottom: solid 3px ${({borderColor}) => borderColor};
  background-color: ${({backgroundColor}) => backgroundColor ? backgroundColor : `none`};
  overflow: hidden;
  white-space: pre;
  resize: none;
  ::placeholder {
    color: ${Colors.LightBlue};
  }
  &:focus {
    outline: none;
    border: none
    border-bottom: solid 3px ${Colors.Green};
  }
`;

const InputField = ( props ) => {

  const { placeholder, backgroundColor, borderColor,
          extraSmall, small, medium, large, extraLarge } = props;

  let sizeConfig;

  if (extraSmall) { sizeConfig = fontConfig.extraSmall }
  else if (small) { sizeConfig = fontConfig.small }
  else if (large) { sizeConfig = fontConfig.large }
  else if (extraLarge) { sizeConfig = fontConfig.extraLarge }
  else { sizeConfig = fontConfig.medium }

  const height = sizeConfig.lineHeight + 24;

  return (
    <InputFieldComponent fontSize={sizeConfig.fontSize}
                       lineHeight={sizeConfig.lineHeight}
                       height={height}
                       {...props}/>
  );
};

InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;

export default InputField;
