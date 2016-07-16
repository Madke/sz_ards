var fs        = require('fs')
    , path      = require('path')
    , XmlStream = require('xml-stream');

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
        /*collection.save({lat: node.$.lat, log: node.$.lon}).then(function (doc) {}).catch(function(err){
            console.log(err);
        });*/
        fs.writeFile('/Users/udaykrishna/Downloads/india-latest-lat-lng.txt', node.$.id+","+node.$.lat+","+node.$.lon, function (err) {
            if (err) return console.log(err);
            console.log('Hello World > helloworld.txt');
        });
    });
    xml.on('error', function(message) {
        console.log('Parsing as ' + (encoding || 'auto') + ' failed: ' + message);
    });
    return xml;
}
//console.log('calling setup');
var xml = setup();             // Detect on the fly.