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
    spinner: boolean = true;
    constructor(private _data: DataService, private _router: Router ){
    }

  ngOnInit() { 
    //check if localstorage is populated then pass value to categories[]
    if(!localStorage['category']){
      this._data.getCategories().subscribe(res => {
        console.log(res);
        localStorage['category'] = JSON.stringify(res['results']);
        this.categories = JSON.parse(localStorage['category']);
        this.spinner = false
      })
    }else{
      this.categories = JSON.parse(localStorage['category']);
      this.spinner = false
    }
    this._data.groupShare = []; // set groupShare property to [] to set up for new request
    this._data.groupCategories = []; // set groupCategories property to [] to set up for new request
  }

  selectedCategory(category){
    //console.log(category.id);
    this._data.categoryId = category.id; //set ID in data Service
    this._data.categoryName = category.name; //set name in data Service
    this._router.navigate(['group']);
  }
}
