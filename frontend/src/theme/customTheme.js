import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { square: false },
              style: {
                borderRadius: "8px",
              },
            },
          ],
        },
      },
    },
  },
});
