import { Component, OnInit, inject } from '@angular/core';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { CalendarService } from '../../services/calendar.service';
import { AddEventComponent } from './add-event/add-event.component';
import listPlugin from '@fullcalendar/list';
import { EditEventComponent } from './edit-event/edit-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent implements OnInit {



  public modalService = inject(NgbModal);

  calendarOptions: CalendarOptions = {
    plugins: [ listPlugin ],
    initialView: 'listWeek',
    events: [],

    eventClick: (info) => {
      this.updateMatch(info);
    }
  }



  constructor(public calendarService: CalendarService, public config: NgbModalConfig){}

  ngOnInit(): void {
    this.showMatches()
  }

  showMatches(){
    this.calendarService.getListEvents().subscribe((calendars) => {
      const events: EventInput[] = calendars.map((calendar) => {
        return {
          //id: calendar.id,
          title: calendar.title!,
          start: calendar.start!,
          location: calendar.location!,
        };
      });

      this.calendarOptions = {
        events: events,
      }

    })
  }

  //Modals new event:

  addMatch(){
    this.modalService.open(AddEventComponent)
  }

  updateMatch(info: EventClickArg): void{
    this.modalService.open(EditEventComponent);

  }



}
