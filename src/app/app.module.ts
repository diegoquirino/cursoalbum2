import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';

import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './core/auth.service';
import { AuthGuard} from './core/auth.guard';
import { MainNavComponent } from './main-nav/main-nav.component';

const routes:Routes = [
    { path: '', component: HomePageComponent },
    { path: 'albums-list', component: AlbumsListComponent, canActivate: [AuthGuard]},
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        AlbumsListComponent,
        MainNavComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes,{useHash:true}),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        CoreModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase, 'sala-de-aula'),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFirestoreModule.enablePersistence(),
        AngularFireStorageModule
    ],
    providers: [
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
