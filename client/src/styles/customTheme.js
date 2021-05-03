import { createMuiTheme } from "@material-ui/core";

const customTheme = createMuiTheme({
    typography: {
        fontFamily: [
            'Mulish', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif',
        ].join(','),
        button: {
            textTransform: 'none'
        }
    },
    palette: {
        primary: {
            main: 'rgba(223,49,69,1)',
            dark: 'rgba(223,49,69,1)',
            light: 'rgba(223,49,69,1)'
        },
        secondary: {
            main: 'rgba(123,33,125,1)',
            dark: 'rgba(123,33,125,1)',
            light: 'rgba(123,33,125,1)'
        }
    },
    custom: {
        background: 'linear-gradient(135deg, rgba(223,49,69,1) 0%, rgba(123,33,125,1) 100%)'
    }
});

export default customTheme;