import jsPDF from "jspdf"
import "jspdf-autotable"

import { formatDate } from "@utils/date"
import {
  pad,
  getFullName,
  numberWithCommas,
  calculateDiscount,
} from "@utils/common"

export const generateInvoice = ({ type = "order", data, settings }) => {
  if (type === "quotation") {
    generateQuotationInvoice(data, settings)
  } else {
    throw new Error("Invalid type")
  }

  return
}

const generateQuotationInvoice = (data, settings) => {
  const pdfHeaders = [
    {
      header: "Sr",
      dataKey: "sr",
    },
    {
      header: "Item",
      dataKey: "title",
    },
    {
      header: "Quantity",
      dataKey: "quantity",
    },
    {
      header: "Rate",
      dataKey: "price",
    },
    {
      header: "Disc %",
      dataKey: "discount",
    },
    {
      header: "Disc",
      dataKey: "discountedPrice",
    },
    {
      header: "Amount",
      dataKey: "amount",
    },
  ]

  let amount = 0
  let totalPrice = 0
  let totalDiscount = 0

  let pdfData = data.items.map((item, index) => {
    let quantity = item.quantity
    let discount = item.discount.value || 0
    let discountedPrice = item.discount.value
      ? calculateDiscount(item.salePrice, item.quantity, item.discount.value)
          .discount
      : 0
    let total = calculateDiscount(
      item.salePrice,
      item.quantity,
      item.discount.value
    ).value

    amount += Number(total)
    totalDiscount += Number(discountedPrice)
    totalPrice += Number(item.salePrice * quantity)

    return {
      id: String(index + 1),
      sr: String(index + 1),
      title: item.itemId.title,
      quantity: String(quantity),
      amount: String(numberWithCommas(total)),
      discount: String(numberWithCommas(discount)),
      price: String(numberWithCommas(item.salePrice)),
      discountedPrice: String(numberWithCommas(discountedPrice)),
    }
  })

  pdfData[pdfData.length] = {
    title: "Total",
    amount: numberWithCommas(amount),
    price: numberWithCommas(totalPrice),
    discountedPrice: numberWithCommas(totalDiscount),
  }

  let address = [settings?.address?.addressOne]
  if (settings?.address?.addressTwo) address.push(settings?.address?.addressTwo)
  if (settings?.address?.city) address.push(settings?.address?.city)
  if (settings?.address?.zip) address.push(settings?.address?.zip)
  if (settings?.address?.state) address.push(settings?.address?.state)
  if (settings?.address?.country) address.push(settings?.address?.country)

  let vPos = 15

  const LEFT_POS = 14
  const RIGHT_POS = 196
  const CENTER_POS = 105
  const VERTICAL_GAP = 6
  const BODY_FONT_SIZE = 10
  const HEADER_FONT_SIZE = 20

  var doc = new jsPDF({ unit: "mm", format: "a4", orientation: "p" })

  // Header
  doc.setFontSize(HEADER_FONT_SIZE, "bold")
  doc.text(settings?.name || "", CENTER_POS, vPos, null, null, "center")
  vPos += VERTICAL_GAP + 5

  doc.setFontSize(BODY_FONT_SIZE)
  doc.text(
    `Address: ${address.join(", ") || ""}`,
    CENTER_POS,
    vPos,
    null,
    null,
    "center"
  )
  vPos += VERTICAL_GAP

  doc.text(
    `Mobile #: ${settings?.phone || ""}`,
    CENTER_POS,
    vPos,
    null,
    null,
    "center"
  )
  vPos += VERTICAL_GAP

  doc.text(`Quotation #: ${pad(data.sr)}`, LEFT_POS, vPos)
  doc.text(
    `Date: ${formatDate(data.createdAt)}`,
    RIGHT_POS,
    vPos,
    null,
    null,
    "right"
  )
  vPos += VERTICAL_GAP

  doc.text(`Customer: ${getFullName(data?.customerId)}`, LEFT_POS, vPos)
  vPos += VERTICAL_GAP

  doc.autoTable({
    startX: 0,
    startY: vPos,
    body: pdfData,
    theme: "grid",
    columns: pdfHeaders,
    styles: { overflow: "ellipsize", cellWidth: "wrap" },
    columnStyles: {
      text: { cellWidth: "auto" },
      quantity: { halign: "right" },
      price: { halign: "right" },
      discount: { halign: "right" },
      discountedPrice: { halign: "right" },
      amount: { halign: "right" },
    },
    headStyles: {
      fontSize: BODY_FONT_SIZE,
      fillColor: [255, 255, 255],
      textColor: 0,
      fontStyle: "bold",
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
    bodyStyles: {
      fontSize: BODY_FONT_SIZE,
      fillColor: [255, 255, 255],
      textColor: 0,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
    didParseCell: (data) => {
      if (data.section === "head") {
        if (
          data.column.dataKey === "quantity" ||
          data.column.dataKey === "price" ||
          data.column.dataKey === "discount" ||
          data.column.dataKey === "discountedPrice" ||
          data.column.dataKey === "amount"
        ) {
          data.cell.styles.halign = "right"
        }
      }
    },
  })

  doc.text("Signature ___________________", 14, doc.lastAutoTable.finalY + 14)

  doc.autoPrint()
  window.open(doc.output("bloburl"))
  // doc.save(`${data.order_id}.pdf`)
  return
}
