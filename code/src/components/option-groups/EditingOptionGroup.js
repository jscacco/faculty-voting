import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import OptionGroup      from './OptionGroup';
import VotingOption     from '../options/VotingOption';
import { Colors }       from '../theme/Colors';

const propTypes = {
  children: PropTypes.node,
  onDelete: PropTypes.func,

  // Option Props
  iconColor: ExtraPropTypes.color,
  fontColor: ExtraPropTypes.color,
  backgroundColor: ExtraPropTypes.color,
  borderColor: ExtraPropTypes.color,

  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

const defaultProps = {};

class EditingOptionGroup extends React.Component {

  constructor(props) {
    super(props)

    this.state = { options: ,
                   }
  }
}

// const renderOptions = ( children, submittedOptions ) => {
//
//   return React.Children.map(children, (item, index) => {
//
//     const submitted = submittedOptions ? submittedOptions[index] :
//                                          false;
//
//     return (
//       <VotingOption submitted={submitted}>
//           {item}
//       </VotingOption>
//     );
//   })
// };
//
// const VotingOptionGroup = ( props ) => {
//
//   const { submittedOptions, children, ...rest } = props;
//
//   return (
//     <OptionGroup {...rest}>
//       {renderOptions(children, submittedOptions)}
//     </OptionGroup>
//   )
// }
//
// VotingOptionGroup.propTypes = propTypes;
// VotingOptionGroup.defaultProps = defaultProps;
//
// export default VotingOptionGroup;
