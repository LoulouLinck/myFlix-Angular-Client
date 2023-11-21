import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService,
              public snackbar: MatSnackBar,
              public dialog: MatDialog) { }

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
    openDirectorInfo(Director: any): void {
      console.log('Director Object:', Director);
      this.dialog.open(DirectorInfoComponent, {
        data: {
          Name: Director.Name,
          Bio: Director.Bio,
          Birth: Director.Birth
        }
      });
    }
  
      // opens movie-info component
  openMovieInfo(Title: string, Description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        Title: Title,
        Description: Description
      }
    });
  }
}