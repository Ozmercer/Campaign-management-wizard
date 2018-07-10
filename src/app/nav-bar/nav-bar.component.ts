import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  loggedinUser = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.userLogged.subscribe(isLogged => {
      this.loggedinUser = isLogged;
    });
  }

  onLogout() {
    this.authService.userLogged.next(false);
    this.router.navigate(["/"]);
  }
}
