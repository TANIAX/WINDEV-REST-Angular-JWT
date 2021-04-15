import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    m_sLogin: new FormControl(null, [Validators.required]),
    m_sMotDePasse: new FormControl(null, [Validators.required]),
  });
  error:string = "";

  constructor(private userService : UsersService, private router : Router) {
    this.loginForm.setValue({
      'm_sLogin': '',
      'm_sMotDePasse': ''
    });
   }

  submit() {
    if(!this.loginForm.valid)
      return;

    this.userService.userAuthentication(this.loginForm.value).subscribe((response : any) =>{
      localStorage.setItem('userToken', response.Authorization);
      this.router.navigate(['Client']);
    },error =>{
      this.error = error.error?.fault?.faultstring;
    })
  }
  closeError(){
    this.error = "";
  }
}
