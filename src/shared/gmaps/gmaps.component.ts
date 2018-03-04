import { Component, ViewChild, Input, ElementRef } from '@angular/core';

import { } from '@types/googlemaps';

import { GMAP_CUSTOM_STYLES } from './gmap-custom-styles';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.scss']
})
export class GmapsComponent {
  @ViewChild('gmap') gmapElement: ElementRef;

  @Input() set defaultConfig(address: string) {
    if (address.length) {
      this.initMapByAddress(address);
    }
  };

  map: google.maps.Map;
  geocoder: google.maps.Geocoder = new google.maps.Geocoder();
  mapProp: google.maps.MapOptions;

  initGmap(): void {
    this.map = new google.maps.Map(this.gmapElement.nativeElement, this.mapProp);
  }

  initMapByAddress(address: string): void {
    this.geocoder.geocode( {address}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const styles = JSON.parse(GMAP_CUSTOM_STYLES).silver;

        this.mapProp = {
          center: results[0].geometry.location,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles
        };

        this.initGmap();

        const marker = new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location
        });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
