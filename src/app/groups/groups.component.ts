import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: any;
  categoryName: string;
  pageTitle: string;
  
  constructor(private _data: DataService ) { 
  }

  ngOnInit() {
    this.categoryName = this._data.categoryName;
    if(this.categoryName){
      this._data.findGroups().subscribe( res => {
        console.log(res);
        this.groups = res; 
        this.groups = this.groups.filter(val => {return val.city === "Johannesburg"});
        this.groups.forEach(element => {
        element.description = element.description.replace(/<\/?[^>]+(>|$)/g, ""); // replace regex copied from stackoverflow.com to remove html tags in description.
        }); 
      });
    }else{
      this._data.allGroups().subscribe(res =>{
        this.groups = res; 
        this.groups = this.groups.filter(val => {return val.city === "Johannesburg"});
        this.groups.forEach(element => {
        element.description = element.description.replace(/<\/?[^>]+(>|$)/g, ""); // replace regex copied from stackoverflow.com to remove html tags in description.
        }); 
      })
    }
    this.pageTitle = this.categoryName || "All Groups";
  }

}
