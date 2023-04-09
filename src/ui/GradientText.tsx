import { styled } from "@mui/material/styles"

export const GradientText = styled("span")<{
  color?: "primary" | "error" | "success" | "warning"
}>(({ theme, color = "primary" }) => ({
  backgroundSize: "100%",
  backgroundClip: "text",
  backgroundcolor: "primary",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundImage: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
  // linear-gradient(to right, ${theme.palette[color].main}, ${theme.palette[color][700]})
}))
