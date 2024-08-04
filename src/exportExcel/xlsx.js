import React, { useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { FileExcelOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = (apiData, fileName) => {
    // Convert JSON data to worksheet
    const ws = XLSX.utils.json_to_sheet(apiData);

    // Set column widths and center align cells
    const cols = Object.keys(apiData[0] || {}).map((key, index) => ({
      wpx: key === "no" ? 50 : 150, // Make "no" column smaller
      alignment: { horizontal: "center", vertical: "center" }
    }));
    ws["!cols"] = cols;

    // Add header styles
    ws["A1"].s = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4F81BD" } },
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } }
      }
    };

    // Apply border and center alignment to all cells
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellAddress]) continue;
        ws[cellAddress].s = {
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } }
          },
          alignment: { horizontal: "center", vertical: "center" }
        };
      }
    }

    // Create workbook and add sheet
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    // Generate Excel file
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const boxStyle = {
    width: "200px",
    backgroundColor: isHover ? "#eaf1f1" : "#039855",
    color: isHover ? "#039855":"#ecfdf3",
    marginTop: "8px"
  };

  return (
    <Button
      style={boxStyle}
      size="large"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => exportToExcel(apiData, fileName)}
    >
      <div>
        <FileExcelOutlined style={{ marginRight: "10px" }} />
        <strong>Export Ke Excel</strong>
      </div>
    </Button>
  );
};
