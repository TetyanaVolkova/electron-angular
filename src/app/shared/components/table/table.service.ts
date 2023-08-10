import { Injectable } from "@angular/core";
import { faker } from "@faker-js/faker";

@Injectable({
  providedIn: 'root'
})

export class TableService {

  prePopulateTable(rowNumbers: number):any[] {
    const columnArr = [];
    for (let i = 0; i < rowNumbers; i++) {
      columnArr.push({
        'id': i + 1,
        'user name': faker.person.fullName(),
        'company name': faker.company.name(),
        'company phrase': faker.company.catchPhrase(),
        'country': faker.location.country()
      })
    }
    return columnArr;
  }
}
