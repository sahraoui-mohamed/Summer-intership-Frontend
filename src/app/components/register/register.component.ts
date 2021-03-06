import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';
import { Conseiller } from 'src/app/models/conseiller';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  message= "";
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private _registerService:RegisterService, private router: Router) {
    
    let formControls = {
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z][^0-9#&<>\"~;$^%{}?]{1,20}$')
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z][^0-9#&<>\"~;$^%{}?]{1,20}$')
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$')
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(8),
        Validators.maxLength(13)
      ]),
      cin: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(8),
        Validators.maxLength(8)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      repassword: new FormControl('', [
        Validators.required,
      ]),

    }

    this.registerForm = fb.group(formControls);
  }

  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get cin() { return this.registerForm.get('cin'); }
  get address() { return this.registerForm.get('address'); }
  get phone() { return this.registerForm.get('phone'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get repassword() { return this.registerForm.get('repassword'); }


  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm.value);
    let data = this.registerForm.value;
    let student = new Conseiller(data.firstname,data.lastname,data.address,data.phone,data.email,data.cin,data.password);
    
    this._registerService.registerConseiller(student).subscribe(
      result => {
        console.log(result);
        let data1 = result;
        if(data1.token != "error"){
          console.log("bien");
          this.message= "Succeed";
          this.router.navigate(['/']);
        }else{
          console.log("non");
          this.message= "Email is already exist";
        }
        
      }
      ,
      error => console.log(error)
    )
  }
}
