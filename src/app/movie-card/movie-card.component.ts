import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

/**
 * A component that represents a movie card.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];

  /**
   * @param fetchApiData - Service to fetch movie data.
   * @param snackbar - Service to show snack bar notifications.
   * @param dialog - Service to open dialogs.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackbar: MatSnackBar,
    public dialog: MatDialog
  ) { }

ngOnInit(): void {
  this.getMovies();
}

  /**
   * Fetches all movies from the API and updates the movies property.
   */
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens a dialog with genre details (genres-info-component).
   * @param genre 
   */
  openGenreInfo(Genres: any): void {
    // console.log('Genre Object:', Genre);
    this.dialog.open(GenreInfoComponent, {
      data: {
        Genre: Genres.Name,
        Description: Genres.Description
      }
    });
  }

  /**
   * Opens a dialog with director details (director-info-component).
   * @param director
   */
    openDirectorInfo(Directors: any): void {
      // console.log('Director Object:', Director);
      this.dialog.open(DirectorInfoComponent, {
        data: {
          Name: Directors.Name,
          Bio: Directors.Bio,
          Birth: Directors.Birth
        }
      });
    }
  
  /**
   * Opens a dialog with movie details (movie-info-component).
   * @param title 
   * @param description 
   */
  openMovieInfo(Title: string, Description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        Title: Title,
        Description: Description
      }
    });
  }

  /**
   * Toggles a movie's favourite status for the user.
   * @param movie - The movie to be added/removed from favourites list.
   */
   toggleFavorite(movie: any): void {
    // toggles the favourite status of the movie
    if (this.isMovieFavorite(movie)) {
      // deletes movie from favorites locally
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.FavoriteMovies = user.FavoriteMovies.filter((id: string) => id !== movie._id);
      localStorage.setItem('user', JSON.stringify(user));

       // removes movie from favourites list on the backend server
       this.fetchApiData.deleteFavoriteMovie(movie._id).subscribe(
        () => {
          console.log('Movie removed from your favourites successfully.');
        },
        (error) => {
          console.error('Error removing movie from your favourites:', error);
        }
      );
    } else {
      // adds movie to favourites locally
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.FavoriteMovies.push(movie._id);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Add movie to favourites in backend
      this.fetchApiData.addFavoriteMovie(movie._id).subscribe(
        () => {
          console.log('Movie added to favorites successfully.');
        },
        (error) => {
          console.error('Error adding movie to favorites:', error);
        }
      );
    }
  
    // updates local 'isFavorite' property
    movie.isFavorite = !this.isMovieFavorite(movie);
  }
  
  /**
   * Checks if a movie is in the user's favorites.
   * @param movie - The movie to check.
   * @returns A boolean indicating if the movie is in favorites.
   */
  isMovieFavorite(movie: any): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies && user.FavoriteMovies.includes(movie._id);
  }
  
}