import { PlacesAutocompleteDirective } from './places-autocomplete.directive';
import { MapsAPILoader } from '@agm/core';
import { Directive, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('PlacesAutocompleteDirective', () => {
  let directive: PlacesAutocompleteDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ElementRef, MapsAPILoader, PlacesAutocompleteDirective]});
    directive = TestBed.get(PlacesAutocompleteDirective);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
