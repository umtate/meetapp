import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { DataService } from './data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';

describe('AppComponent', () => {
  let test = ['test','test2','test3'];
 
  const dataService =jasmine.createSpyObj('DataService', ['getCategories']);

  let getCategoriesSpy = dataService.getCategories.and.returnValue(of(test));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[RouterTestingModule],
      providers: [{provide: DataService, useValue: dataService}]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
}); 
