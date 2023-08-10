import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { faker } from '@faker-js/faker';
import { TableService } from './table.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
  constructor(private tableService: TableService) {
  }

  displayedColumns: string[] = ['id', 'user name', 'company name', 'company phrase', 'country'];

  data: any[] = this.tableService.prePopulateTable(1000);
  columns: Observable<any[]> | null = of(this.data) || null;
  openAddDialog = false;
  openRemoveDialog = false;
  columnName = '';
  columnType: 'string'          |
              'number'          |
              'boolean'         |
              'date'            |
              'emoji'           |
              'full name'        |
              'company name'     |
              'animal'          |
              'color'           |
              'product'         |
              'price'           |
              'authCode'        |
              'avatar url'       |
              'jbId'            |
              'email'           |
              'phone'           |
              'vehicle'         |
              'chemical element' |
              'job title'
            = 'string';
  noColumns = false;
  columnToRemove = '';

  openAddDialogWindow():void {
    this.openAddDialog = true;
    setTimeout(() => {
      const input = document.getElementById('name');
      input?.focus();
    }, 1000);
  }

  openRemoveDialogWindow():void {
    this.openRemoveDialog = true;
  }

  addColumn() {
    this.columns = null;
    this.displayedColumns.push(this.columnName);
    this.insertData();
    setTimeout(() => {
      this.columns = of(this.data);
    }, 1000);
    this.columnName = '';
    this.openAddDialog = false;
    this.columnType = 'string';
  }

  removeColumn() {
    this.columns = null;
    this.displayedColumns = this.displayedColumns.filter((columnName) => {
      return columnName !== this.columnToRemove.toLowerCase();
  });
    this.data.map((item) => {
      console.log(item)
      delete item[this.columnToRemove]
    })
    setTimeout(() => {
      this.columns = of(this.data);
    }, 1000);
    this.openRemoveDialog = false;
    this.columnToRemove = '';
  }

  insertData(): void {
    this.data.forEach((element) => {
      if(this.columnType === 'boolean') {
        element[this.columnName] = Math.random() < 0.5;
      } else if (this.columnType === 'number') {
        element[this.columnName] = faker.number.int(100);
      } else if (this.columnType === 'date') {
        element[this.columnName] = faker.date.anytime().toUTCString();
      } else if(this.columnType === 'emoji') {
        element[this.columnName] = faker.internet.emoji();
      } else if(this.columnType === 'full name') {
        element[this.columnName] = faker.person.fullName();
      } else if(this.columnType === 'company name') {
        element[this.columnName] = faker.company.name()
      } else if(this.columnType === 'animal') {
        element[this.columnName] = faker.animal.type();
      } else if(this.columnType === 'string') {
        element[this.columnName] = faker.word.words();
      } else if(this.columnType === 'color') {
        element[this.columnName] = faker.color.human();
      } else if(this.columnType === 'price') {
        element[this.columnName] = faker.commerce.price({ min: 1, max: 2000, dec: 0, symbol: '$' })
      } else if(this.columnType === 'product') {
        element[this.columnName] = faker.commerce.product()
      } else if(this.columnType === 'authCode') {
        element[this.columnName] = faker.helpers.fromRegExp(/[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}/);
      } else if(this.columnType === 'avatar url') {
        element[this.columnName] = faker.internet.avatar();
      } else if(this.columnType === 'jbId') {
        element[this.columnName] = faker.internet.displayName();
      } else if(this.columnType === 'email') {
        element[this.columnName] = faker.internet.email();
      } else if(this.columnType === 'phone') {
        element[this.columnName] = faker.phone.number('###-###-####');
      } else if(this.columnType === 'vehicle') {
        element[this.columnName] = faker.vehicle.vehicle();
      } else if(this.columnType === 'chemical element') {
        element[this.columnName] = faker.science.chemicalElement().name;
      } else if(this.columnType === 'job title') {
        element[this.columnName] = faker.person.jobTitle();
      }
    });
  }

  checkName(name: string): boolean {
    console.log(name);
    return true;
  }

  download(format: string): void {
    console.log(format);
  }

}
