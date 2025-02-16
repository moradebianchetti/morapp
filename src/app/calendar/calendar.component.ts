import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/es';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('es');

interface CalendarDay {
  date: dayjs.Dayjs;
  isCurrentMonth: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentMonth!: string;
  weeks: CalendarDay[][] = [];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const today = dayjs(); // Tomamos la fecha actual
    this.currentMonth = today.format('MMMM YYYY');
  
    const startOfMonth = today.startOf('month'); // Primer día del mes
    const firstDayOfWeek = startOfMonth.day(); // Día de la semana (0=Domingo, 1=Lunes, ..., 6=Sábado)
  
    let startOfCalendar = startOfMonth.subtract(firstDayOfWeek, 'day'); // Retrocedemos para el inicio correcto
  
    this.weeks = [];
    let day = startOfCalendar;
  
    while (this.weeks.length < 6) { // Máximo 6 filas en un mes
      let week: CalendarDay[] = [];
  
      for (let i = 0; i < 7; i++) {
        week.push({
          date: day,
          isCurrentMonth: day.month() === today.month(),
        });
        day = day.add(1, 'day');
      }
  
      this.weeks.push(week);
  
      // Si la última semana ya no tiene días del mes actual, salir del bucle
      if (day.month() !== today.month() && this.weeks.length >= 4) break;
    }
  }
  
}
