import WebFont from 'webfontloader';

const WebFontConfig = {
  google:{
  	families: ['Open Sans', 'Montserrat:300,900', 'Work Sans']
  }
};

WebFont.load(WebFontConfig);

export const Fonts = {
	Montserrat: 'Montserrat',
  WorkSans: 'Work Sans',
  OpenSans: 'Open Sans'
};
