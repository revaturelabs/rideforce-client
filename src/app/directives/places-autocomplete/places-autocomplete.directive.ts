import { Directive, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
// import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

/** Adds functionality to an HTML input element */
@Directive({
  selector: '[appPlacesAutocomplete]'
})
export class PlacesAutocompleteDirective implements OnInit {

  /** The Input element to focus on */
  private element: HTMLInputElement;

  /** Manages data for when the user changes the place */
  @Output()
  addressSelect: EventEmitter<any> = new EventEmitter();

  /**
   * Sets up the listener with dependency injections
   * @param {ElementRef} elRef - the element to listen to
   * @param {MapsAPILoader} mapsAPILoader - the external api for mapping services
   */
  constructor(private elRef: ElementRef, private mapsAPILoader: MapsAPILoader) {
    this.element = this.elRef.nativeElement;
  }

  /**
   * @ignore
   * @param place
   */
  getFormattedAddress(place) {
    const location_obj = {};
    return place;
  }

  /**
   * Sets up the Event listener so that auto-complete is possible
   */
  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.element);
      autocomplete.addListener('place_changed', () => {
        this.addressSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
      });
    });
  }

}
