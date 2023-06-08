import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/Login.service';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authToken !: string;

  constructor(private authService: LoginService, private route: ActivatedRoute, private router: Router, private toast: NgToastService) { }

  login(form: NgForm) {
    const username = form.value.username.concat(":ADMIN");
    const password = form.value.password;

    console.log(username);

    this.authService.authenticate(username, password).subscribe(response => {
      if (response) {
        this.authToken = response.token;
        sessionStorage.setItem('token', this.authToken);

        this.toast.success({ detail: 'Success', summary: 'Logged in successfully', position: 'tr', duration: 3000 });
        this.router.navigate(['navigation']);

      } else {
        alert("Authentication failed");
        form.reset();
      }
    }, error => {
      this.toast.error({ detail: 'Error', summary: 'Something gone wrong', position: 'tr', duration: 3000 });
      form.reset();
    }
    )
  }
}
