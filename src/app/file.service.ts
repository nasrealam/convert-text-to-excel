import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  async convertTxtToExcel(file: File): Promise<void> {
    const text = await file.text();
    const rows = text.split('\n').map((row) => row.split('\t'));

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    rows.forEach((row) => {
      worksheet.addRow(row);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    fs.saveAs(blob, 'excelFile.xlsx');
  }
}
