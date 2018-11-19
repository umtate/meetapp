import { Component, OnInit } from '@angular/core';
import {DataService } from './../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'] 
})
export class SettingsComponent implements OnInit {

    categories = [];
    constructor(private _data: DataService, private _router: Router ){
    }

  ngOnInit() { 
    this.categories = JSON.parse(localStorage['category']);
  }

  selectedCategory(category){
    console.log(category.id);
    this._data.categoryId = category.id;
    this._data.categoryName = category.name;
    this._router.navigate(['group']);
  }
}
