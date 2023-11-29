import { Component, OnInit, Input } from '@angular/core';

// closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in API calls created in fetch-api0data0service.ts (EX 6.2)
import { FetchApiDataService } from '../fetch-api-data.service';

// displays notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';


/**
 * Component that provides user registration functionalities.
 * 
 * @component
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Input data for the user registration.
   */
  @Input() loginData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructor for the UserRegistrationFormComponent.
   * 
   * @param fetchApiData Service to handle the API calls.
   * @param dialogRef Reference to the dialog opened.
   * @param snackBar For showing notifications to the user.
   */
constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

/**
* Lifecycle hook that is called after data-bound properties are initialized.
*/
ngOnInit(): void {
}

/**
* Register a new user by sending the user data to the backend.
*/
registerUser(): void {
    this.fetchApiData.userRegistration(this.loginData).subscribe((response) => {
  // Logic for successful user registration
     this.dialogRef.close(); // This will close the modal on success!
     console.log(response)
     this.snackBar.open(response, 'OK', {
        duration: 2000
     });
    }, (response) => {
      console.log(response)
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

  }