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
import { PDFDownloadLink, Page, Text, View, Document } from '@react-pdf/renderer';

import mockData        from '../../store/mockData';


const ContentWrapper = styled.div`
  margin: 25px;
`;

const ref = React.createRef();

const PDFPreviewCard = ( props ) => {

  const { ...rest } = props;
  const room = mockData.rooms['0000']

  var today = new Date(),
  date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

  const _header = (
    <>
      <Text twoExtraSmall>Hamilton College Faculty Voting</Text>
      <Text twoExtraSmall>Report for: {room.title}</Text>
      <Text twoExtraSmall>{date}</Text>
    </>
  )

  const _summary = (
    <>
    </>
  )

  return (
    <Document>
      <Page>
        {_header}
        {_summary}
      </Page>
    </Document>
  )
};

export default PDFPreviewCard;

/*
<Card color={Colors.White} height={props.height || 'stretch'} width={props.width}
      borderColor={Colors.White} width={`8.5in`} height={'11in'}
      {...rest}>
      </Card>
*/
