import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://cineflix-sqlk.onrender.com/';

/**
 * Service to fetch data from the API.
 * 
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {

   /**
   * @constructor
   * @param {HttpClient} http - The injected HttpClient.
   * Injects the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   */ 
  constructor(private http: HttpClient) {}

    /**
   * Registers a new user.
   * 
   * @param userDetails - The user details for registration.
   * @returns An Observable of the registration response.
   * Makes API call to user registration endpoint.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs in a user.
   * 
   * @param userDetails - User details for login.
   * @returns an Observable of the login response.
   * Makes API call user login endpoint
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches all movies.
   * @returns an observable with the list of all movies.
   * Makes API call all movies endpoint
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Fetches a movie by title.
   * @param title - Movie title.
   * @returns an observable with the movie details.
   */
  getOneMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + Title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Fetches details of a director by name.
   * @param DirectorName - Director name.
   * @returns an observable with the director details.
   */
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Fetches details of a genre by name.
   * @param GenreName - Genre's name.
   * @returns an observable with the genre details.
   */
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Fetches details of a user by username.
   * @returns an observable with the user details.
   */
  getOneUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Fetches user's favourite movies list.
   * @returns an observable with the list of favourite movies.
   */
  getFavoriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.favoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * Adds a movie to a user's favourite movies list.
   * @param movieId - ID of movie to be added.
   * @returns an observable with the result of the operation.
   */
  addFavoriteMovie(MovieID: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    // user.FavoriteMovies.push(MovieID);
    // localStorage.setItem('user', JSON.stringify(user));
    return this.http
      .post(
        apiUrl + 'users/' + user.Username + '/movies/' + MovieID,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
          responseType: 'text',
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  /**
   * Checkes if a movie is in a user's favourite movies list.
   * @param movieId - ID of the movie to be checked.
   * @returns a boolean indicating if the movie is a favorite.
   */
  isFavoriteMovie(MovieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favoriteMovies.indexOf(MovieID) >= 0;
  }

  /**
   * Updates user's details.
   * @param updatedUser - Updated details of the user.
   * @returns an observable with the result of the operation.
   */
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + user.Username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Deletes a user's account.
   * @returns an observable with the result of the operation.
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + user._id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Removes a movie from a user's list of favourite movies.
   * @param movieId - ID of the movie to be removed.
   * @returns an observable with the result of the operation.
   */
  deleteFavoriteMovie(MovieID: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    const index = user.favoriteMovies.indexOf(MovieID);
    console.log(index);
    if (index > -1) {
      // only splice array when item is found
      user.favoriteMovies.splice(index, 1); // 2nd parameter means remove one item only
    }
    localStorage.setItem('user', JSON.stringify(user));
    return this.http
      .delete(apiUrl + 'users/' + user.Username + '/movies/' + MovieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Extracts data from the response.
   * @param res - Response object.
   * @returns the body of the response.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
  
  /**
   * Handles HTTP errors.
   * 
   * @private
   * @param error - Error response.
   * @returns a thrown error observable.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}