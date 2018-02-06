import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fpFullLanguageName'
})
export class FullLanguageNamePipe implements PipeTransform {
  private languages: any = {
    'ru': { name: 'Русский' },
    'en': { name: 'English' }
  };
  transform(lang: string): string {
    return this.languages[lang].name;
  }
}
