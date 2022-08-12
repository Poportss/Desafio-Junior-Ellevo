import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  declarations: [TableComponent],
  exports: [TableComponent, NgxPaginationModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
