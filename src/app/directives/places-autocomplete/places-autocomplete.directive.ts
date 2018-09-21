import { Directive, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appPlacesAutocomplete]'
})
export class PlacesAutocompleteDirective implements OnInit {
  private element: HTMLInputElement;

  @Output()
  addressSelect: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
  }

  getFormattedAddress(place) {
    const location_obj = {};
    console.log(place);
    return place;
  }

  ngOnInit() {
    console.log(google.maps.places);
    const autocomplete = new google.maps.places.Autocomplete(this.element);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.addressSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
    });
  }
}
