import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IMovieDetailsResult } from 'src/app/models/IMovieDetailsResult';
import { IMoviesResult } from 'src/app/models/IMoviesResult';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  private moviesSubject = new BehaviorSubject<IMovieDetailsResult[]>([]);
  public movies$: Observable<any[]> = this.moviesSubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(1);

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.movieService
      .getTopRatedMovies(this.currentPageSubject.value)
      .pipe(handleLoading(this.currentPageSubject.value, event))
      .subscribe((data) => {
        this.moviesSubject.next([...this.moviesSubject.value, ...data.results]);
      });
  }

  public loadMore(event: any) {
    this.currentPageSubject.next(this.currentPageSubject.value + 1);
    this.loadMovies(event as InfiniteScrollCustomEvent);
  }
}

export const handleLoading =
  (currentPage: number, event?: InfiniteScrollCustomEvent) =>
  (obs$: Observable<IMoviesResult>) => {
    return obs$.pipe(
      tap((val) => {
        if (event) {
          event.target.complete();
          event.target.disabled = val.total_pages === currentPage;
        }
      })
    );
  };
