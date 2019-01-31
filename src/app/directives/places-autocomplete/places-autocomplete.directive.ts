import { MapsAPILoader } from '@agm/core';
import { Directive, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';

/** Adds functionality to an HTML input element */
@Directive({
  selector: '[appPlacesAutocomplete]'
})
export class PlacesAutocompleteDirective implements OnInit {
  /** Manages data for when the user changes the place */
  @Output()
  addressSelect: EventEmitter<String> = new EventEmitter();

  /**
   * Sets up the listener with dependency injections
   * @param {ElementRef} elRef - the element to listen to
   * @param {MapsAPILoader} mapsAPILoader - the external api for mapping services
   */
  constructor(private elRef: ElementRef, private mapsAPILoader: MapsAPILoader) {}

  /**
   * Sets up the Event listener so that auto-complete is possible
   */
  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.elRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.addressSelect.emit(autocomplete.getPlace().formatted_address);
      });
    });
  }
}
