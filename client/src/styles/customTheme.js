import { createMuiTheme } from "@material-ui/core";

function getTheme(theme)
{
    return createMuiTheme({
        typography: {
            fontFamily: [
                'Helvetica Neue', 'Mulish', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'sans-serif',
            ].join(','),
        },
        overrides: {
            MuiToolbar: {
                regular: {
                    height: "40px",
                    minHeight: "40px",
                    '@media (min-width: 600px)': {
                        minHeight: "40px"
                    }
                }
            },
            MuiDialog: {
                paper: {
                    backgroundColor: theme.mode === 'dark' ? '#3f3f3f' : '#EFEFEF'
                }
            },
            MuiButton: {
                root: {
                    textTransform: 'unset',
                }
            },
            MuiCard: {
                root: {
                    backgroundColor: theme.mode === 'dark' ? '#3f3f3f' : '#EFE'
                }
            }
        },
        palette: {
            type: theme.mode,
            primary: {
                main: 'rgba(123,33,125,1)',
            },
            secondary: {
                main: 'rgba(223,49,69,1)',
            },
            third: {
                main: '#0F91F3'
            },
            text: {
                primary: theme.mode === 'dark' ? '#fff' : "#3f3f3f",
            },
            background: {
                default: theme.mode === 'dark' ? '#3f3f3f' : '#EFEFEF',
            }
        },
    });
}

export default getTheme;