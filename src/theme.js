import {createLightTheme, lightThemePrimitives} from 'baseui';

export const theme = createLightTheme({
  ...lightThemePrimitives,
  primaryFontFamily: 'Rokkitt',
},  {
  borders: {
    inputBorderRadius: '4px',
    buttonBorderRadius: '8px'
  },
  colors: {
    backgroundSecondary: '#f1f1f1',
  }
});