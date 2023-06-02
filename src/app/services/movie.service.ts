import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, from, map, of, tap } from 'rxjs';
import { environment as env, environment } from 'src/environments/environment';
import { IMoviesResult } from '../models/IMoviesResult';
import { IMovieDetailsResult } from '../models/IMovieDetailsResult';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getTopRatedMovies(page = 1): Observable<IMoviesResult> {
    return this.http
      .get<IMoviesResult>(
        `${env.baseUrl}/movie/popular?api_key=${env.apiKey}&page=${page}`
      )
      .pipe(
        map((data) => ({
          ...data,
          results: data.results.map((movie) => ({
            ...movie,
            image_path: `${environment.images}/w92${movie.poster_path}`,
          })),
        }))
      );
  }

  getMovieDetails(id: string): Observable<IMovieDetailsResult> {
    return this.http
      .get<IMovieDetailsResult>(
        `${env.baseUrl}/movie/${id}?api_key=${env.apiKey}`
      )
      .pipe(
        map((movie) => ({
          ...movie,
          image_path: `${environment.images}/w400${movie.poster_path}`,
        }))
      );
  }
}
