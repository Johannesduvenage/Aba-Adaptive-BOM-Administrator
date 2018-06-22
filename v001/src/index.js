const maestro = require('./js/backend/maestro.js');

const path = require('path');

const product_root_path = path.join(__dirname, '..', 'Sample Product');



$(() => {
  console.time("maestro_load");
  maestro.begin(product_root_path, maestroLoaded);
});

function maestroLoaded(){
  console.log('Maestro Loaded All Data in:')
  console.timeEnd("maestro_load");
  console.log('Maestro: ', maestro);
}
