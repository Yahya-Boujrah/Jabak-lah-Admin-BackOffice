import { Component, OnInit } from '@angular/core';
import { CustomResponse } from 'src/app/interfaces/Custom-response';
import { AdminService } from 'src/app/services/Admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  adminResponse!: CustomResponse;

  constructor(private adminService:AdminService){}

  ngOnInit(): void {
    this.adminService.admins$.subscribe(response => {
      this.adminResponse = response;
    })
  }

}
