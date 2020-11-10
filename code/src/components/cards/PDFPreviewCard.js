import React            from 'react';
import styled           from 'styled-components';
import PropTypes        from 'prop-types';
import ExtraPropTypes   from 'react-extra-prop-types';

import { Colors }       from '../theme/Colors';
import Jumbo            from '../theme/Jumbo';
import Body             from '../theme/Body';

import OptionGroup      from '../option-groups/OptionGroup';
import TextOption       from '../options/TextOption';
import InputOption      from '../options/InputOption';
import AdderOption      from '../options/AdderOption';
import Option           from '../options/Option';
import Button           from '../buttons/Button';
import Input            from '../inputs/Input';
import InputField       from '../inputs/InputField';
import TextArea         from '../inputs/TextArea';
import EditingOption    from '../options/EditingOption';
import PrimaryCard      from '../format-cards/PrimaryCard';
import Card             from './Card';
import PieChart    from '../charts/PieChart';
import BarChart    from '../charts/BarChart';

import Pdf from "react-to-pdf";

const ContentWrapper = styled.div`
  margin: 25px;
`;

const ref = React.createRef();

const PDFPreviewCard = ( props ) => {

  const { room, ...rest } = props;

  const _header = (
    <>
      <Body> {room.title} </Body>
    </>
  )

  return (
    <Card color={Colors.White} height={props.height || 'stretch'} width={props.width}
          borderColor={Colors.White} width={`21cm`}
          {...rest}>
          {_header}
    </Card>
    // <PrimaryCard cardColor={Colors.White} borderColor={Colors.Blue}
    //              width={`21cm`} header={_header} />
  )
};

export default PDFPreviewCard;
