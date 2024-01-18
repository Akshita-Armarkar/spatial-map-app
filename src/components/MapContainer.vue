<template>
   <div v-if="!failed" class="map-parent" ref="map"></div>
   <div v-else>Map Loading Failed. Please try again later!</div>
</template>

<script>
import { createApp } from 'vue';
import Info from './Info.vue';
import { loadMap } from '@/utils/map';

/**
 * @typedef { {
 *  lat: number,
 *  lng: number,
 *  title: string,
 *  info: string
 * } } MarkerData
 */

export default {
  name: 'MapContainer',
  data(){
    return {
      failed: false
    }
  },
  methods: {
    getInfoEl( props ){
        const parent = document.createElement( 'div' );
        createApp( Info, props ).mount( parent );
        return parent; 
    },
    async createMap(){
      try{
        const parentEl = this.$refs.map;

        const { createMarker } =  await loadMap( parentEl, { 
          center: { lat: 12.889, lng: 77.614 },
          zoom: 8
        });

        /** @type { MarkerData[] } */
        const markers = await fetch( './markers.json' ).then( res => res.json() );

        for( let marker of markers ){
            const { lat, lng, title, info } = marker;
            createMarker( {
              position: { lat, lng },
              title,
              label: this.getInfoEl( { title, info } )
            } )

        }

      }
      catch( e ){
        console.warn( 'Error loading map', e );
        this.failed = true;
      } 
    }
  },
  mounted(){
      this.createMap();
  }
}
</script>

<style scoped lang="scss">
.map-parent{
  height: 500px;
  width: 100%;
}
</style>
