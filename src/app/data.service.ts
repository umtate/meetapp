import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Category } from '../interfaces/category';

@Injectable()
export class DataService {

  private baseUrl = environment.baseUrl
  public categoryId: string;
  public categoryName: string;
  private key = environment.key;
  public groupCategories = [];
  public group: any;
  public groupShare = [];
  public filter: boolean;
  
  constructor(private http: HttpClient ) { }
  
  getCategories() {
    let params = new HttpParams().set("key",this.key).set("sign","true")
    const url = this.baseUrl+"/2/categories";
    return this.http.get<Category[]>(url, {params: params}).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );;
  }

  findGroups() {
    let params = new HttpParams().set("key",this.key)
                    .set("sign","true").set("country", "ZA")
                    .set("category",this.categoryId);
    const url = this.baseUrl + "/find/groups";
    return this.http.get(url, {params: params}).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );;
  }

  allGroups() {
    let params = new HttpParams().set("key",this.key)
                    .set("sign","true").set("country", "ZA")
    const url = this.baseUrl + "/find/groups";
    return this.http.get(url, {params: params}).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return Observable.throw(`An error occurred:, ${error.error.message}`)
    } 
    if(error.status === 400){
      return Observable.throw(`An error ${error.status} occurred. Please refine your search and try again`);
    }
    if(error.status === 401){
      return Observable.throw(`You are not authorised to send this request`);
    }
    if (error.status === 429){
      return Observable.throw(`too many requests occurred, take it easy`);
    }
    if(error.status === 500){
      return Observable.throw(`Oops error ${error.status} occurred.`);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, `+`body was: ${error}`);
      return Observable.throw ('Something bad happened; please try again later.');
    }    
  };

}
