import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse ,faUserGroup, faPeopleGroup, faBook, faLock , faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  faHouse = faHouse;
  faUserGroup = faUserGroup;
  faPeopleGroup=faPeopleGroup;
  faBook = faBook;
  faLock = faLock;
  faRightFromBracket= faRightFromBracket;
  
  constructor(private route:ActivatedRoute, private router:Router) {}

  home(){
    this.router.navigate(['navigation']);
  }

  agents(){
      this.router.navigate(['agents'], {relativeTo: this.route});
  }
  clients(){
    this.router.navigate(['clients'], {relativeTo: this.route});
  }

  info(){
    this.router.navigate(['info'], {relativeTo: this.route});
  }

  changePwd(){
    this.router.navigate(['change-pwd'], {relativeTo: this.route});
  }

  logout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
