import { Component } from '@angular/core';
import {DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private _data: DataService){
      if(localStorage['category'] !== null){
        _data.getCategories().subscribe(res => {
          localStorage['category'] = JSON.stringify(res['results']);
        })
      }
       
    }
} 
