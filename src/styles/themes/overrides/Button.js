export default function Button(theme) {
  const disabledStyle = {
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[200],
    },
  }

  return {
    MuiButton: {
      // defaultProps: {
      //   disableElevation: true,
      // },
      styleOverrides: {
        root: {
          fontWeight: 400,
          borderRadius: theme.shape.borderRadius,
          textTransform: "none",
        },
        contained: {
          // ...disabledStyle,
        },
        outlined: {
          // ...disabledStyle,
        },
      },
    },
  }
}
