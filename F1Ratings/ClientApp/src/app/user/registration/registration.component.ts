import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  RegistrationForm = this.formBuilder.group({
    UserName: ['', Validators.required ],
    Email: ['', [ Validators.required, Validators.email ]],
  });

  Passwords = this.formBuilder.group({
    Password: ['', [ Validators.required, Validators.minLength(6) ]],
    ConfirmPassword: ['', [ Validators.required ]]
  }, { validator: this.comparePasswords})
  
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private toastr: ToastrService ) { }
  
  ngOnInit() {
  }

  comparePasswords( formGroup: FormGroup ){
    let confirmPasswordControl = formGroup.get('ConfirmPassword');
    
    if ( confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors ) {
      if ( formGroup.get('Password').value != confirmPasswordControl.value ) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      }
      else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  onSubmit(){
    const requestBody = {
      UserName: this.RegistrationForm.controls.UserName.value,
      Email: this.RegistrationForm.controls.Email.value,
      Password: this.Passwords.controls.Password.value
    }
    
    this.userService.registerUser(requestBody).subscribe(
      (res: any) => {
        if (res.succeded) {
          this.RegistrationForm.reset();
          this.Passwords.reset();
          this.toastr.success( "User created", "Success");
        } else {
          res.errors.forEach((element: any) => {
            switch (element.code) {
              case 'DuplicateUserName':
                //Username is already in use
                this.toastr.error( element.description, "Error")
                break;
            
              default:
                //Registration faild
                this.toastr.error( element.description, "Error")
                break;
            }
          });
        }
      },
      err => {}
    );
  }

}
