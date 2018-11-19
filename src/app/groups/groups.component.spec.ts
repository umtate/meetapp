import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from '../spinner/spinner.component';
import { GroupsComponent } from './groups.component';
import { DataService } from '../data.service';

import { RouterTestingModule } from '@angular/router/testing';

import { RouterModule } from '@angular/router';
import { of } from 'rxjs/observable/of';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;
  const test = [{city: "Johannesburg",country: "ZA",created: 1538291778000,
                description: "Anyone who loves reading and appreciates the value of literature.",
                id: 29999893, join_mode: "open", lat: -26.19,
                link: "https://www.meetup.com/meetup-group-JytYsBrC/",
                localized_country_name: "South Africa",
                localized_location: "Johannesburg, South Africa",lon: 28.04,
                members: 50},
                {city: "Johannesburg",country: "ZA",created: 1538291778000,
                description: "Anyone who loves reading and appreciates the value of literature.",
                id: 29999894, join_mode: "open", lat: -26.19,
                link: "https://www.meetup.com/meetup-group-JytYsBrC/",
                localized_country_name: "South Africa",
                localized_location: "Johannesburg, South Africa",lon: 28.04,
                members: 40}]
  let testTile = 'Group';

  const dataService =jasmine.createSpyObj('DataService', ['findGroups', 'allGroups','categoryName']);

  let findGroupsSpy = dataService.findGroups.and.returnValue(of(test));
  let allGroupsSpy = dataService.allGroups.and.returnValue(of(test));
  //let categoryNameSpy = dataService.categoryName.and.returnValue(of(testTile));
  //const spy = spyOnProperty(dataService, 'categoryName', 'get').and.returnValue(testTile);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsComponent, SpinnerComponent ],
      imports: [ RouterModule, RouterTestingModule ],
      providers: [{provide: DataService, useValue: dataService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });

  it('groups array should be defined',()=>{
    expect(component.groups).toBeDefined();
  })

  it('groups array to be 2', ()=>{
    expect(component.groups.length).toEqual(2);    
  });

  it('Spinner should be equal to false', ()=>{
    expect(component.spinner).toEqual(false);
  });

});
