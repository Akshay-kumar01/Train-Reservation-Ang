import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app/app.component'; // Directly importing the standalone component

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic()
  .bootstrapModule(AppComponent) 
  .then(ref => {
    
    if ((window as any)['ngRef']) {
      (window as any)['ngRef'].destroy();
    }
    (window as any)['ngRef'] = ref;


  })
  .catch(err => console.error(err));
