/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { utils, writeFile} from 'xlsx';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss']
})
export class DownloadButtonComponent {

  constructor( private httpClient: HttpClient ) {}

  downloadConform = false;
  fileName = ''
  @Input() format!: string;
  @Input() data!: any;

  download(): void {
    const blob = new Blob([this.data], {type: 'text/json'}),
        ws      = utils.json_to_sheet([]),
        wb      = utils.book_new(),
        headers = Object.keys(this.data[0]),
        e       = document.createEvent('MouseEvents'),
        a       = document.createElement('a');

    const sqlRowsArr: string[][] = [];

    // Creating column names
    const keys: string[] = [];
    Object.keys(this.data[0]).forEach((key: string) => {
      keys.push(key.split(' ').join('_'));
    });
    console.log(keys)

    // const columns: string[] = ['id int NOT NULL AUTO_INCREMENT PRIMARY KEY'];
    const columns: string[] = [];
    const key_values: string[] = [];
    keys.forEach((key) => {
      key_values.push('%s');
      columns.push(`${key} CHAR(255)`)
    })
    this.data.forEach((row: any) => {
      const query: string[] = []
      Object.keys(row).forEach((key) => {
        // eslint-disable-next-line no-useless-escape
        query.push(`'${typeof row[key] === 'string'? row[key].split("'").join("\\'"): row[key]}'`)
      })
      sqlRowsArr.push(query)
      // console.log(sqlRowsArr.toString())
    });


    const createTable =`CREATE TABLE TEST(${columns.toString()});`;
    const insertQuery = `INSERT INTO TEST (${keys.toString()}) VALUES(${key_values.toString()})`;
    const sqlQuery = `${createTable} INSERT INTO TEST (${keys.toString()}) VALUES${sqlRowsArr};`

    switch(this.format) {
      case 'csv':
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

      // if(typeof this.data === "object"){
      //     const convertedData = JSON.stringify(this.data, undefined, 4)
      // }


      // a.download = this.fileName
      // a.href = window.URL.createObjectURL(blob)
      // a.dataset.downloadUrl =  ['text/json', a.download, a.href].join(':')
      // e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      // a.dispatchEvent(e)



      console.log(sqlQuery)
      // console.log(insertValues)
      // console.log(sqlQuery)
          this.httpClient.post<string>('http://localhost:8125/s3bucket/', {create_table: createTable, insert_query: insertQuery, insert_data: sqlRowsArr, json_data: this.data}).subscribe()
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
