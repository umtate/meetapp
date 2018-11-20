import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  group: any;
  categoryName: string;
  pageTitle: string;
  spinner: boolean = true;
  noGroups: boolean = false;
  errorMessage: any;
  errorOccured: boolean = false;
  
  constructor(private _data: DataService ) { 
  }

  //onInit set the fetch data via the API and set to group[] if no category is specified fetch all groups
  ngOnInit() {
    this.categoryName = this._data.categoryName;
    if(this.categoryName){// If user has chosen a category then fecth the groups in that category
      this._data.findGroups().subscribe( 
          res => {
          let tempArray = [];
          this.group = res; 
          this._data.group = res;
          this.group = this.group.filter(val => {return val.city === "Johannesburg"});//filter for groups in Johannesburg Only
          this.group.forEach(element => {
            tempArray.push(element.category.shortname);
            element.description = element.description.replace(/<\/?[^>]+(>|$)/g, ""); // replace regex copied from stackoverflow.com to remove html tags in description.
          }); 
          if(this.group.length === 0) this.noGroups = true;//if groups.length === 0 then there are groups in the category
          this._data.groupCategories = Array.from(new Set(tempArray));
          this.spinner = false;
        },
          err =>{             
            this.errorMessage = JSON.stringify(err);
            this.spinner = false;
            this.errorOccured = true;
            console.error(err);
          }
      ); 
    }else{ // if user has not chosen a category fecth all groups
      this._data.allGroups().subscribe(res =>{
          this.group = res; 
          this.group = this.group.filter(val => {return val.city === "Johannesburg"});//filter for groups in Johannesburg Only
          this.group.forEach(element => {
          element.description = element.description.replace(/<\/?[^>]+(>|$)/g, ""); // replace regex copied from stackoverflow.com to remove html tags in description.
          }); 
          if(this.group.length === 0) this.noGroups = true;//if groups.length === 0 then there are groups in the category
          this.spinner = false;
        },
        err =>{ 
          this.errorMessage = JSON.stringify(err);
          this.spinner = false;
          this.errorOccured = true;
          console.error();
        }
      )
    }
     this.pageTitle = this.categoryName || "All Groups";
  }

  //onDocheck if user has used filters and change group[]
  ngDoCheck(){
    if(this._data.filter){
      this.group = this._data.groupShare;
      this._data.filter = false;
    }
    
  }

}
