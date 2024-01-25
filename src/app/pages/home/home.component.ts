import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { League } from '../../interfaces/league.interface';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LeagueService } from '../../services/league.service';
import { AddLeagueComponent } from './add-league/add-league.component';
import { EditLeagueComponent } from './edit-league/edit-league.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {

  public leagues: League[] = [];
  public modalService = inject(NgbModal);

  constructor( public leagueService: LeagueService, public config: NgbModalConfig ){
    this.leagueService.getListLeagues().subscribe(
      (response) => {
        this.leagues = response
      }
    )
  }

  deleteLeague(id: number): void{
    this.leagueService.deleteLeagues(id).subscribe(
      {
        next: (res) => {
          this.leagues = this.leagues.filter(league => league.id !== id );
          console.log(res)
        },
        error: (err) => console.log(err)
      }
    )
  }

  //Per obrir el modal:

  createLeague(){
    this.modalService.open(AddLeagueComponent);

  }

  editLeague(){
    this.modalService.open(EditLeagueComponent);
  }





}










