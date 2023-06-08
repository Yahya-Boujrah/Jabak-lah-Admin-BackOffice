import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomResponse } from 'src/app/interfaces/Custom-response';
import { AdminService } from 'src/app/services/Admin.service';

import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent {

  pwdResponse!: CustomResponse;

  constructor(private adminService: AdminService, private router:Router, private toast: NgToastService){}

  changePwd(form : NgForm){

    if(form.value.newPassword === form.value.confirmPassword){
      this.adminService.changePassword$(form.value).subscribe(response =>{
        this.pwdResponse = response;
        this.toast.success({ detail: 'Success', summary: 'Passowrd changed successfully', position: 'tr', duration: 2500 });

      })
    }
    form.reset();
    
    sessionStorage.removeItem('token');
    this.router.navigate(['']);

  }
}
