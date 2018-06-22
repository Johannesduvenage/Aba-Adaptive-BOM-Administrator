'use strict';
/****
 * Classes and Associated Functions for Loading and Managing the Data Involved
 * in a Product.
 *
 * Authors: Connor W. Colombo (Ottia)
****/

const fs = require('fs');
const path = require('path');

const strings = require('./strings.js').Sys_Strings;

const FileContainer = require('./fileContainer.js');

module.exports = class Product extends FileContainer{
  /* Initializes a Product within a Maestro Context with data stored at the
   given path, addr. */
  constructor(maestro, addr, data){
    let _data = { // Default Values
      minManufacturingVolume: 1,

      packagedVolume: 0, // Volume (in cu.in of packaged product)

      /* Labor Entries in form: {locId: "", stockFrac: ""} */
      distributorLocations: [],

      // List of Ids for Assemblies Contained in this Product
      /* Assembly Entries in form: {id: "", count: ""} */
      assemblies: [],

      // List of Ids for Shipments Necessary for Making this Product
      /* Shipment Entries in form: {type: "", from: "", to: "", via: "", contents: ""} */
      shipments: []
    };
    $.extend(true, _data, data); // Recursively Merge Given Data onto Defaults
    super(addr, _data);

    this.maestro = maestro;
    this.rootDir = path.dirname(addr);
  } // #constructor

  /* Loads the Part from a JSON file at the given path */
  static load(maestro, addr){
    // Load Part Data from Accompanying JSON File:
    let data = JSON.parse(fs.readFileSync(addr, 'utf8'));
    return new Product(maestro, addr, data);
  } // #load
} // Class: Product
