import { Component, OnInit } from '@angular/core';
  import { AuthService } from '@eshop/users';
  import { Router } from '@angular/router';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
 })
export class SidebarComponent implements OnInit {
  isAdmin: boolean;

  constructor(private authService :AuthService,  private router: Router
    ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getAdminStatus();

  }
  logoutUser() { 
    this.authService.logout();

 


}
}
