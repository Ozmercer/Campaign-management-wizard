import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user = null;
  showLogin = false;
  subscription: Subscription;

  constructor(private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
      firebase.initializeApp({
        apiKey: "AIzaSyAg1jQ4hl5RbxG2TvlJc1MFq8x_Qia-4Ho",
        authDomain: "campaign-management-system.firebaseapp.com",
      });
      this.subscription = this.authService.userLogged.subscribe(
          (isLogged) => this.user = isLogged
      )
  }

  setUser(ev) {
      this.user = ev
      if (ev) {
        setTimeout(() => {
            this.showLogin = false
        }, 500)
      }
  }

  ngOnDestroy() {
      this.subscription.unsubscribe()
  }
}
