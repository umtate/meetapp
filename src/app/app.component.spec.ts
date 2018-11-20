import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent} from './navbar/navbar.component';



describe('AppComponent', () => {
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent
      ],
      imports:[RouterTestingModule, RouterModule],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
}); 
