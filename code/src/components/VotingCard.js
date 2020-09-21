// import React            from 'react';
// import styled           from 'styled-components';
// import PropTypes        from 'prop-types';
// import ExtraPropTypes   from 'react-extra-prop-types';
//
// import { Colors }       from './theme/Colors';
// import Body             from './theme/Body';
// import {Jumbo}             from './theme/Jumbo';
//
// import OptionGroup      from './OptionGroup';
// import Card             from './Card';
// import Button           from './Button';
//
// const ComponentWrapper = styled.div`
//   ${({small}) => small && `padding-bottom: 20px`}
//   ${({medium}) => medium && `padding-bottom: 26px`}
//   ${({large}) => large && `padding-bottom: 32px`}
// `;
//
// const CenterWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
// `;
//
// const renderTitle = (props) => {
//
//   const { title, small, medium, large } = props;
//
//   return (
//     <ComponentWrapper small={small} medium={medium} large={large}>
//       <Jumbo threeExtraSmall={small} twoExtraSmall={medium}
//              extraSmall={large} color={Colors.Blue}>
//         {title}
//       </Jumbo>
//     </ComponentWrapper>
//   )
// };
//
// const renderDescription = (props) => {
//
//   const { description, small, medium, large } = props;
//
//   return (
//     <ComponentWrapper small={small} medium={medium} large={large}>
//       <Body small={small} medium={medium}
//             large={large} color={Colors.Black}>
//         {description}
//       </Body>
//     </ComponentWrapper>
//   )
// };
//
// const renderButton = (props) => {
//
//   const { small, medium, large,
//           handleSubmit, unselected, submit, submitted, resubmit } = props;
//
//   let width;
//
//   if (large) { width = 175}
//   else if ( small ) { width = 125 }
//   else { width = 150 }
//
//   let text;
//   let color;
//   if (submit) {
//     text = 'SUBMIT';
//     color = Colors.Yellow;
//   }
//   else if (submitted) {
//     text='SUBMITTED';
//     color = Colors.Green;
//   }
//   else if (resubmit) {
//     text = 'RESUBMIT';
//     color = Colors.Yellow;
//   }
//   else { text='ERROR';
//          color = Colors.Red;};
//
//   if (unselected) { color = Colors.Red };
//
//   return(
//     <ComponentWrapper small={small} medium={medium} large={large}>
//       <CenterWrapper>
//         <Button onClick={handleSubmit} disabled={unselected || submitted}
//                 small={small} medium={medium} large={large}
//                 width={width} backgroundColor={color}>
//           {text}
//         </Button>
//       </CenterWrapper>
//     </ComponentWrapper>
//   )
// };
//
// const renderOptions = (props) => {
//
//   const { handleOptionClick, selectedBubble, options, small, medium, large } = props;
//
//   return (
//     <ComponentWrapper small={small} medium={medium} large={large}>
//       <OptionGroup handleOptionClick={handleOptionClick} selectedBubble={selectedBubble}
//                    small={small} medium={medium} large={large}
//                    options={options} backgroundColor={Colors.Blue} borderColor={Colors.Blue}
//                    textColor={Colors.black}/>
//     </ComponentWrapper>
//   )
// };
//
// const renderText = (props) => {
//
//   const { small, medium, large,
//           handleSubmit, unselected, submit, submitted, resubmit } = props;
//
//   let text;
//   if (unselected) {
//     text = 'Please make a selection.'
//   }
//   else if (submit) {
//     text = 'Please press submit to record your response.';
//   }
//   else if (submitted) {
//     text='Your response has been recorded.';
//   }
//   else if (resubmit) {
//     text = 'Press submit to resubmit your response.';
//   }
//   else { text='There has been an error.';};
//
//   return(
//     <CenterWrapper>
//       <Body extraSmall={small} small={medium} medium={large} color={Colors.Black}>
//         {text}
//       </Body>
//     </CenterWrapper>
//   )
// }
//
// const VotingCard = (props) => {
//
//   const { width } = props;
//
//   return (
//     <Card width={width}>
//       {renderTitle(props)}
//       {renderDescription(props)}
//       {renderOptions(props)}
//       {renderButton(props)}
//       {renderText(props)}
//     </Card>
//   )
//
// };
//
// export default VotingCard;
