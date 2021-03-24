import { createMuiTheme } from "@material-ui/core";

const customTheme = createMuiTheme({
    typography: {
        fontFamily: [
            'Mulish', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif',
        ].join(','),
    },
    palette: {
        primary: {
            main: '#7B2A89',
            dark: '#36123C',
            light: '#BF41D5',
        },
        secondary: {
            main: '#E33A4F',
            dark: '#FF4141',
            light: '#962634',
        }
    },
    custom: {
        inBetween: '#B11F6A'
    }
});

export default customTheme;