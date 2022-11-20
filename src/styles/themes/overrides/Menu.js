export default function Menu(theme) {
  return {
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: "none !important",
          border: `1px solid ${theme.palette.divider}`,
        },
        list: {
          padding: theme.spacing(1),
        },
      },
    },
  }
}
