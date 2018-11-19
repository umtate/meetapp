import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatListModule} from '@angular/material/list';

import { SettingsComponent } from './settings.component';
import { of } from 'rxjs/observable/of';
import { DataService } from '../data.service';
import { from } from 'rxjs/observable/from';
import { Router } from '@angular/router';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    
    localStorage['category'] = JSON.stringify([{name : "Arts & Culture", sort_name: "Arts & Culture",
    id: 1, shortname: "Arts"},{name: "Book Clubs",sort_name: "Book Clubs",id: 18, shortname: "Book Clubs" 
  }])
 
    const dataService =jasmine.createSpyObj('DataService', ['categoryId','categoryName']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({ 
      declarations: [ SettingsComponent ],
      imports: [ MatListModule ],
      providers: [{provide: DataService, useValue: dataService}, {provide: Router, useValue: routerSpy} ]
      
    })
    .compileComponents();
  })); 

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('expect categories to not be unidentified', () => {
    expect(component).toBeTruthy();
  });

  it('expect categories to be defined', ()=>{
    expect(component.categories).toBeDefined();
  });

  it('expect categories to be length of 2', ()=>{
    expect(component.categories.length).toEqual(2);
  })
}); 
 