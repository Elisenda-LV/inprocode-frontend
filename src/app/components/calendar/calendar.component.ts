import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar, CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { CalendarService } from '../../services/calendar.service';
import { AddEventComponent } from './add-event/add-event.component';
import listPlugin from '@fullcalendar/list';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyCalendar } from '../../interfaces/calendar.interface';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, ReactiveFormsModule, CommonModule, RouterOutlet ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent implements OnInit {


  public calendar?: Calendar;

  public modalService = inject(NgbModal);

  //Config Full Calendar:
  calendarOptions: CalendarOptions = {
    plugins: [ listPlugin, interactionPlugin, ],
    initialView: 'listWeek',
    events: [],

  };

  public match: MyCalendar[] = [];

  constructor(
    public calendarService: CalendarService,
    public config: NgbModalConfig,
    public changeDetector: ChangeDetectorRef,
  ){}

  ngOnInit(){
    this.calendarService.getListEvents().subscribe((data: MyCalendar[]) => {
      const events: EventInput[] = data.map(event => ({
        id: String(event.id),
        title: event.title,
        start: new Date(event.start),

      }));

      this.calendarOptions.events = events;
      this.calendarOptions.editable = true,
      this.calendarOptions.selectable = true;

      //this.calendarOptions.eventClick = this.handleEventClick.bind(this);
      this.calendarOptions.eventClick = this.handleEventClick.bind(this);

    })

  }

handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Do you want to delete the match '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();

      this.calendarService.deleteEvent(Number(clickInfo.event.id)).subscribe(response => {
        // Handle server response here
      }, error =>  {

        const eventInput: EventInput = {
          id: clickInfo.event.id,
          title: clickInfo.event.title,
          allDay: clickInfo.event.allDay
        };

        clickInfo.view.calendar.addEvent(eventInput);
      });
    }
  }

  addMatch(){
    this.modalService.open(AddEventComponent)
  }

  handleEvents(events: MyCalendar[]) {
    this.match = events;
    this.changeDetector.detectChanges();
  }

  /* showData(info: EventClickArg){
    console.log('Event Info from EventClickArg:', info.event);
    console.log('Event ID from EventClickArg:', info.event.id);

    const modalref = this.modalService.open(EditEventComponent);
    const { id, title, start } = info.event;

    modalref.componentInstance.event = { id: Number(id), title: title, start: start }

  } */

}


