import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { LANGUAGES } from './language.constants';

@Injectable()
export class LanguageService {
  public currentLanguage: string;
  constructor(public translate: TranslateService) {
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'ru';
  }
  set setLanguage(lang: string) {
    localStorage.setItem('currentLanguage', lang);
    this.currentLanguage = localStorage.getItem('currentLanguage');
  }
  get getLanguage() {
    return this.currentLanguage;
  }
  checkLanguage(lang: string = this.currentLanguage) {
    if (LANGUAGES.indexOf(lang) === -1) {
      this.translate.use('ru');
    } else {
      this.translate.use(lang);
    }
  }
  changeLanguage() {
    this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {
        this.checkLanguage(event.lang);
      });
  }
}
