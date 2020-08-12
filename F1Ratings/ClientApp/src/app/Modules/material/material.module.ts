import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    DragDropModule
  ],
  exports: [
    MatTableModule,
    DragDropModule
  ]
})
export class MaterialModule { }
