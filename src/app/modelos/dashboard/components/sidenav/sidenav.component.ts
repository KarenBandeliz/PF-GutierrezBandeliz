import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  opened: boolean = false;
  public role: any;
  public menuItems: Menu[]=[];
  constructor(private $menuService: MenuService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadMenu();
  
 
  }
  loadMenu(){
    this.authService.role?.admin ? this.role = true : this.role = false;
    this.authService.getUserById(this.authService.userExist?.uid).subscribe(user => {
      this.$menuService.getSideNavMenuOptions().subscribe((options) => {
        if(user.role?.user){
          this.menuItems = options.filter(menu => menu.auth?.user ===  true ) 
        
        }else if(user.role?.admin){
          this.menuItems = options
        }
      })
    })
  }

  logOutUser(): void {
    this.authService.logout();
  }
}
