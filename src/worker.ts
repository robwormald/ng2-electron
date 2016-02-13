//worker to boot angular in electron
import 'zone.js/dist/zone-microtask';
import {bootstrap} from './ng_electron/server';

//sample component
import {ElectronApp} from './components/ElectronApp';

bootstrap(ElectronApp);
