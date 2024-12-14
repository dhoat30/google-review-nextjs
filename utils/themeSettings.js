import { createTheme } from '@mui/material/styles';
//export theme settings
// mui theme settings 
export const theme = createTheme({

    palette: {
        mode: 'dark',
        primary: {
            main: 'rgb(61 95 144)',
        },
        secondary: {
            main: 'rgb(85 95 113)',
        },
        tertiary: {
            main: 'rgb(1 103 125)',
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
        
            '@media (max-width:900px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontWeight: 500,
            color: "var(--dark-on-surface)",
        
            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h3: {
            fontWeight: 600,
            letterSpacing: "0.05rem",
            color: "var(--dark-on-surface)",
        

        },
        h4: {
            fontWeight: 500,
            color: "var(--dark-on-surface)",
        

            '@media (max-width:900px)': {
                fontSize: '1.5rem',
            },
        },
        h5: {
            fontWeight: 400,
            letterSpacing: "0.02rem",
        

            color: "var(--dark-on-surface)",

        },

        h6: {
            fontWeight: 400,
            letterSpacing: "0.02rem",
            color: "var(--dark-on-surface)",
        
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
       
    }
});

export const lightTheme = createTheme({

    palette: {
        mode: 'light',
        primary: {
            main: 'rgb(61 95 144)',
        },
        secondary: {
            main: 'rgb(85 95 113)',
        },
        tertiary: {
            main: 'rgb(1 103 125)',
        },
        contrastThreshold:4.5,
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
            lineHeight: "1.4rem",
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
                   
                },
                contained:{ 
                    borderRadius: "50px", 
                  background: "var(--black)",
                  color: "var(--white)",
                }, 
                outlined: {
                    border: "1px solid var(--light-primary)",
                    color: "var(--light-primary)",

                },
            }
        }
    }
});