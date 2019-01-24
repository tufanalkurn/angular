import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaddaConfig, LaddaConfigArgs } from './ladda-config';
import { LaddaDirective } from './ladda.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LaddaDirective
  ],
  exports: [
    LaddaDirective
  ]
})
export class LaddaModule {
  public static forRoot(config: LaddaConfigArgs): ModuleWithProviders {
    return {
      ngModule: LaddaModule,
      providers: [
        { provide: LaddaConfig, useValue: config }
      ]
    };
  }
}
