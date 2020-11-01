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

import PieChart    from '../charts/PieChart';
import BarChart    from '../charts/BarChart';

import Pdf from "react-to-pdf";

// import { fetchAgenda, getPollResults } from '../../store/MockDataFunctions'

const ChildWrapper = styled.div`
  padding-top: 20px;
`;

const LeftColumnWrapper = styled.div`
  width: 30%;
`;
const TwoColumnWrapper = styled.div`
  display: flex;
  direction: row;
  align-items: flex-start;
`;

const ref = React.createRef();

const PDFPreviewCard = ( props ) => {

  return (
    <PrimaryCard cardColor={Colors.White} borderColor={Colors.Blue}
                 width={`21cm`} header={props.header} children={props.children}/>
  )
};

export default PDFPreviewCard;
