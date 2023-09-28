/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, Input } from '@angular/core';
import { utils, writeFile} from 'xlsx';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss']
})
export class DownloadButtonComponent {

  downloadConform = false;
  fileName = ''
  @Input() format!: string;
  @Input() data!: any;

  download(): void {
    const headers = Object.keys(this.data[0]);
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, [headers]);
    utils.sheet_add_json(ws, this.csvMaker());
    utils.sheet_to_csv(ws);
    utils.book_append_sheet(wb, ws);
    writeFile(wb, `${this.fileName.toLowerCase()}.csv`);
  }

  csvMaker() {
    // Empty array for storing the values
    const csvRows: any[] = [];
    // Creating headers
    const headers = Object.keys(this.data[0]);
    // As for making csv format, headers
    // must be separated by comma and
    // pushing it into array
    csvRows.push(headers);
    // Pushing Object values into array
    this.data.forEach((item: any) => {
      csvRows.push(Object.values(item))
    });
    return csvRows;
  }
}
