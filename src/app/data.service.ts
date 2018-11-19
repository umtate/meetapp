import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class DataService {

  private baseUrl = "https://cors-anywhere.herokuapp.com/api.meetup.com"
  public categoryId: string;
  public categoryName: string;
  
  constructor(private http: HttpClient ) { }
  
  getCategories(){
    let params = new HttpParams().set("key","102338591a3e384c625012f2374a4a").set("sign", "true")
    const url = "https://cors-anywhere.herokuapp.com/api.meetup.com/2/categories";
    return this.http.get(url, {params: params}).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );;
  }

  findGroups(){
    let params = new HttpParams().set("key","102338591a3e384c625012f2374a4a")
                    .set("sign","true").set("country", "ZA")
                    .set("category",this.categoryId);
    const url = this.baseUrl + "/find/groups";
    return this.http.get(url, {params: params}).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );;
  }

  allGroups(){
    let params = new HttpParams().set("key","102338591a3e384c625012f2374a4a")
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
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error}`);
    }
    // return an observable with a user-facing error message
    return Observable.throw ('Something bad happened; please try again later.');
  };

}
