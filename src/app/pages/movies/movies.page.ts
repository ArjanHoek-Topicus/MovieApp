import { Component, OnInit } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  LoadingController,
} from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  public movies: any[] = [];
  private currentPage = 1;
  baseUrl = environment.images;

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

    this.movieService
      .getTopRatedMovies(this.currentPage)
      .subscribe(({ results, total_pages }) => {
        loading.dismiss();

        this.movies.push(...results);

        event?.target.complete();

        if (event) {
          event.target.disabled = total_pages === this.currentPage;
        }
      });
  }

  public loadMore(event: any) {
    this.currentPage++;
    this.loadMovies(event as InfiniteScrollCustomEvent);
  }
}
