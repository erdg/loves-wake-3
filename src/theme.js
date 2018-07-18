import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
   overrides: {
      MuiFormControl: {
         root: {
            background: '#f6f6f6',
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
         },
      },
      MuiFormLabel: {
         root: {
            '&$focused': {
               color: '#632B6C',
            }
         },
      },
      MuiInputLabel: {
         root: {
            paddingLeft: 12,
         },
      },
      MuiInput: {
         root: {
            paddingLeft: 12,
         },
         underline: {
            '&::after': {
               borderBottom: '2px solid #632B6C'
            },
         },
         multiline: {
            paddingLeft: 12
         }
      }
   },
   palette: {
      primary: {
         light: '#E0E4E5',
         main: '#632B6C',
         dark: '#280F36'
      },
      secondary: {
         light: '#FFD9C4',
         main: '#FFC1A0',
         dark: '#FE9C7F'
      },
   }
})

export default theme;
