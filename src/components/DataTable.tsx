import React from "react"

import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import { Select } from "@components/Select"
import TableRow from "@mui/material/TableRow"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import Pagination from "@mui/material/Pagination"
import TableContainer from "@mui/material/TableContainer"
import CircularProgress from "@mui/material/CircularProgress"

import { DataTableHeader } from "@utils/types"

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

export const DataTable = ({
  page,
  limit,
  loading,
  data = [],
  totalPages,
  columns = [],
  onPageChange,
  onLimitChange,
}: {
  data?: any[]
  page?: number
  limit?: number
  loading?: boolean
  totalPages?: number
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
  columns?: DataTableHeader[]
}) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange && onPageChange(newPage)
  }

  const handleLimitChange = (event: any) => {
    onLimitChange && onLimitChange(+event.target.value)
    onPageChange && onPageChange(1)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper} variant="outlined">
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column: DataTableHeader) => {
                    let value
                    if (column.render) {
                      value = column.render(row)
                    } else {
                      value = getValue(row, column.id.split("."))
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
            {(loading || data.length === 0) && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{ textAlign: "center" }}
                >
                  {loading ? <CircularProgress /> : "No data available"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {page && limit && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Select
            size="small"
            value={String(limit)}
            onChange={handleLimitChange}
            options={["10", "25", "100"].map((option: string) => ({
              value: option,
              label: `${option} items per page`,
            }))}
          />
          <Pagination
            page={page}
            showLastButton
            showFirstButton
            shape="rounded"
            count={totalPages}
            onChange={handleChangePage}
          />
        </Box>
      )}
    </Box>
  )
}
