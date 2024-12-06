import { createTheme } from '@mui/material/styles';
//export theme settings
// mui theme settings 
export const theme = createTheme({

    palette: {
        mode: 'dark',
        primary: {
            main: '#0D47A1',
        },
        secondary: {
            main: '#00897B',
        },
        tertiary: {
            main: '#FFC107',
        },
        contrastThreshold: 4.5,
    },
    typography: {
        fontFamily: [
            'var(--font-work-sans)',
            "Segoe UI",
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '5rem',
            fontWeight: 500,
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-cormorant)',
            '@media (max-width:900px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontWeight: 500,
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-cormorant)',
            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h3: {
            fontWeight: 600,
            letterSpacing: "0.05rem",
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-cormorant)',

        },
        h4: {
            fontWeight: 500,
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-cormorant)',

            '@media (max-width:900px)': {
                fontSize: '1.5rem',
            },
        },
        h5: {
            fontWeight: 400,
            letterSpacing: "0.02rem",
            fontFamily: 'var(--font-cormorant)',

            color: "var(--dark-on-surface)",

        },

        h6: {
            fontWeight: 400,
            letterSpacing: "0.02rem",
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-cormorant)',
        },
        body1: {
            color: "var( --dark-on-surface-variant)",
            fontWeight: 300,
        },
        body2: {
            fontWeight: 300,
            letterSpacing: "0.05rem",
        },
        subtitle1: {
            color: "var(--dark-on-surface)",

        }

    },
    components: {
        MuiButton: {

            styleOverrides: {
                root: {
                    borderRadius: "0",
                    paddingRight: "32px",
                    paddingLeft: "32px",
                },
                contained: {
                    color: "var(--dark-on-primary)",
                    background: "var(--dark-primary)",
                    transition: "all 0.3s ease-in-out",
                    border: "1px solid var(--dark-primary)",
                    '&:hover': {
                        border: "1px solid rgba(230,230,230,1)",

                        color: "var(--dark-on-primary)",
                        background: "rgba(230,230,230,1)",

                    },
                },
                outlined: {
                    border: "2px solid var(--dark-primary)",
                    color: "var(--dark-primary)",
                    transition: "all 0.3s ease-in-out",

                    '&:hover': {
                        border: "2px solid var(--dark-primary)",
                        backgroundColor: 'var(--dark-primary)',
                        color: 'var(--dark-on-primary)',
                    },
                },
            }
        }
    }
});

export const lightTheme = createTheme({

    palette: {
        mode: 'light',
        primary: {
            main: '#0D47A1',
        },
        secondary: {
            main: '#00897B',
        },
        tertiary: {
            main: '#FFC107',
        },
        contrastThreshold: 4.5,
    },
    typography: {
        fontFamily: [
            'var(--font-work-sans)',
            "Segoe UI",
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '5rem',
            fontWeight: 600,
            color: "var(--light-on-surface)",

            '@media (max-width:900px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontWeight: 600,
            fontSize: '3rem',
            lineHeight: "3.4rem",
            color: "var(--light-on-surface)",

            '@media (max-width:600px)': {
                fontSize: '2.5rem',
                lineHeight: "2.8rem",

            },
        },
        h3: {
            fontWeight: 600,
            letterSpacing: "0.05rem",
            color: "var(--light-on-surface)",
            '@media (max-width:600px)': {
                fontSize: '1.7rem',
                lineHeight: "2.2rem",

            },
        },
        h4: {
            fontWeight: 500,
            color: "var(--light-on-surface)",

        },
        h5: {
            fontWeight: 400,
            letterSpacing: "0.02rem",

            color: "var(--light-on-surface)",

        },

        h6: {
            color: "var(--light-on-surface)",
        },
        body1: {

            color: "var( --light-on-surface-variant)"
        },
        body2: {

        },
        subtitle1: {
            color: "var(--light-on-surface)",
            fontWeight: 500,
        }

    },
    components: {
        MuiButton: {

            styleOverrides: {
                root: {
                    borderRadius: "50px",
                    color: "var(--light-on-primary)",
                    paddingRight: "32px",
                    paddingLeft: "32px",
                },
                outlined: {
                    border: "1px solid var(--light-primary)",
                    color: "var(--light-primary)",

                },
            }
        }
    }
});