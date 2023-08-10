import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { KeysPipe } from './components/table/keys-pipe.pipe';
import { AddColumnDialogComponent } from './dialogs/add-column-dialog/add-column-dialog.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    TableComponent,
    KeysPipe,
    AddColumnDialogComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule, TranslateModule, FormsModule
  ],
  exports: [
    TranslateModule, FormsModule, TableComponent, LoaderComponent
  ]
})
export class SharedModule {}
