import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { auth } from '../../../node_modules/firebase';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    @Output() logout: EventEmitter<string> = new EventEmitter();
    @Output() showLogin: EventEmitter<boolean> = new EventEmitter();

    loggedinUser = false;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
      this.authService.userLogged.subscribe(
        (isLogged) => {
            this.loggedinUser = isLogged;
        }
      )
  }

  onLogout() {
      this.authService.userLogged.next(false)
      this.router.navigate(['/'])
  }
}
