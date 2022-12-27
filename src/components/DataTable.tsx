import * as React from "react"

import { Box } from "@mui/material"
import { Paper } from "@mui/material"
import { Table } from "@mui/material"
import { TableRow } from "@mui/material"
import { TableBody } from "@mui/material"
import { TableCell } from "@mui/material"
import { TableHead } from "@mui/material"
import { Pagination } from "@mui/material"
import { TableContainer } from "@mui/material"
import { CircularProgress } from "@mui/material"

import { Select } from "@ui/Select"
import { generateId } from "@utils/common"
import { Sort } from "@mui/icons-material"
import { IconButton } from "@ui/IconButton"
import { DataTableHeader } from "@utils/types"
import { useIsMobile } from "@hooks/useIsMobile"

function getValue(
  obj: any,
  fieldArray: string[],
  i: number = 0
): React.ReactNode {
  let value
  value = obj[fieldArray[i]]
  if (typeof value === "object" && !React.isValidElement(value)) {
    value = getValue(value, [fieldArray[i + 1]])
  }
  return value
}

export interface Totals {
  key: string
  value: string
}

export const DataTable = ({
  page,
  limit,
  loading,
  disabled,
  data = [],
  totalPages,
  totals = [],
  columns = [],
  onPageChange,
  onLimitChange,
}: {
  data?: any[]
  page?: number
  limit?: number
  totals?: Totals[]
  loading?: boolean
  disabled?: boolean
  totalPages?: number
  columns?: DataTableHeader[]
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
}) => {
  const { isMobile } = useIsMobile()

  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange && onPageChange(newPage)
  }

  const handleLimitChange = (event: any) => {
    onLimitChange && onLimitChange(+event.target.value)
    onPageChange && onPageChange(1)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={(theme) => ({ backgroundColor: theme.palette.background.default })}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align}
                  sx={{ whiteSpace: "nowrap", minWidth: column.minWidth }}
                >
                  {column.value}
                  {column.onSort && (
                    <IconButton
                      size="small"
                      sx={{ ml: 1 }}
                      tooltip="sort"
                      aria-label="sort"
                      onClick={column.onSort}
                    >
                      <Sort fontSize="inherit" />
                    </IconButton>
                  )}
                  {column.actions && column.actions()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(loading || data.length === 0) && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{ textAlign: "center", whiteSpace: "nowrap" }}
                >
                  {loading ? <CircularProgress /> : "No data available"}
                </TableCell>
              </TableRow>
            )}

            {data.map((row: any, index: number) => {
              return (
                <TableRow hover tabIndex={-1} key={row._id || generateId()}>
                  {columns.map((column: DataTableHeader) => {
                    let value

                    if (column.render) value = column.render(row, index)
                    else value = getValue(row, column.key.split("."))

                    if (column.format) value = column.format(value)

                    return (
                      <TableCell
                        key={column.key}
                        align={column.align}
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        {value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}

            {data.length > 0 && totals.length > 0 && (
              <TableRow>
                {columns.map((column: DataTableHeader) => {
                  let value = ""

                  let find = totals.find((item) => item.key === column.key)
                  if (find) value = find.value

                  return (
                    <TableCell
                      key={column.key}
                      align={column.align}
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {value}
                    </TableCell>
                  )
                })}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {page && limit && (
        <Box
          sx={{
            mt: 2,
            gap: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Pagination
            page={page}
            shape="rounded"
            siblingCount={0}
            disabled={loading}
            count={totalPages}
            onChange={handleChangePage}
          />

          <Select
            size="small"
            fullWidth={isMobile}
            value={String(limit)}
            onChange={handleLimitChange}
            options={["10", "20", "50", "100"].map((option: string) => ({
              key: option,
              value: `${option} items per page`,
            }))}
          />
        </Box>
      )}
    </Box>
  )
}
