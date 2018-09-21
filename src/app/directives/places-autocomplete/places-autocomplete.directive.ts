import { Directive, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
// import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Directive({
  selector: '[appPlacesAutocomplete]'
})
export class PlacesAutocompleteDirective implements OnInit {

  private element: HTMLInputElement;

  @Output()
  addressSelect: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef, private mapsAPILoader: MapsAPILoader) {
    this.element = elRef.nativeElement;
  }

  getFormattedAddress(place) {
    const location_obj = {};
    return place;
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.element);
      autocomplete.addListener('place_changed', () => {
        this.addressSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
      });
    });
  }

}
