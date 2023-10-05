import {getContractors} from './load-data.js';

getContractors().
  then((data) =>{
    console.log(data);
  });
