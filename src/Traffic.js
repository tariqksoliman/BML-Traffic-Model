function Traffic() {
    var cW = 0;
    var cH = 0;
    var ctx = null;
    var imgData = null;

    var downturn = false;

    var cars = null;
    var colors;

    var fps = 60;

    var requestAnim = null;
    var timeoutAnim = null;

    var time;
    var oldtime;
    var actualfps;

    //
    var buf;
    var buf8;
    var data;
    //
    
    var traffic = {
        init: function( density, dimX, dimY, resolution, framerate, color0, color1, color2, colorbg ) {
            colors = {
                0: color0,
                1: color1,
                2: color2
            };

            this.setColor( 'bg', colorbg );

            fps = framerate;
            oldtime = Date.now();

            let c = document.getElementById( 'bml-canvas' );
            cW = c.width = Math.max( Math.round( dimX / resolution ), 10 );
            cH = c.height = Math.max( Math.round( dimY / resolution ), 10 );
            c.style.width = dimX + 'px';
            c.style.height = dimY + 'px';

            ctx = c.getContext( '2d' );
            ctx.imageSmoothingEnabled = false;

            if( cars ) cars = null;
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

            buf = new ArrayBuffer( imgData.data.length );
            buf8 = new Uint8ClampedArray( buf );
            data = new Uint32Array( buf );

            if( requestAnim ) window.cancelAnimationFrame( requestAnim );
            if( timeoutAnim ) clearTimeout( timeoutAnim );

            this.animate();

        },
        animate: function() {
            timeoutAnim = setTimeout(function() { //super simple framerate
                //For each canvas pixel
                for( var y = 0; y < cH; y++ ) {
                    for( var x = 0; x < cW; x++ ) {
                        if( downturn ) {
                            if( cars[ y * cW + x ] === 1 ) {
                                if( cars[ ( ( y + 1 ) % cH ) * cW + x ] === 0 ) {
                                    cars[ ( ( y + 1 ) % cH ) * cW + x ] = -1;
                                    cars[ y * cW + x ] = 0;  
                                }
                            }
                        }
                        else {
                            if( cars[ y * cW + x ] === 2 ) {
                                if( cars[ y * cW + ( ( x + 1 ) % cW ) ] === 0 ) {
                                    cars[ y * cW + ( ( x + 1 ) % cW ) ] = -2;
                                    cars[ y * cW + x ] = 0;
                                }
                            }
                        }
                    }
                }

                downturn = !downturn;

                traffic.render();

                time = Date.now();
                actualfps = 1000 / ( time - oldtime );
                oldtime = time;

                requestAnim = requestAnimationFrame( traffic.animate );
            }, 1000 / fps );
        },
        render: function() {
            for( let i = 0; i < cars.length; i++ ) {
                cars[i] = Math.abs( cars[i] );

                data[i] = ( colors[ cars[i] ][3] << 24 ) | // alpha
                          ( colors[ cars[i] ][2] << 16 ) | // blue
                          ( colors[ cars[i] ][1] <<  8 ) | // green
                            colors[ cars[i] ][0];          // red
            }

            imgData.data.set( buf8 );
            ctx.putImageData( imgData, 0, 0 );
        },
        setColor( type, c ) {
            switch( type ) {          
                case 'bg':
                        colors[0] = [ c.r, c.g, c.b, c.a * 255 ];
                    break;
                case 'down':
                        colors[1] = [ c.r, c.g, c.b, c.a * 255 ];
                    break;
                case 'right':
                        colors[2] = [ c.r, c.g, c.b, c.a * 255 ];
                    break;
                default:
            }
        },
        setFramerate( framerate ) {
            fps = framerate;
        },
        getActualfps() {
            return Math.ceil( actualfps );
        }
    }

    return traffic;
}

export default Traffic;