import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#1affb2",
    },
    secondary: {
      main: "#AA99FF",
    },
    error: {
      main: "#ff4b79",
    },
  },
});

export default theme;
