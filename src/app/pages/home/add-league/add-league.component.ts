import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { League } from '../../../interfaces/league.interface';
import { LeagueService } from '../../../services/league.service';



@Component({
  selector: 'app-add-league',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,  ],
  templateUrl: './add-league.component.html',
  styleUrl: './add-league.component.scss'
})


export class AddLeagueComponent  {

  activeModal  = inject(NgbActiveModal);

  @Input() league: League[] = [];

  leagueForm = new FormGroup({
    name: new FormControl (''),
    sport: new FormControl (''),
    category: new FormControl (''),
    location: new FormControl ('')

  });

  constructor(public leagueService: LeagueService){}


  createLeague(){
    if(this.leagueForm.valid){

      const formValues = this.leagueForm.value;
      const newLeague: any = {
        name: formValues.name!,
        sport: formValues.sport!,
        category: formValues.category!,

      }

      this.leagueService.addLeague(newLeague).subscribe(
        {
          next: (createdLeague: any) => {
            this.activeModal.close(createdLeague)
          },
          error: (err) => console.log(err)
        }
      )
    }
  }

}
