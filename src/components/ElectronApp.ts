declare var Notification;

import {SampleService} from '../services/SampleService';
import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, Control} from 'angular2/common';

@Component({
  selector: 'app',
  template: `
  <div class="pane">
    <h2>Hello from NgElectron, {{name}}!</h2>
    <form>
      <div class="form-group">
      <label>Enter Your Name</label>
      <input type="text" class="form-control" placeholder="Your Name Here" [ngFormControl]="nameInput">
    </form>
  </div>
  `,
  providers: [SampleService],
  directives: [FORM_DIRECTIVES]
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