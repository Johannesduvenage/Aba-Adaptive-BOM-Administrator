const path = require('path');
const Part = require('./js/part.js');

const sample_path = path.join(__dirname, '..', 'Sample Product');

$(() => {
  let p = Part.load(path.join(sample_path, 'parts', 'test.part'));
  p.save();
});
