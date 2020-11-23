import React						from 'react';
import styled	 					from 'styled-components';
import PropTypes 				from 'prop-types';
import ExtraPropTypes		from 'react-extra-prop-types';

import { Colors }       from './Colors';
import { Fonts } 				from './Fonts';

import Text 						from './Text';

const propTypes = {
	children: PropTypes.node,
	primitive: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p']),

	color: ExtraPropTypes.color,

	fiveExtraSmall: PropTypes.bool,
	fourExtraSmall: PropTypes.bool,
	threeExtraSmall: PropTypes.bool,
	twoExtraSmall: PropTypes.bool,
	extraSmall: PropTypes.bool,
	small: PropTypes.bool,
	medium: PropTypes.bool,
	large: PropTypes.bool,
	extraLarge: PropTypes.bool,
	twoExtraLarge: PropTypes.bool,
	threeExtraLarge: PropTypes.bool,
};

const defaultProps = {
	color: Colors.Black,
	primitive: 'h1'
};

const fontConfig = {
  fontFamily: Fonts.Montserrat,
	fontWeight: '900',

	threeExtraLarge: { fontSize: 160, lineHeight: 160},
	twoExtraLarge: { fontSize: 140, lineHeight: 140},
	extraLarge: { fontSize: 120, lineHeight: 120},
	large: { fontSize: 104, lineHeight: 104},
	medium: { fontSize: 86, lineHeight: 86},
	small: { fontSize: 74, lineHeight: 74},
	extraSmall: { fontSize: 56, lineHeight: 56},
	twoExtraSmall: { fontSize: 48, lineHeight: 48},
	threeExtraSmall: { fontSize: 32, lineHeight: 32},
	fourExtraSmall: { fontSize: 24, lineHeight: 24},
	fiveExtraSmall: { fontSize: 20, lineHeight: 20 }
};

const JumboComponent = styled(Text)`
	font-weight: ${fontConfig.fontWeight};
	font-family: ${fontConfig.fontFamily};
	color: ${({color})=>color};
	letter-spacing: 0.02em;
	${({center}) => center ? `text-align: center` : ``}
`;


const Jumbo = ( props ) => {

	const { color,
		      primitive,
		      children,
					threeExtraLarge,
					twoExtraLarge,
					extraLarge,
					large,
					medium,
					small,
					extraSmall,
					twoExtraSmall,
					threeExtraSmall,
					fourExtraSmall,
					fiveExtraSmall,
					...rest } = props

	let sizeConfig = {};

	if(threeExtraLarge) {
		sizeConfig = fontConfig.threeExtraLarge;
	} else if(twoExtraLarge) {
		sizeConfig = fontConfig.twoExtraLarge;
	} else if (large) {
		sizeConfig = fontConfig.large;
	} else if (medium) {
		sizeConfig = fontConfig.medium;
	} else if (small) {
		sizeConfig = fontConfig.small;
	} else if (extraSmall) {
		sizeConfig = fontConfig.extraSmall;
	} else if (twoExtraSmall) {
		sizeConfig = fontConfig.twoExtraSmall;
	} else if (threeExtraSmall) {
		sizeConfig = fontConfig.threeExtraSmall;
	} else if (fourExtraSmall) {
		sizeConfig = fontConfig.fourExtraSmall;
	} else if (fiveExtraSmall) {
		sizeConfig = fontConfig.fiveExtraSmall;
	} else {
		sizeConfig = fontConfig.extraLarge;
  }

	return (
		<JumboComponent color={color}
										primitive={primitive}
										fontSize={sizeConfig.fontSize}
										lineHeight={sizeConfig.lineHeight}
										{...rest}>
	      {children}
		</JumboComponent>);
};

Jumbo.propTypes = propTypes;
Jumbo.defaultProps = defaultProps;

export default Jumbo;
