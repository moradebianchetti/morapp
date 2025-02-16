import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule], // 👈 Asegura que está importado
  exports: [CalendarComponent]
})
export class CalendarModule {}
