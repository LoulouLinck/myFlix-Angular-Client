import { Component, OnInit, Input } from '@angular/core';

// closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in API calls created in fetch-api0data0service.ts (EX 6.2)
import { FetchApiDataService } from '../fetch-api-data.service';

// displays notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

// function responsible for sending form inputs to backend
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
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