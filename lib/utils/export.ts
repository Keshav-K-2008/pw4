import jsPDF from "jspdf";
import Papa from "papaparse";
import { formatDateTime } from "./format";

// PDF Export
export function exportToPDF(data: Record<string, unknown>[], title: string, filename: string) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(0, 61, 165);
  doc.rect(0, 0, pageWidth, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("StadiumMind AI", 14, 15);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(title, 14, 23);

  // Metadata
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(9);
  doc.text(`Generated: ${formatDateTime(new Date())}`, 14, 38);
  doc.text(`Total Records: ${data.length}`, 14, 44);

  // Table headers
  if (data.length > 0) {
    const headers = Object.keys(data[0]);
    const colWidth = Math.min((pageWidth - 28) / headers.length, 50);
    let y = 55;

    // Header row
    doc.setFillColor(240, 240, 240);
    doc.rect(14, y - 5, pageWidth - 28, 8, "F");
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    headers.forEach((h, i) => {
      doc.text(h.replace(/_/g, " ").toUpperCase(), 14 + i * colWidth, y);
    });
    y += 8;

    // Data rows
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    data.slice(0, 50).forEach((row) => {
      if (y > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        y = 20;
      }
      headers.forEach((h, i) => {
        const val = String(row[h] ?? "").slice(0, 20);
        doc.text(val, 14 + i * colWidth, y);
      });
      y += 7;
    });
  }

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages ? (doc as any).internal.getNumberOfPages() : (doc as any).getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `StadiumMind AI — FIFA World Cup 2026 | Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  doc.save(`${filename}.pdf`);
}

// CSV Export
export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// JSON Export
export function exportToJSON(data: unknown, filename: string) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.json`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
