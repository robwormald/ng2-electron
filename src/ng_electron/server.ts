//electron modules
const electronApp = require('app');
const BrowserWindow = require('browser-window');
const Menu = require('menu');
const ipc = require('ipc');

import 'reflect-metadata';
import {bootstrapWebWorkerCommon} from 'angular2/src/web_workers/worker/application_common';
import {createNgZone, NgZone, Injector} from 'angular2/core'
import {Parse5DomAdapter} from 'angular2/src/core/dom/parse5_adapter'
import {ElectronMessageBus, ElectronMessageBusSink, ElectronMessageBusSource, ELECTRON_WORKER} from './electron_message_bus';

let appWindow;

const loadAndWait = (path, options) => new Promise((resolve, reject) => {
  appWindow = new BrowserWindow({width: 800, height: 600});
  ipc.on('__ngBootstrap', () => {
    resolve(appWindow);
  });
  //TODO: fix this
  appWindow.loadUrl(`file://${__dirname}/../main.html`);
});

const appReady = new Promise(resolve => {
  electronApp.on('ready', resolve);
});

const bootstrapElectronAngular = (componentRef, bindings) => (appWindow) => {
  
  const messageSink = new ElectronMessageBusSink(appWindow.webContents);
  const messageSource = new ElectronMessageBusSource(ipc);
  
  const messageBus = new ElectronMessageBus(messageSink, messageSource, ELECTRON_WORKER);
  
  Parse5DomAdapter.makeCurrent();
  
  return bootstrapWebWorkerCommon(componentRef, messageBus, bindings);
}

export const bootstrap = (componentRef:any, bindings?:any[]) => {
  return appReady
    .then(() => loadAndWait('main.html', {}))
    .then(bootstrapElectronAngular(componentRef, bindings));
}
