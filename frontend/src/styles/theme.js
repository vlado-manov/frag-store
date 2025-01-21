import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    // primary: {
    //   main: "#2e0145", // Основният цвят, ако градиентът не може да се приложи глобално
    //   contrastText: "#ffffff", // Бял текст върху основния цвят
    // },
    // secondary: {
    //   main: "#ffffff", // Бял бутон
    //   contrastText: "#2e0145", // Текст върху бял фон
    // },
    // background: {
    //   default: "#ffffff", // Бекграунд на контента
    //   paper: "#fafafa", // Бекграунд на компонентите
    // },
    // text: {
    //   primary: "#fff", // Основен цвят за текст
    // },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif", // Основен шрифт
    h1: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontSize: 96,
      fontWeight: 900,
    },
    h2: {
      fontFamily: "Raleway, Arial, sans-serif",
    },
    h3: {
      fontFamily: "Raleway, Arial, sans-serif",
    },
    h4: {
      fontFamily: "Raleway, Arial, sans-serif",
    },
    h5: {
      fontFamily: "Raleway, Arial, sans-serif",
    },
    h6: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
    body1: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
    body2: {
      fontFamily: "Raleway, Arial, sans-serif",
      textDecorationColor: "#313131 !important",
      color: "#313131 !important",
    },
    subtitle1: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
    subtitle2: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // background: "#996f99",
          background: "#221b22",
          textTransform: "none",
          padding: "8px 16px",
          fontSize: "16px",
        },
        outlined: {
          borderColor: "#313131",
          borderWidth: 1,
          background: "#fff",
          color: "#313131",
          width: "100%",
          "&:hover": {
            opacity: 0.8,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#cbd5e1", // Рамка на инпутите
              borderWidth: 2,
              fontSize: "12px",
            },
            "&:hover fieldset": {
              borderColor: "#cbd5e1", // При hover на инпут
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ccc", // Когато е фокусирано
            },
          },
          // Тук добавяме стилове за autofill
          "& input:-webkit-autofill": {
            backgroundColor: "#fafaf9 !important", // Фон за autofill
            color: "#313131 !important", // Текстовия цвят
            borderColor: "#996f99 !important", // Рамка при autofill
            boxShadow: "0 0 0 30px #fff inset !important", // Премахване на синия фон на autofill
          },
          "& input:-webkit-autofill:focus": {
            backgroundColor: "#fafaf9 !important", // Фон за autofill при фокус
            color: "#313131 !important", // Текстовия цвят
            borderColor: "#996f99 !important", // Рамка при autofill фокус
            boxShadow: "0 0 0 30px #fff inset !important", // Премахване на синия фон на autofill
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#313131", // Цвят на лейбъла по подразбиране
          background: "#fafaf9",
          padding: "0 10px 0 0",
          fontSize: "16px",
          "&.Mui-focused": {
            color: "#313131", // Цвят на лейбъла, когато е фокусиран
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
    },
    secondary: {
      main: "#03dac6",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
  },
});
export { lightTheme, darkTheme };
