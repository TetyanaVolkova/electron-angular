import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { KeysPipe } from './components/table/keys-pipe.pipe';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    TableComponent,
    KeysPipe
  ],
  imports: [
    CommonModule, TranslateModule, FormsModule
  ],
  exports: [
    TranslateModule, FormsModule, TableComponent
  ]
})
export class SharedModule {}
