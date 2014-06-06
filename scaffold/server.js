var http = require("http");


http.createServer(function(request, response) {

    var hasError = false;
    var segments =  request.url.split('/');

    var modelName = segments[1];

    if( segments[1] === undefined)
    {
        hasError = true;
    }


    var id = -1;

    if( segments[2] !== undefined)
    {
        id = parseInt( segments[2]);
    }


    writeHeaders(200);

    try {
        var fileJSON = require('./' + modelName + '.json');

        if( id >= 0 )
        {
            var hasMatch = false;

            //we assume its an array for now
            var jArray =  fileJSON.root;

            for( var i = 0; i < jArray.length; i++ )
            {
                if( jArray[i].id === id )
                {
                    response.write("[" + JSON.stringify(jArray[i]) + "]");
                    hasMatch = true;
                }
            }

            if( !hasMatch )
            {
                response.write('[]');
            }

        } else {
            response.write(JSON.stringify(fileJSON.root));
        }

    } catch(err) {
        writeHeaders(500);
        response.write('error\n');
        response.write(err.message + "\n");
        response.write("request url :  " + request.url );
    }


    function writeHeaders( code ){
        response.writeHead(code, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
    }



    response.end();

}).listen(8282);