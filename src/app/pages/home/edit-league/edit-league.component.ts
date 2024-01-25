import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { League } from '../../../interfaces/league.interface';
import { LeagueService } from '../../../services/league.service';



@Component({
  selector: 'app-edit-league',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-league.component.html',
  styleUrl: './edit-league.component.scss'
})


export class EditLeagueComponent implements OnInit {

  activeModal = inject(NgbActiveModal);

  @Input() leagues: League | undefined;

  leagueForm: FormGroup;

  constructor( public leagueService: LeagueService ){
    this.leagueForm = new FormGroup({
      name: new FormControl ('', [Validators.required, Validators.maxLength(15)]),
      sport: new FormControl ('', [Validators.required]),
      category: new FormControl ('', [Validators.required]),
      location: new FormControl ('', [Validators.required, Validators.maxLength(15)]),
    })

  }

  ngOnInit(): void {
    this.resetForm()
  }

  resetForm():void {
    this.leagueForm.reset(this.leagues)
  }

  editLeague(){
    if(this.leagueForm.valid){
      const formValues = this.leagueForm.value;

      console.log(this.leagues);

      const editLeagues: League = {
        id: this.leagues?.id!,
        name: formValues.name,
        sport: formValues.sport,
        category: formValues.category,
        location: formValues.location,
      }

      this.leagueService.updateLeague(editLeagues).subscribe(
        {
          next: () => {
            this.activeModal.close(editLeagues);
          },
          error: (err) => console.log(err)
        }
      );
    }
  }

   //Tancar modal:

   closeEdit(){
    this.activeModal.close(this.editLeague)
  }


}
