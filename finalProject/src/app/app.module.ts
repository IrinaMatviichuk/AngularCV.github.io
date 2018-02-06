import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './shared/servises/auth/user.service';
import { AuthService } from './shared/servises/auth/auth.service';
import { AuthGuard } from './shared/servises/auth/auth.guard';
import { RoleGuard } from './shared/servises/auth/role.guard';
import { LanguageService } from './shared/servises/language/language.service';
import { SystemModule } from './system/system.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    SystemModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuard,
    RoleGuard,
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
