import { Component, Input, NgModuleRef, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from '../../../services/calendar.service';
import { CommonModule } from '@angular/common';
import { MyCalendar } from '../../../interfaces/calendar.interface';
import { EventClickArg, EventInput } from '@fullcalendar/core';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.scss'
})


export class EditEventComponent implements OnInit {

  @Input() eventInfo!: EventClickArg;

  activeModal = inject(NgbActiveModal);

  public event: MyCalendar[] = [];
  public formChanged: boolean = false;


  calendarForm: FormGroup;

  constructor(public calendarService: CalendarService){
    this.calendarForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      start:  new FormControl('', [Validators.required]),
      location:  new FormControl('', [Validators.required]),

    });
  }

  ngOnInit(): void {
    this.resetForm();
    if (this.eventInfo) {
      console.log(this.eventInfo.event.id); // Ejemplo de acceso seguro
    }
  }

  resetForm(){
    this.calendarForm.reset(this.event);

  }

  editEvent(){
    if(this.calendarForm.valid){
      const formValues = this.calendarForm.value;
      const editedEvent: MyCalendar = {
        id: Number(this.eventInfo.event.id) ,
        title: formValues.title!,
        start:  formValues.start!,
        location: formValues.location!,

      }

      console.log(editedEvent),

      this.calendarService.updateEvent(editedEvent).subscribe(
        {
          next: (editedEvent: any) => {
            this.activeModal.close(editedEvent);
            console.log(editedEvent)
          },
          error: (err) => console.log(err)
        }
      )
    }
  }

  closeEdit(){
    this.activeModal.close(this.editEvent)
  }

}
