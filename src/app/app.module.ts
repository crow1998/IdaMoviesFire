import { AuthModule } from './modules/auth.module';
import { reducers } from './reducers/app.reducer';
import { MaterialModule } from './modules/material.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopPanelComponent } from './components/navigation/top-panel/top-panel.component';
import { SidePanelComponent } from './components/navigation/side-panel/side-panel.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { HomeModule } from './modules/home.module';

@NgModule({
  declarations: [
    AppComponent,
    TopPanelComponent,
    SidePanelComponent,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    AuthModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
