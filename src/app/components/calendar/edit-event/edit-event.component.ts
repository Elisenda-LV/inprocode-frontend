import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Calendar } from '@fullcalendar/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from '../../../services/calendar.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.scss'
})


export class EditEventComponent implements OnInit {


  activeModal = inject(NgbActiveModal);

  @Input() calendars: Calendar [] = [];

  calendarForm: FormGroup;

  constructor(public calendarService: CalendarService){
    this.calendarForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      start:  new FormControl('', [Validators.required]),
      location:  new FormControl('', [Validators.required]),

    });
  }

  ngOnInit(): void {
    this.resetForm()
  }

  resetForm(){
    this.calendarForm.reset(this.calendars)
  }

  editEvent(){
    if(this.calendarForm.valid){
      const formValues = this.calendarForm.value;
      const newEvent: any = {
        title: formValues.title,
        start: formValues.start,
        location: formValues.location,

      }

      this.calendarService.updateEvent(newEvent).subscribe(
        {
          next: (updatedEvent: any) => {
            this.activeModal.close(updatedEvent);
            console.log(updatedEvent)
          },
          error: (err) => console.log(err)
        }
      )
    }
  }

deleteEvent(): void {
   /*  this.calendarService.deleteEvent(id).subscribe(
      {
        next: (res) => {
          this.calendars = this.calendars.filter(calendar => calendar.id !== id );
          console.log(res)
        },
          error: (err) => console.log(err)
        }
      ) */
  }


  closeEdit(){
    this.activeModal.close(this.editEvent)
  }

}
