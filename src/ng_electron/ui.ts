// electron IPC module
const ipc = require('ipc');
// const ipcMain = require('electron').ipcMain;
// const ipcRenderer = require('electron').ipcRenderer;
import 'reflect-metadata';

import {platform, Provider, APP_INITIALIZER, Injector} from 'angular2/core';
import {
  WORKER_RENDER_PLATFORM,
  WORKER_RENDER_APP,
  initializeGenericWorkerRenderer,
  MessageBus,
  WORKER_SCRIPT
} from 'angular2/platform/worker_render';
import {WORKER_RENDER_APP_COMMON} from 'angular2/src/platform/worker_render_common';
import {
  ElectronMessageBus,
  ElectronMessageBusSink,
  ElectronMessageBusSource
} from './electron_message_bus';

export const bootstrap = () => {
  var bus = new ElectronMessageBus(new ElectronMessageBusSink(ipc),
                                   new ElectronMessageBusSource(ipc))
  platform([WORKER_RENDER_PLATFORM])
    .application([
      WORKER_RENDER_APP,
      WORKER_RENDER_APP_COMMON,
      new Provider(WORKER_SCRIPT, {useValue: "worker.js"}),
      new Provider(MessageBus, { useValue: bus }),
      new Provider(APP_INITIALIZER, {
        useFactory: (injector) => () => initializeGenericWorkerRenderer(injector),
        deps: [Injector],
        multi: true
      })
    ]);
  ipc.send('__ngBootstrap', 'ready');
}