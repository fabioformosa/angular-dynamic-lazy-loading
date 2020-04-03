# AngularDynamicLazyModule

This project is a PoC to test dynamic lazy loding of modules and components.  
The following stackoverflow question recaps the issue:
https://stackoverflow.com/questions/61008366/angular-9-dynamic-lazy-loading-module-the-request-of-a-dependency-is-an-expr

## Issue description


I would leverage Angular Lazy-loading feature modules to fulfill a pluggable frontend.
So the concept is create extension-points in my app where I can do something like this:

```
import('./customers/customers.component').then(lazyMod => {
   here use lazyMod.CustomersComponent to plug other component's template
})
```

**Case 1** - **OK** - Pressing button1 of the PoC, it runs the following code and it's OK:

```
const { HelloComponent } = await import('./hello.component')
```

**Case 2** - **OK** - Pressing button2 of PoC, it runs the following code and it's OK:

```
const helloLazyModulePath = './hello.component';
const { HelloComponent } = await import(helloLazyModulePath );
```

**Case 3** - **KO** - Pressing button3 of the PoC, it runs the following code and I get error:

```
const goodbyeLazyModulePath = './goodbye.component';
const { HelloComponent } = await import(goodbyeLazyModulePath);
```  
The **error** is: Uncaught (in promise): Error: Cannot find module.
A build **warning** says: Critical dependency: the request of a dependency is an expression

The reason should be this:
According to https://angular.io/guide/deployment#lazy-loading

```
The CLI runs the Angular Ahead-of-Time Webpack Plugin which automatically recognizes
lazy-loaded NgModules and creates separate bundles for them
```
It means that webpack angular tool, during the build phase, scans the source-code to find out @import('path') and to create a separated bundle for lazy-module.
So if the `@import` is dinamically used `@import(variable)`, there isn't way for webpack to figure out which feature module must be built in a separated bundle.

I need to use `@import(variable)` because I know which plugin-module to import only during build phase, according to many factors, for example n which environment I'm going to deploy.

Is there a way (a workaround or a compile setup) to use `@import(variable)` without getting error at runtime due to missing separated bundle?


##
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

