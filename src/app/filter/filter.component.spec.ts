import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../data.service';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async(() => {
    const dataService =jasmine.createSpyObj('DataService', ['categoryName','groupCategories','group','filter','groupShare']);

    TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      providers: [{provide: DataService, useValue: dataService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
