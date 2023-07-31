import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';


const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay: string[] = this.displayedColumns;
  data: any[] = ELEMENT_DATA;
  columns: Observable<any[]> | null = of(this.data) || null;

  addColumn() {
    this.columns = null;
    this.columnsToDisplay.push('test');
    this.data.forEach((element) => {
      element.test = 'random';
    });
    setTimeout(() => {
      this.columns = of(this.data);
    });
  }

  removeColumn() {
    const table = document.getElementById("table") as HTMLTableElement;
    for (let i=0; i < table.rows.length; i++) {
      if(this.displayedColumns.length > 1) {
        table.rows[i].deleteCell(0);
        // console.log(this.displayedColumns)
        // this.displayedColumns.
      }
    }
  }

}
