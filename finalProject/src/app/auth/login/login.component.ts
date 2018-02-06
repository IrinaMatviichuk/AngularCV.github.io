import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LanguageService } from '../../shared/servises/language/language.service';
import { LANGUAGES } from '../../shared/servises/language/language.constants';
import { UserService } from '../../shared/servises/auth/user.service';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/servises/auth/auth.service';

@Component({
  selector: 'fp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private languages: string[] = [];
  private currentLanguage: string;
  private formLogin: FormGroup;
  private serverMessage: string;
  constructor(private translate: LanguageService,
              private authService: AuthService,
              private router: Router,
              private userService: UserService) {
    this.currentLanguage = this.translate.getLanguage;
    this.serverMessage = '';
    this.translate.checkLanguage(this.currentLanguage);
  }
  ngOnInit() {
    this.translate.changeLanguage();
    this.languages = LANGUAGES;
    this.formLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }
  onLanguageChange() {
    this.translate.setLanguage = this.currentLanguage;
    this.translate.checkLanguage(this.translate.getLanguage);
  }
  signUpRedirect() {
    this.router.navigate(['/registration']);
  }
  public onSubmit(): void {
    if (this.formLogin.valid) {
      const {email, password} = this.formLogin.value;
      this.userService.login(email)
        .subscribe((users: User[]) => {
          if (users[0]) {
            if (users[0].password === password) {
                localStorage.setItem('currentUser', JSON.stringify(users[0]));
                this.authService.login();
                this.formLogin.reset();
                this.router.navigate(['/messanger']);
              } else {
                this.serverMessage = 'dialog.incorrectPassword';
              }
            } else {
              this.serverMessage = 'dialog.incorrectEmail';
            }
            this.resetMessage();
        }, () => {
          this.serverMessage = 'isError';
          this.resetMessage();
        });
    }
  }
  resetMessage() {
    window.setTimeout(() => {
      this.serverMessage = '';
    }, 5000);
  }
}
