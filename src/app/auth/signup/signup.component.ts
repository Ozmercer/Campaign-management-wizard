import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    user = 'not connected';

    constructor(private router: Router,
                private authService: AuthService) {}
  
    ngOnInit() {}
  
    onSignup(form: NgForm) {
      const email = form.value.email;
      const password = form.value.password;
      this.authService.signupUser(email, password)
        .then(
          () => {
              this.router.navigate(['/campaign-wizard/targeting'])
            }
        )
    }
}
