import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';

import { Colors }       from '../theme/Colors';
import Body             from '../theme/Body';
import Button           from  './Button';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.bool,

  unselected: PropTypes.bool,
  submit: PropTypes.bool,
  submitted: PropTypes.bool,
  resubmit: PropTypes.bool,

  extraSmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
};

const defaultProps = {
  onClick: undefined,
};

const SubmitWrapper = styled.div`
`
const ComponentWrapper = styled.div`
  ${({extraSmall}) => extraSmall && `padding-bottom: 16px`}
  ${({small}) => small && `padding-bottom: 20px`}
  ${({medium}) => medium && `padding-bottom: 26px`}
  ${({large}) => large && `padding-bottom: 32px`}
`;

const ButtonWrapper = styled.div`
    width: ${({width}) => width}px;
`;

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const config = {
  unfilledInput: { subText: 'Please fill write in to record your response.',
                   text: 'SUBMIT',
                   color: Colors.Red,
                   disabled: true,
                 },
  submit: { subText: 'Please press submit to record your response.',
            text: 'SUBMIT',
            color: Colors.Yellow,
            disabled: false,
          },
  submitted: { subText: 'Your response has been recorded.',
               text: 'SUBMITTED',
               color: Colors.Green,
               disabled: true
             },
  unselected: { subText: 'Please make a selection.',
                text: 'SUBMIT',
                color: Colors.Red,
                disabled: true
               },
  resubmit: { subText: 'Please press submit to record your response.',
              text: 'RESUBMIT',
              color: Colors.Yellow,
              disabled: false
            },
  pollpending: { subText: 'Please wait to record your response.',
                 text: 'SUBMIT',
                 color: Colors.LightGrey,
                 disabled: true
               },
  submitloading: { subText: 'Your response is being recorded.',
                   text: 'SUBMIT',
                   color: Colors.LightGrey,
                   disabled: true
                },
}

const renderText = (props) => {

  const { buttonConfig, extraSmall, small, medium, large } = props;

  console.log(extraSmall)

  return(
    <CenterWrapper>
      <Body twoExtraSmall={extraSmall} extraSmall={small} small={medium} medium={large} color={Colors.Black}>
        {buttonConfig.subText}
      </Body>
    </CenterWrapper>
  )
}

const renderButton = (props) => {

  const { onClick, buttonConfig, ...rest} = props;

  let width;
  if (props.large) { width = 225}
  else if ( props.small ) { width = 125 }
  else if ( props.extraSmall ) { width = 100 }
  else { width = 150 }

  return (
    <ComponentWrapper {...rest}>
      <CenterWrapper>
        <ButtonWrapper width={width}>
          <Button onClick={buttonConfig.disabled ? undefined : onClick} disabled={buttonConfig.disabled}
                  backgroundColor={buttonConfig.color}
                  {...rest}>
            {buttonConfig.text}
          </Button>
        </ButtonWrapper>
      </CenterWrapper>
    </ComponentWrapper>
  );
};

const SubmitButton = (props) => {
  const { submissionStatus } = props;

  let buttonConfig;

  switch (submissionStatus) {
    case 'unfilledInput':
      buttonConfig = config.unfilledInput;
      break;
    case 'submit':
      buttonConfig = config.submit;
      break;
    case 'submitted':
      buttonConfig = config.submitted;
      break;
    case 'resubmit':
      buttonConfig = config.resubmit;
      break;
    case 'pollpending':
      buttonConfig = config.pollpending;
      break;
    case 'submitloading':
      buttonConfig = config.pollpending;
      break;
    default:
      buttonConfig = config.unselected;
  }

  return (
    <SubmitWrapper>
      {renderButton({...props, buttonConfig})}
      {renderText({...props, buttonConfig})}
    </SubmitWrapper>
  )
};

SubmitButton.propTypes = propTypes;
SubmitButton.defaultProps = defaultProps;

export default SubmitButton;
