import React from 'react';
import styled from 'styled-components';

import Card   from '../cards/Card';
import PrimaryCard  from '../format-cards/PrimaryCard'
import Button   from '../buttons/Button';

import { Colors } from '../theme/Colors';
import Jumbo    from '../theme/Jumbo'
import Body   from '../theme/Body'
import {Fonts}   from '../theme/Fonts'
import Icon       from '../theme/Icon'

import Popup    from 'reactjs-popup';
import CSVReader from 'react-csv-reader';

import { convertCSVtoList } from '../../csv/csvFunctions'


const LabelWrapper = styled.div`
  padding-bottom: 5px;
`;

const HeaderWrapper = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  padding-bottom: 3vh;
`;

const Header = ( props ) => (
  <Jumbo color={Colors.White}
        fourExtraSmall={props.extraSmall} threeExtraSmall={props.small}
      twoExtraSmall={props.medium} extraSmall={props.large}>
  Upload CSV
</Jumbo>
)

const HeaderButton = ( props ) => (
  <Icon color={Colors.White} type={'x'} onClick={props.close}
        small={props.extraSmall} medium={props.small} large={props.medium}
        extraLarge={props.large} twoExtraLarge={props.extraLarge}/>
);


const ReaderCard = ( props ) => {

  const { close, onFileLoad, onUpload, ...rest } = props;

  const label = (
    <LabelWrapper>
      <Body color={Colors.White} {...rest}>
        Upload CSV
      </Body>
    </LabelWrapper>
  )

  const header=(
    <Body color={Colors.White}
        small={props.extraSmall} medium={props.small}
        large={props.medium} extraLarge={props.large}>
    Upload CSV
  </Body>
  )

  const footer = (
    <Button backgroundColor={Colors.White} textColor={Colors.Black}
            {...rest}
            onClick={() => onUpload(close)}>
      UPLOAD
    </Button>
  )

  return (
    <PrimaryCard borderMedium cardColor={Colors.Buff} width={props.extraSmall ? `90vw` : `50vw`} {...rest}
                 header={<Header {...rest}/>} headerButton={<HeaderButton close={props.close} {...rest}/>}
                 footer={footer}>
      <>
       <ContentWrapper>
         <Body color={Colors.White} {...rest}>
           Select voting elegible viewers.
         </Body>
       </ContentWrapper>
       <ContentWrapper>
         <CSVReader
           onFileLoaded={(data, fileInfo) => {onFileLoad(fileInfo.name, data)}}
           onError={console.log('error')}
           inputStyle={{ fontFamily: Fonts.WorkSans, color: Colors.White, borderColor:Colors.White }}
         />
       </ContentWrapper>
      </>
    </PrimaryCard>
  )
}

class Reader extends React.Component {

  constructor(props) {
    super(props)

    const { onUpload, loading, ...rest } = props;

    this.size = {...rest}

    this.state = { filename: null, data: null }

    this.onFileLoad = this.onFileLoad.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  onFileLoad = ( filename, data ) => {
    this.setState({ filename: filename, data: data })
  }

  onUpload = ( close ) => {
    if ( this.state.data === null ) {
      alert('Please upload file or exit.')
    }
    else {
      let list = convertCSVtoList(this.state.data)
      this.setState({ filename: null, data: null })
      if ( this.props.onUpload ) { this.props.onUpload(this.state.filename, list) }
      close()
    }
  }


  render() {

    const trigger = (
      <Button backgroundColor={this.props.loading ? Colors.LightGrey : Colors.White} textColor={Colors.Black}
              disabled={this.props.loading} {...this.size}>
        SELECT CSV
      </Button>
    )

    return (
      <Popup trigger={trigger} modal nested>
        {close =>
        <ReaderCard close={close}
                    onFileLoad={this.onFileLoad} onUpload={this.onUpload}
                    {...this.size}/>
        }
      </Popup>
     )
  }
}

export default Reader
