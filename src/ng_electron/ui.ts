//electron IPC module
const ipc = require('ipc');
import 'reflect-metadata';


import {bootstrapUICommon} from 'angular2/src/web_workers/ui/impl';
import {ElectronMessageBus, ElectronMessageBusSink, ElectronMessageBusSource} from './electron_message_bus';


export const bootstrap = () => {
  var bus = new ElectronMessageBus(new ElectronMessageBusSink(ipc), new ElectronMessageBusSource(ipc))
  bootstrapUICommon(bus);
  ipc.send('__ngBootstrap', 'ready');
}