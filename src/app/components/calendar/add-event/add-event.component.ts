import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Calendar } from '@fullcalendar/core';
import { NgbActiveModal, NgbDatepicker, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';


import { CalendarService } from '../../../services/calendar.service';


@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbDatepicker, NgbTimepicker ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {

activeModal = inject(NgbActiveModal);

  @Input() calendar: Calendar[] = [];


  calendarForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    start:  new FormControl('', [Validators.required]),
    location:  new FormControl('', [Validators.required]),


  });

  constructor(public calendarService: CalendarService){}


  addEvent(){
    if(this.calendarForm.valid){
      const formValues = this.calendarForm.value;
      const newEvent: any = {
        title: formValues.title,
        start: formValues.start,
        location: formValues.location,

      }

      this.calendarService.postEvent(newEvent).subscribe(
        {
          next: (createdEvent: any) => {
            this.activeModal.close(createdEvent);
            console.log(createdEvent)
          },
          error: (err) => console.log(err)
        }
      )
    }
  }

  closeEvent(){
    this.activeModal.close(this.addEvent);
  }


}
