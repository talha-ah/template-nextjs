import * as React from "react"
import { Children } from "react"

import { Box, Badge } from "@mui/material"
import { FilterList } from "@mui/icons-material"

import { Button } from "@ui/Button"
import { Popover } from "@ui/Popover"
import { useIsMobile } from "@hooks/useIsMobile"

interface Props {
  show?: number
  onClear: () => void
  showBadge?: boolean
  children: React.ReactNode | React.ReactNode[]
}

const Responsive = ({ onClear, children, showBadge }: Props) => {
  return (
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
      content={({ onClose }) => (
        <>
          <Box
            sx={{
              mb: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Filters
            <Button
              variant="text"
              onClick={() => {
                onClear()
                onClose()
              }}
            >
              Clear
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {children}
          </Box>
        </>
      )}
    />
  )
}

const getChildren = ({
  end,
  start,
  isMobile,
  children,
}: {
  end?: number
  start?: number
  isMobile?: boolean
  children: React.ReactNode | React.ReactNode[]
}) => {
  if (isMobile) return children

  if (Array.isArray(children)) {
    if (start) {
      return Children.toArray(children).splice(start)
    } else if (end) {
      return Children.toArray(children).splice(0, end)
    }
  }

  return children
}

const eligibleCount = ({
  show,
  children,
}: {
  show?: number
  children: React.ReactNode | React.ReactNode[]
}) => {
  if (show) return Children.toArray(children).length > show

  return false
}

export const Filters = ({ onClear, children, showBadge, show }: Props) => {
  const { isMobile } = useIsMobile()

  return (
    <>
      {!isMobile && show && getChildren({ children, end: show })}

      {isMobile || eligibleCount({ children, show }) ? (
        <Responsive onClear={onClear} showBadge={showBadge}>
          {getChildren({ children, start: show, isMobile })}
        </Responsive>
      ) : (
        <Box sx={{ display: "flex", gap: 2 }}>
          {getChildren({ children, start: show })}
        </Box>
      )}
    </>
  )
}
