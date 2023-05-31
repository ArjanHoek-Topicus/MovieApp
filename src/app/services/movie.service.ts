import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';
import { environment as env } from 'src/environments/environment';

interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getTopRatedMovies(page = 1): Observable<ApiResult> {
    return this.http
      .get<ApiResult>(
        `${env.baseUrl}/movie/popular?api_key=${env.apiKey}&page=${page}`
      )
      .pipe(delay(1000));
  }

  getMovieDetails(id: string) {
    return this.http
      .get(`${env.baseUrl}/movie/${id}?api_key=${env.apiKey}`)
      .pipe(delay(1000));
  }
}
