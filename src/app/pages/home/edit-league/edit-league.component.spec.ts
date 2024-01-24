import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeagueComponent } from './edit-league.component';

describe('EditLeagueComponent', () => {
  let component: EditLeagueComponent;
  let fixture: ComponentFixture<EditLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLeagueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
