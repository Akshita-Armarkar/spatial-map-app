import { Loader } from 'google-maps';


/** @type { import( 'google-maps' ).LoaderOptions } */
const options = {};

/**
 * @typedef { { lat: string, lng: string } } Position
 * 
 * 
 * 
 * @param { HTMLElement } el 
 * @param { { center: Position, zoom: number } } config 
 */
const loadMap = async ( el, { center: { lat, lng }, zoom } ) => {

    const loader = new Loader( 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg', options );
    
    const google = await loader.load();

    const map = new google.maps.Map( el, {
        center: { lat, lng },
        zoom,
        mapId: 'DEMO_MAP_ID'
    });

    const infoWindow = new google.maps.InfoWindow();

    /**
     * 
     * @param { { position: Position, title?: string, label?: HTMLElement } } Props 
     */
    const createMarker = ( { position, title = '', label } ) => {
      
        const marker = new google.maps.Marker( {
            position,
            title, 
        } );

        marker.setMap( map );

        if( !label )return;

        console.log( 'adding label' );

        marker.addListener( 'click', () => { 
            console.log( 'running')
            infoWindow.close();
            infoWindow.setContent( label );
            infoWindow.open( map, marker );
        })
    }

    

    return {
        createMarker
    }

};


export { loadMap }

