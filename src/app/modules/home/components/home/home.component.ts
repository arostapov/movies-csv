import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {filter, takeUntil, tap} from "rxjs/operators";
import {HomeQueryParams} from "../../../../core/models/home-query-params.model";
import {Movie} from "../../../../core/models/movie.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private searchValueSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public movies: Array<Movie> = [];
  public totalResults: number = 0;
  public success: boolean = true;
  constructor(private readonly searchService: SearchService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.initFromQueryParams(this.route.snapshot.queryParams);
    this.searchHandler();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private initFromQueryParams(queryParams: HomeQueryParams): void {
    const params = queryParams;
    this.searchValue = decodeURI(params?.search ?? '');
  }

  private searchHandler(): void {
    this.search$
      .pipe(
        filter(value => {
          if (!value) {
            this.resetMovies();
          }
          return !!value;
        }),
        takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.search();
      });
  }

  public get search$(): Observable<string> {
    return this.searchValueSubject.asObservable();
  }

  public get encodedSearchValue(): string {
    return this.searchValueSubject.value;
  }

  public get searchValue(): string {
    return decodeURI(this.searchValueSubject.value);
  }

  public set searchValue(value: string) {
    this.searchValueSubject.next(encodeURI(value.trim()));
  }

  public search(): void {
    this.searchService.findTheMovies(this.searchValue)
      .pipe(tap(result => console.log(result)))
      .subscribe(result => {
        this.movies = result?.Search ?? [];
        this.totalResults = +result?.totalResults ?? 0;
        this.success = result.Response === 'True';

        if (this.success) {
          this.searchService.saveMovies(this.movies, this.searchValue);
        }

        this.router.navigate([], { queryParams: { search: this.encodedSearchValue } });
      });
  }

  private resetMovies(): void {
    this.movies = [];
    this.totalResults = 0;
    this.success = true;
    this.router.navigate([], { queryParams: { search: '' } });
  }
}
