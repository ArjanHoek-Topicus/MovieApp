import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { BehaviorSubject, Observable, map, merge, of, tap } from 'rxjs';
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

  constructor(
    private movieService: MovieService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });

    loading.present();

    const handleLoading = ({ total_pages }: IMoviesResult) => {
      loading.dismiss();
      if (event) {
        event.target.complete();
        event.target.disabled = total_pages === this.currentPageSubject.value;
      }
    };

    this.movieService
      .getTopRatedMovies(this.currentPageSubject.value)
      .pipe(tap(handleLoading))
      .subscribe((data) => {
        this.moviesSubject.next([...this.moviesSubject.value, ...data.results]);
      });
  }

  public loadMore(event: any) {
    this.currentPageSubject.next(this.currentPageSubject.value + 1);
    this.loadMovies(event as InfiniteScrollCustomEvent);
  }
}
