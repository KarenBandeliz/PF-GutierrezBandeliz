import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user : any;
  public role: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserState().subscribe(u => {
      this.user = u;
    })
  }
  
}
