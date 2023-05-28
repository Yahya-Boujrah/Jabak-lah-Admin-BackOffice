import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/interfaces/Admin.interface';
import { AdminService } from 'src/app/services/Admin.service';
import { LoginService } from 'src/app/services/Login.service';

@Component({
  selector: 'app-admin-infos',
  templateUrl: './admin-infos.component.html',
  styleUrls: ['./admin-infos.component.css']
})
export class AdminInfosComponent implements OnInit{

  constructor(private adminService: AdminService){}

  admin ?: Admin;

  ngOnInit(): void {
    this.adminService.admin$.subscribe(result => {
      this.admin = result.data.admin;
    })
  }

  
}
