import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { empty, Observable} from "rxjs";
import { environment } from "../../../../environments/environment";
import { Movies } from "../../../core/models/movies.model";
import { expand, map, reduce } from "rxjs/operators";

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  public findTheMovies(searchText: string): Observable<Movies> {
    const limit = 10;
    let page = 1;
    return this.findTheMovie(searchText)
      .pipe(
        map(data => {
          if (data?.totalResults) {
            return data;
          }
          data.totalResults = 0;
          return data;
        }),
        expand((data: Movies) => {
          return page * limit <= data.totalResults ? this.findTheMovie(searchText, ++page) : empty();
        }),
        reduce(((acc, value) => {
          acc.Search = acc.Search.concat(value.Search);
          return acc;
        })),
      );
  }

  public findTheMovie(searchText: string, page: number = 1): Observable<Movies> {
    const options = {
      params: new HttpParams()
        .append('apikey', environment.apiKey)
        .append('s', searchText)
        .append('type', 'movie')
        .append('page', page),
    };
    return this.http.get<Movies>(`${environment.apiUrl}`, options);
  }
}
