export default function MenuItem(theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          margin: `${theme.spacing(0.3)} 0`,
          borderRadius: +theme.shape.borderRadius,
          padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
        },
      },
    },
  }
}
