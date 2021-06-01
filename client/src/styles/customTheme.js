import { createMuiTheme } from "@material-ui/core";

const customTheme = createMuiTheme({
    typography: {
        fontFamily: [
            'Helvetica Neue', 'Mulish', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'sans-serif',
        ].join(','),
    },
    palette: {
        primary: {
            main: 'rgba(123,33,125,1)',
        },
        secondary: {
            main: 'rgba(223,49,69,1)',
        },
        text: {
            primary: "#626262",
        },
        background: {
            default: '#EFEFEF'
        }
    },
});

export default customTheme;