import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovieDetailsResult } from 'src/app/models/IMovieDetailsResult';
import { MovieService } from 'src/app/services/movie.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage {
  movie!: IMovieDetailsResult;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!.toString();

    this.loadMovie(id);
  }

  async loadMovie(id: string) {
    this.movieService.getMovieDetails(id).subscribe((res) => {
      console.log(res);
      this.movie = res;
    });
  }

  openHomepage() {
    window.open(this.movie.homepage);
  }
}
