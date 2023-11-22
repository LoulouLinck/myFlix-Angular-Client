# 📖 myFlix-Angular-client

> The present repository is the client-side app generated with Angular that connects with a movie database: <a href="https://github.com/LoulouLinck/movie_api">movie_api.</a>
> Together they form <a href="https://cineflixxx.netlify.app/">CineFlix</a>, a responsive single-page application allowing user to find information about movies and bookmark them in a personal list. 

## Objective
Using Angular, build the client-side of an app based on its existing server-side code (REST API and database).

<!-- ![app-screenshot](.//src/components/img/Screenshot_Home_CineFlix.png) -->

## Project Link
**Link to CineFlix App:** 
<br>
**Link to API:** https://github.com/LoulouLinck/movie_api

## 🛠 Built With
Angular CLI version 16.2.10
### Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li>MongoDB (NoSQL database for storing movie and user data)</li>
    <li>Express (Backend framework for creating RESTful APIs and server-side functionalities)</li>
    <li>Angular (Frontend web framework for building the user interface and interactions)</li>
    <li>Node.js (backend JavaScript runtime for running the development server.)</li>
    <br>
    <li>TypeScript (Superset of JavaScript used for developing Angular applications)</li>
     <li>Angular Material: UI component library providing pre-built, customizable UI elements.</li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://pokeapi.co/">MongoDB Atlas Database</a></li>
  </ul>
</details>

 <!-- Features -->

### Key Features 
 
- **Welcome View** with Signup / Login options
- **Allows users to add a movie to their list of favorites**
- User profile view to:
  <ul>
- Update user information
- See their favorite movie list
- Delete their account
 </ul>
 
- List of Movies (fetched from my own API)

- **Movie Views** displaying details on:
  - Director
  - Genre
  - Synopsis
<br>

### Responsive Layout & Accessibility

The app was tested to suit a wide spectrum of devices and with accessibility in mind.

For a clean and usable design Bootstrap was implemented to the app. Thanks to this framework the layout of the library is set with optimal responsivity for a pleasant experience regardless of screen size.

<!-- ## Credits

<a href="https://www.flaticon.com/free-icons/more" title="more icons">More icons created by JessiGue - Flaticon</a>) was used for logoss -->

<!-- GETTING STARTED -->

## 💻 Getting Started 

<br>
`npm install -g @angular/cli@16.2.10`
<br>
Run ng new app-name to create a new app.
Run ng generate component component-name to generate a new component.
<br>
Run `ng serve --open` to prompt Angular build the project and navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.
<br>
Open src/app/app.module.ts and add import { HttpClientModule } from '@angular/common/http';. The HttpClientModule is a simplified API for Angular applications that makes it possible for the client app to communicate with the API or server-side. After the import, add HttpClientModule in the @NgModule imports.

## 👥 Author <a name="authors"></a>

**Laure Lincker**

- GitHub: [@LoulouLinck](https://github.com/LoulouLinck)

This was a solo project guided by tutors and mentors from <a href="https://careerfoundry.com/en/courses/become-a-web-developer/">CareerFoundry.</a>

<p align="right"><a href="#readme-top">back to top</a></p>
