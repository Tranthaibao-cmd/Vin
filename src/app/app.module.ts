import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { appInitializer } from './core/init/app.initializer';
import { AuthenticationService } from './core/_services/authentication.service';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

import { FormatTimePipe } from './core/pipes/FormatTimePipe.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgHttpLoaderModule } from 'ng-http-loader';

import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedPipeModule } from './core/pipes/shared-pipe.module';


const MODULES = [CommonModule,
  BrowserModule,
  AppRoutingModule,

  HttpClientModule,
  BrowserAnimationsModule,
  SharedPipeModule,]

const COMPONENTS = [AppComponent]
const PIPES = [FormatTimePipe,]

@NgModule({
  declarations: [
    ...COMPONENTS, ...PIPES,
  ],
  imports: [
    ...MODULES,
    NgHttpLoaderModule.forRoot(),
    NgxSkeletonLoaderModule.forRoot({
      animation: 'pulse',
      loadingText: 'This item is actually loading...',
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthenticationService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
