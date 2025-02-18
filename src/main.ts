import {ApplicationRef, enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {enableDebugTools} from "@angular/platform-browser";

if (environment.production) {
  enableProdMode();
}


// code for using profiler in console
platformBrowserDynamic().bootstrapModule(AppModule).then(module => {
  let applicationRef = module.injector.get(ApplicationRef);
  let appComponent = applicationRef.components[0];
  enableDebugTools(appComponent);
})
  .catch(err => console.error(err));

// old code
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
