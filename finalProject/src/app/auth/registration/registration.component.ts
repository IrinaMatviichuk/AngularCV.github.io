import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/servises/auth/auth.service';
import { LanguageService } from '../../shared/servises/language/language.service';
import { UserService } from '../../shared/servises/auth/user.service';
import { User } from '../../shared/models/user';
import { ValidationUserService } from '../../shared/servises/validation/validation.user.service';
import { LANGUAGES } from '../../shared/servises/language/language.constants';

@Component({
  selector: 'fp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  private languages: string[] = [];
  private currentLanguage: string;
  private formRegistration: FormGroup;
  private serverMessage: string;
  constructor(private translate: LanguageService,
              private authService: AuthService,
              private router: Router,
              private validationUserService: ValidationUserService,
              private userService: UserService) {
    this.currentLanguage = this.translate.getLanguage;
    this.serverMessage = '';
    this.translate.checkLanguage(this.currentLanguage);
  }
  ngOnInit() {
    this.translate.changeLanguage();
    this.languages = LANGUAGES;
    this.formRegistration = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email],
        this.validationUserService.forbiddenEmails.bind(this)),
      password: new FormControl(null, [Validators.required, Validators.minLength(8),
        Validators.maxLength(20)]),
      username: new FormControl(null, [Validators.required]),
      usersurname: new FormControl(null, [Validators.required])
    });
  }
  onLanguageChange() {
    this.translate.setLanguage = this.currentLanguage;
    this.translate.checkLanguage(this.translate.getLanguage);
  }
  signInRedirect() {
    this.router.navigate(['/login']);
  }
  public onSubmit(): void {
    if (this.formRegistration.valid) {
      const {email, password, username, usersurname} = this.formRegistration.value;
      const user = new User(email, password, username, usersurname, 'ROLE_USER');
      this.userService.registration(user)
        .subscribe((curUser) => {
          if (curUser.status === 201) {
            localStorage.setItem('currentUser', JSON.stringify(curUser.body));
            this.authService.isLoggedIn();
            this.formRegistration.reset();
            this.router.navigate(['/messanger']);
          } else {
            this.serverMessage = 'dialog.newUserNoCreate';
            this.resetMessage();
          }
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
