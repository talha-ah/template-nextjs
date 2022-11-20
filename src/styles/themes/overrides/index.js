import { merge } from "lodash"

import Tab from "./Tab"
import Menu from "./Menu"
import Tabs from "./Tabs"
import Chip from "./Chip"
import Grid from "./Grid"
import Link from "./Link"
import Badge from "./Badge"
import Paper from "./Paper"
import Button from "./Button"
import Select from "./Select"
import MenuItem from "./MenuItem"
import Checkbox from "./Checkbox"
import InputBase from "./InputBase"
import TableCell from "./TableCell"
import IconButton from "./IconButton"
import InputLabel from "./InputLabel"
import Typography from "./Typography"
import CardContent from "./CardContent"
import ListItemIcon from "./ListItemIcon"
import ToggleButton from "./ToggleButton"
import OutlinedInput from "./OutlinedInput"
import DialogActions from "./DialogActions"
import LinearProgress from "./LinearProgress"
import MuiListItemButton from "./MuiListItemButton"

export default function ComponentsOverrides(theme) {
  return merge(
    Chip(theme),
    Grid(theme),
    Menu(theme),
    Button(theme),
    Select(theme),
    MenuItem(theme),
    InputBase(theme),
    InputLabel(theme),
    ToggleButton(theme),
    OutlinedInput(theme),
    DialogActions(theme),
    MuiListItemButton(theme)
  )
}
