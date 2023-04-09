import * as React from "react"

import { Box, Badge } from "@mui/material"
import { FilterList } from "@mui/icons-material"

import { Button } from "@ui/Button"
import { Popover } from "@ui/Popover"
import { useIsMobile } from "@hooks/useIsMobile"

interface Props {
  text: string
  onClose: () => void
  showBadge?: boolean
  children: React.ReactNode | React.ReactNode[]
}

export const Responsive = ({ text, children, showBadge }: Props) => {
  const { isMobile } = useIsMobile()

  return isMobile ? (
    <Popover
      trigger={({ toggleOpen, ref }) => (
        <Badge variant="dot" color="primary" badgeContent={showBadge ? 1 : 0}>
          <Button
            ref={ref}
            variant="text"
            onClick={toggleOpen}
            startIcon={<FilterList />}
          >
            Filters
          </Button>
        </Badge>
      )}
      content={
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {children}
        </Box>
      }
    />
  ) : (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {children}
    </Box>
  )
}
