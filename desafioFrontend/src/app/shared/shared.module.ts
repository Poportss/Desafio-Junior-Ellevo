import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CpfPipe } from './pipes/cpf.pipe';
import { PhonePipe } from 'src/app/shared/pipes/phone.pipe';
import { MaskDirective } from 'src/app/shared/mask/mask.directive';

@NgModule({
  declarations: [CpfPipe, PhonePipe, MaskDirective],
  imports: [CommonModule, MaterialModule, ComponentsModule],
  exports: [
    MaterialModule,
    ComponentsModule,
    CpfPipe,
    PhonePipe,
    MaskDirective,
  ],
})
export class SharedModule {}
