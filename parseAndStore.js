var fs        = require('fs')
    , path      = require('path')
    , XmlStream = require('xml-stream');

var arangojs = require('arangojs');
var db = arangojs();
var db2 = new arangojs.Database();
var aql = arangojs.aql(['RETURN ', ''], Date.now());
var query = aql.query;
var bindVars = aql.bindVars;
//var db = arangojs()();

var graph = db.graph('ards11');

graph.create({
 edgeDefinitions: [
 {
 collection: 'edges',
 from: [
 'node'
 ],
 to: [
 'node'
 ]
 }
 ]
 }).then(function(graph1) {});
//console.log('calling setup'); // Detect on the fly.
/*
 }).catch(function (err) {
 console.log(err);
 });*/
