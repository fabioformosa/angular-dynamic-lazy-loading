import {Component, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {HelloComponent} from "./hello.component";
import {GoodbyeComponent} from "./goodbye.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular';

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) {}

  async doStaticLazyLoad() {
    this.viewContainerRef.clear();
    const { HelloComponent } = await import('./hello.component');
    const helloComponentInstance = this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(HelloComponent)
    );
    helloComponentInstance.instance.name = 'from Hello Component (Static)';
  }

  async doDynamicLazyLoad() {
    this.viewContainerRef.clear();
    const path = './goodbye.component';
    const { GoodbyeComponent } = await import(path);
    const helloComponentInstance = this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(HelloComponent)
    );
    (<GoodbyeComponent>helloComponentInstance.instance).name = 'from Goodbye Component (Dynamic)';
  }

  async doStaticLazyLoad2() {
    this.viewContainerRef.clear();
    const alreadyLoadedModulePath = './hello.component';
    const { HelloComponent } = await import(alreadyLoadedModulePath);
    const helloComponentInstance = this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(HelloComponent)
    );
    (<HelloComponent>helloComponentInstance.instance).name = 'from Hello Component (Pseudo-dynamic)';
  }
}
