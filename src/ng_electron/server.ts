import 'zone.js/dist/zone-microtask';
import 'reflect-metadata';
import {
  initializeGenericWorkerRenderer,
  MessageBus
} from 'angular2/platform/worker_render';
import {
  WORKER_APP_APPLICATION
} from "angular2/platform/worker_app";
import {
  WORKER_APP_PLATFORM,
  WORKER_APP_APPLICATION_COMMON
} from 'angular2/src/platform/worker_app_common';
import {NgZone, platform, Provider, APP_INITIALIZER} from 'angular2/core';
import {Parse5DomAdapter} from 'angular2/src/platform/server/parse5_adapter';
import {
  ElectronMessageBus,
  ElectronMessageBusSink,
  ElectronMessageBusSource,
  ELECTRON_WORKER
} from './electron_message_bus';

// electron modules
const electronApp = require('app');
const BrowserWindow = require('browser-window');
const Menu = require('menu');
const ipc = require('ipc');
// const ipcMain = require('electron').ipcMain;
// const ipcRenderer = require('electron').ipcRenderer;

let appWindow;

const loadAndWait = (path, options) => new Promise((resolve, reject) => {
  appWindow = new BrowserWindow({width : 800, height : 600});
  ipc.on('__ngBootstrap', () => { resolve(appWindow); });
  // TODO: fix this
  appWindow.loadURL(`file://${__dirname}/../main.html`);
});

const appReady = new Promise(resolve => { electronApp.on('ready', resolve); });

const bootstrapElectronAngular = (compType, bindings) => (appWindow) => {

  const messageSink = new ElectronMessageBusSink(appWindow.webContents);
  const messageSource = new ElectronMessageBusSource(ipc);

  const messageBus = new ElectronMessageBus(messageSink, messageSource, ELECTRON_WORKER);
  
  return platform([WORKER_APP_PLATFORM, bindings])
    .application([
      WORKER_APP_APPLICATION,
      WORKER_APP_APPLICATION_COMMON,
      new Provider(MessageBus, { useValue: messageBus }),
      new Provider(APP_INITIALIZER, {
        useFactory: (zone, bus) => () => initAppThread(zone, messageBus), multi: true,
        deps: [NgZone, MessageBus]
      })])
      .bootstrap(compType);
}

const initAppThread = (zone: NgZone, bus: ElectronMessageBus) => {
  Parse5DomAdapter.makeCurrent();
}

export const bootstrap = (componentRef: any, bindings?: any[]) => {
  return appReady.then(() => loadAndWait('main.html', {}))
      .then(bootstrapElectronAngular(componentRef, bindings));
}
