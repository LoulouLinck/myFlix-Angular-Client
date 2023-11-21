import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

ngOnInit(): void {
  this.getMovies();
}

//gets all movies
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}
  // opens genres-info component
  openGenreInfo(Genres: any[]): void {
    console.log('Genre Object:', Genre);
    this.dialog.open(GenreInfoComponent, {
      data: {
        Genre: Genre.Name,
        Description: Genre.Description
      }
    });
  }

    // opens director-info component
