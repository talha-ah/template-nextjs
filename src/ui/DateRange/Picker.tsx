import { Box } from "@mui/material"

import { Button } from "@ui/Button"
import { Heading } from "@ui/Title"
import { DateRange } from "@ui/DateRange"
import { DateRange as DateRangeType } from "@utils/types"

export const DateRangePicker = ({
  value,
  onChange,
}: {
  value: DateRangeType
  onChange: (args: DateRangeType) => void
}) => {
  return (
    <>
      <Box
        mb={2}
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Heading>Date Range</Heading>
        <Button
          size="small"
          variant="text"
          onClick={() => onChange([null, null])}
        >
          Clear Range
        </Button>
      </Box>

      <DateRange value={value} onChange={onChange} />
    </>
  )
}
