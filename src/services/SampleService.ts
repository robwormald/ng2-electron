//use node API
import {readFile} from 'fs';

export class SampleService {
  constructor(){
    
  }
  getData(){
    return new Promise((resolve, reject) => {
      readFile('package.json', (err, data) => {
        resolve(JSON.parse(data.toString()));
      });
    });
  }
}