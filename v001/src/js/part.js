'use strict';
/****
 * Classes and Associated Functions for Managing the Data Involved in a Part.
 *
 * Authors: Connor W. Colombo (Ottia)
****/

const strings = require('./strings.js').Part_Strings;
const CostTable = require('./costTable.js');
const fs = require('fs');

module.exports = class Part{
  /* Initializes a Part with the given name, and data to be stored at the given
  path, addr. */
  constructor(addr, data){
    this.addr = addr; // File address
    this.data = { // Default Values
      name: strings.NO_NAME,
      costTable: new CostTable({
        bins: [0],
        costs: [0],
        type: 0
      }),

      weight: 0,

      origin: strings.NO_ORIGIN,
      sourcingProvider: strings.NO_PROVIDER,
      sourcingDestination: strings.NO_DESTINATION,
      sourcingCostTable: new CostTable({
        bins: [0],
        costs: [0],
        type: 0
      })
    };
    $.extend(true, this.data, data); // Recursively Merge Given Data onto Defaults
  }

  /* Loads the Part from a JSON file at the given path */
  static load(addr){
    // Load Part Data from Accompanying JSON File:
    let data = JSON.parse(fs.readFileSync(addr, 'utf8'));
    let p = new Part(addr, data);
    p.data.costTable = new CostTable(p.data.costTable) || new CostTable();
    p.data.sourcingCostTable = new CostTable(p.data.sourcingCostTable) || new CostTable();

    return p;
  } // #load

  /* Saves the Given Part to its associated JSON *.part file */
  save(){
    let json = JSON.stringify(this.data, null, 2); // Save as 'pretty-print'
    fs.writeFileSync(this.addr, json, 'utf8');
  } // #save
} // Class: Part
