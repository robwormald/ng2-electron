declare var Notification;

import {SampleService} from '../services/SampleService';
import {Component, Control} from 'angular2/angular2';

@Component({
  selector: 'app',
  template: `
    <h2>Hello from NgElectron!</h2>
    <input type="text" [ng-form-control]="nameInput"/>
    <p>Hello, {{name}}</p>
  `,
  providers: [SampleService]
})
export class ElectronApp {
  name:string = '';
  nameInput: Control = new Control();
  constructor(){
    this.nameInput.valueChanges.subscribe(v => {
      
      this.name = v;
    })
  }
}