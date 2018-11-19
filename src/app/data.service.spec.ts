import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { DataService } from './data.service';
import { of } from 'rxjs/observable/of';

describe('DataService', () => { 

  let data: DataService;
  let httpClientSpy: { get: jasmine.Spy }; 

  beforeEach(() => {
 
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    data = new DataService(<any> httpClientSpy);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpTestingController],
      providers: [DataService]
    });
  });

  it('should return expected categories (HttpClient called once)', () => {
   //Arrange
    const categories =  [{name : "Arts & Culture", sort_name: "Arts & Culture",
                              id: 1, shortname: "Arts"},
                              {name: "Book Clubs",sort_name: "Book Clubs",
                              id: 18, shortname: "Book Clubs" 
                            }] 
    //Act      
    httpClientSpy.get.and.returnValue(of(categories));
   
    //Assert
    data.getCategories().subscribe(
      res => expect(res).toEqual(categories, 'expected categories'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected group (HttpClient called once)', () => {
    //Arrange
     const group = [{city: "Johannesburg",country: "ZA",created: 1538291778000,
                          description: "Anyone who loves reading and appreciates the value of literature.",
                          id: 29999893, join_mode: "open", lat: -26.19,
                          link: "https://www.meetup.com/meetup-group-JytYsBrC/",
                          localized_country_name: "South Africa",
                          localized_location: "Johannesburg, South Africa",lon: 28.04,
                          members: 50}]
     //Act      
     httpClientSpy.get.and.returnValue(of(group));
    
     //Assert
     data.allGroups().subscribe(
       res => expect(res).toEqual(group, 'expected categories'),
       fail
     );
     expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
   });

})
 