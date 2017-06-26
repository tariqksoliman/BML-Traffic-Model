function Traffic( density ) {
    var cW = 0;
    var cH = 0;
    var ctx = null;
    var imgData = null;

    var downturn = false;

    var cars = null;
    var colors = {
        0: [0,0,0,0],
        1: [35,190,245,255],
        2: [195,10,185,195]
    };
    
    var traffic = {
        init: function( density ) {
            let c = document.getElementById( 'bml-canvas' );
            cW = c.width = Math.round( window.innerWidth/2 );
            cH = c.height = Math.round( window.innerHeight/2 );
            ctx = c.getContext( '2d' );
            ctx.imageSmoothingEnabled = false;

            cars = new Int8Array( cW * cH );
            cars.fill( 0, 0, cars.length );
            imgData = ctx.getImageData( 0, 0, cW, cH );

            //For each canvas pixel
            for( let y = 0; y < cH; y++ ) {
                for( let x = 0; x < cW; x++ ) {
                    if( Math.random() < density ) {
                        //Add a car
                        if( Math.random() < 0.5 ) {
                            //add a down car
                            cars[ ( y * cW ) + x ] = 1;
                        }
                        else {
                            //add a right car
                            cars[ ( y * cW ) + x ] = 2;
                        }
                    }
                }
            }

            this.animate();

        },
        animate: function() {
            //For each canvas pixel
            for( var y = 0; y < cH; y++ ) {
                for( var x = 0; x < cW; x++ ) {
                    if( downturn && cars[ y * cW + x ] === 1 ) {
                        if( cars[ ( ( y + 1 ) % cH ) * cW + x ] === 0 ) {
                            cars[ ( ( y + 1 ) % cH ) * cW + x ] = -cars[ y * cW + x ];
                            cars[ y * cW + x ] = 0;  
                        }
                    }
                    else if( !downturn && cars[ y * cW + x ] === 2 ) {
                        if( cars[ y * cW + ( ( x + 1 ) % cW ) ] === 0 ) {
                            cars[ y * cW + ( ( x + 1 ) % cW ) ] = -cars[ y * cW + x ];
                            cars[ y * cW + x ] = 0;
                        }
                    }
                }
            }

            downturn = !downturn;

            traffic.render();

            //setTimeout(function() {
            requestAnimationFrame( traffic.animate );
            //}, 1000 / 1 );
        },
        render: function() {
            for( let i = 0; i < cars.length; i++ ) {
                cars[i] = Math.abs( cars[i] );

                imgData.data[ i * 4 + 0 ] = colors[ cars[i] ][0];
                imgData.data[ i * 4 + 1 ] = colors[ cars[i] ][1];
                imgData.data[ i * 4 + 2 ] = colors[ cars[i] ][2];
                imgData.data[ i * 4 + 3 ] = colors[ cars[i] ][3];
            }
            ctx.putImageData( imgData, 0, 0 );
        }
    }

    return traffic;
}

export default Traffic;