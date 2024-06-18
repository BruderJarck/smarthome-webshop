import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ANGULAR_MATERIAL_MODULES } from '../libs/angular-material.iports';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...ANGULAR_MATERIAL_MODULES,
  ],
})
export class SharedModule { }
