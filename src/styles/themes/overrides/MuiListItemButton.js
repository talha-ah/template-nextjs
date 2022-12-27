export default function MenuItem(theme) {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          height: theme.spacing(5.5),
          borderRadius: +theme.shape.borderRadius,
          "&.Mui-selected": {
            "&:hover": {
              backgroundColor: darken(theme.palette.action.hover, 0.5),
            },
            backgroundColor: theme.palette.action.hover,
          },
        }),
      },
    },
  }
}
