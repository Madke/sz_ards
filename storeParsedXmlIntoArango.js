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

var graph = db.graph('ards10');

/*graph.create({
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
}).then(function(graph1) {*/
    /*graph.addVertexCollection('node')
        .then(() => {
            // the collection "vertices" has been added to the graph
        });*/
    var collection = graph.vertexCollection('node');
    function setup(encoding) {
        /*collection.save({some: 'data'}).then(function (doc) {
            console.log(doc);
        }).catch(function(err){
            console.log('xyz'+err);
        });*/
        //console.log('setup called');
        var stream = fs.createReadStream('/Users/udaykrishna/Downloads/india-latest.osm');
        var xml = new XmlStream(stream, encoding);
        //console.log('got stream');
        xml.on('endElement: node', function(node) {
            //console.log(node);
            xml.pause();
            collection.save({_id : node.$.id, lat: node.$.lat, log: node.$.lon}).then(function (doc) {
                xml.resume();
            }).catch(function(err){
                console.log(err);
            });
        });
        xml.on('error', function(message) {
            console.log('Parsing as ' + (encoding || 'auto') + ' failed: ' + message);
        });
        return xml;
    }
    //console.log('calling setup');
    var xml = setup();             // Detect on the fly.
/*
}).catch(function (err) {
    console.log(err);
});*/
