'use strict';
/****
 * Classes and Associated Functions for Managing the Data Involved in an Assembly.
 *
 * Authors: Connor W. Colombo (Ottia)
****/

const fs = require('fs');

const strings = require('./strings.js').Part_Strings;

const FileContainer = require('./fileContainer.js');
const CostTable = require('./costTable.js');

module.exports = class Assembly extends FileContainer{
  /* Initializes an Assembly within a Maestro Context with data stored at the
   given path, addr. */
  constructor(maestro, addr, data){
    let _data = { // Default Values
      /* Labor Entries in form: {id: "", time_mins: ""} */
      labor: [],

      /* Sub-Assembly Entries in form: {id: "", count: ""} */
      subAssemblies: [],

      /* Part Entries in form: {id: "", count: ""} */
      parts: []
    };
    $.extend(true, _data, data); // Recursively Merge Given Data onto Defaults
    super(addr, _data);

    this.maestro = maestro;
    this.totalCount = 0; // Number of this Assembly Used Across the Entire Product
  } // #constructor

  /* Cost of the Assembly at a Given Order Volume */
  cost(vol){
    vol = vol || this.totalCount; // <- default value
    let c = 0;
    /* TODO (duh) */
    return this.data.costTable.cost(vol) + this.data.sourcingCostTable.cost(vol) / vol;
  } // #cost

  /* Weight of the Assembly */
  weight(){
    return partsWeight() + subassembliesWeight();
  } // #weight

  /* Subtotal of All Labor used in this Assembly (excluding sub-assemblies)*/
  laborSubTotal(){

  } // #laborSubTotal

  /* Subtotal of All Parts used in this Assembly (excluding sub-assemblies)*/
  partsSubTotal(){

  } // #partsSubTotal

  /* Weight of All Parts used in this Assembly (excluding sub-assemblies)*/
  partsWeight(){

  } // #partsWeight

  /* Weight of All Sub used in this Assembly */
  subassembliesSubTotal(){

  }

  /* Weight of All Sub-Assemblies used in this Assembly (excluding sub-assemblies)*/
  subassembliesWeight(){
    let w = 0;
    //this.data.subAssemblies.forEach( (s) => { /* TODO */ } );
  } // #partsWeight

  /* Loads the Assembly belonging to the given Product from a JSON file at the given path. */
  static load(maestro, addr){
    // Load Part Data from Accompanying JSON File:
    let data = JSON.parse(fs.readFileSync(addr, 'utf8'));
    return new Assembly(maestro, addr, data);
  } // #load
} // Class: Assembly
