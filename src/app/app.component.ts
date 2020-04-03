import {Component, ComponentFactoryResolver, OnInit, ViewContainerRef} from '@angular/core';
import {HelloComponent} from "./hello.component";
import {GoodbyeComponent} from "./goodbye.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{
  title = 'Angular';

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
  }

  // async doStaticLazyLoad() {
  //   this.viewContainerRef.clear();
  //   const { HelloComponent } = await import('./hello.component');
  //   const helloComponentInstance = this.viewContainerRef.createComponent(
  //     this.cfr.resolveComponentFactory(HelloComponent)
  //   );
  //   helloComponentInstance.instance.name = 'from Hello Component (Static)';
  // }
  //
  // async doDynamicLazyLoad() {
  //   this.viewContainerRef.clear();
  //   const path = './goodbye.component';
  //   const { GoodbyeComponent } = await import(path);
  //   const helloComponentInstance = this.viewContainerRef.createComponent(
  //     this.cfr.resolveComponentFactory(HelloComponent)
  //   );
  //   (<GoodbyeComponent>helloComponentInstance.instance).name = 'from Goodbye Component (Dynamic)';
  // }
  //
  // async doStaticLazyLoad2() {
  //   this.viewContainerRef.clear();
  //   const alreadyLoadedModulePath = './hello.component';
  //   const { HelloComponent } = await import(alreadyLoadedModulePath);
  //   const helloComponentInstance = this.viewContainerRef.createComponent(
  //     this.cfr.resolveComponentFactory(HelloComponent)
  //   );
  //   (<HelloComponent>helloComponentInstance.instance).name = 'from Hello Component (Pseudo-dynamic)';
  // }

  async genericButtonListener(requiredComponent: string){
    switch (requiredComponent) {
      case 'hello': this.attachHelloComponent();break;
      case 'goodbye': this.attachGoodbyeComponent();break;
    }
  }

  private async attachHelloComponent() {
    this.viewContainerRef.clear();
    const {HelloComponent} = await import('./hello.component');
    const helloComponentInstance = this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(HelloComponent)
    );
    helloComponentInstance.instance.name = 'from Hello Component (Static)';
  }

  private async attachGoodbyeComponent() {
    this.viewContainerRef.clear();
    const {GoodbyeComponent} = await import('./goodbye.component');
    const helloComponentInstance = this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(GoodbyeComponent)
    );
    helloComponentInstance.instance.name = 'from Goodbye Component (Static)';
  }

}
