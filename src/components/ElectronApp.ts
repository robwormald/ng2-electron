declare var Notification;

import {SampleService} from '../services/SampleService';
import {Component, Control} from 'angular2/angular2';

@Component({
  selector: 'app',
  template: `
    <h2>Hello from NgElectron, {{name}}!</h2>
    <form>
      <div class="form-group">
      <label>Enter Your Name</label>
      <input type="text" class="form-control" placeholder="Your Name Here" [ng-form-control]="nameInput">
    </div>
  `,
  providers: [SampleService]
})
export class ElectronApp {
  name:string = '';
  nameInput: Control = new Control();
  constructor(){
    this.nameInput.valueChanges.subscribe(name => {
      this.name = name;
    });
  }
}