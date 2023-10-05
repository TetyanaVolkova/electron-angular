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
    switch(this.format) {
      case 'csv':
        const headers = Object.keys(this.data[0]);
        const wb = utils.book_new();
        const ws: any = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, [headers]);
        utils.sheet_add_json(ws, this.csvMaker());
        utils.sheet_to_csv(ws);
        utils.book_append_sheet(wb, ws);
        writeFile(wb, `${this.fileName.toLowerCase()}.csv`);
        break;
      case 'json':

      if(!this.data) {
          console.error('No data')
          return;
      }
  
      if(!this.fileName) this.fileName = 'download.json'
  
      if(typeof this.data === "object"){
          this.data = JSON.stringify(this.data, undefined, 4)
      }
  
      var blob = new Blob([this.data], {type: 'text/json'}),
          e    = document.createEvent('MouseEvents'),
          a    = document.createElement('a')
      a.download = this.fileName
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    }
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
