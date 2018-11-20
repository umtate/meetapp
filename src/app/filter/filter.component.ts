import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  groupCategories = [];
  pageTitle: string;
  group= [];
  checkedList = [];
  groupShare = [];
  filter: boolean = false;

  constructor(private _data: DataService) { }

  ngOnInit() {
    this.pageTitle = this._data.categoryName;
    
  }
  ngDoCheck(): void {
    this.groupCategories = [...this._data.groupCategories]; // create a clone of groupCategories[]
    if(this._data.group !== undefined) this.group = [...this._data.group]; // create a clone of group[]
  }

  //populate Array checkedList with categories that are to be filterd 
  filterGroup(event, category){
    this._data.filter = true;
    if(event.target.checked){
      this.checkedList.push(category)
    }else{
      this.checkedList.splice(this.checkedList.indexOf(category),1);
    }

    //set _data.groupShare from array with filtered catergories
    this._data.groupShare = this.group.filter(val =>{
      for(let i=0;i<this.checkedList.length;i++){
        if(val.category.shortname === this.checkedList[i] && val.city === "Johannesburg"){
          return val;
        }
      }
    });
  }

}
