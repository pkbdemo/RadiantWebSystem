import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { DecimalPipe, registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en'
import zh from '@angular/common/locales/zh'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular'
import { ToastrModule } from 'ngx-toastr'
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
// import { initializer } from './utils/app-init';

registerLocaleData(en)
registerLocaleData(zh)

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializer,
    //   multi: true,
    //   deps: [KeycloakService]
    // },
    { provide: NZ_I18N, useValue: en_US },
    DecimalPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
