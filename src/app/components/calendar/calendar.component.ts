import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent implements OnInit {


  calendarOptions: CalendarOptions = { initialView: 'dayGridMonth', plugins: [dayGridPlugin] };

  constructor(public calendarService: CalendarService){}

  ngOnInit(): void {
    this.showMatches()
  }

  showMatches(){
    this.calendarService.getListMatches().subscribe((calendars) => {
      const events: EventInput[] = calendars.map((calendar) => {
        return {
          //id: calendar.id,
          title: calendar.title,
          start: calendar.start,
          location: calendar.location
        };
      });

      this.calendarOptions = {
        events: events,
      }

    })
  }



}
