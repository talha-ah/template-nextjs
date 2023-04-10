import { useRouter } from "next/router"

import { ListItemText, ListItemButton } from "@mui/material"

import { NavLink } from "@utils/types"

const NavItem = ({ item }: { item: NavLink }) => {
  const router = useRouter()

  const Icon = item.icon
  const actions = item.actions
  const isExternal = item.href?.startsWith("http")
  const isSelected = item.href
    ? item.exact
      ? router.asPath === item.href
      : router.asPath.startsWith(item.href)
    : false

  const itemHandler = () => {
    if (item.href) {
      if (isExternal) window.open(item.href, "_blank")
      else router.push(item.href)
    }
  }

  return (
    <ListItemButton
      key={item.value}
      onClick={itemHandler}
      selected={isSelected}
      sx={{ mb: 1, gap: 1.5 }}
    >
      {Icon && Icon}

      <ListItemText primary={item.value} />

      {actions && actions.map((action) => action)}
    </ListItemButton>
  )
}

export default NavItem
