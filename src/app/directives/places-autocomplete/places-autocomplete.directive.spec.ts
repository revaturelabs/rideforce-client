import { PlacesAutocompleteDirective } from './places-autocomplete.directive';
import { MapsAPILoader } from '@agm/core';
import { Directive, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('PlacesAutocompleteDirective', () => {
  let directive: PlacesAutocompleteDirective;
  const mockElement = jasmine.createSpyObj('ElementRef', ['nativeElement']);

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{provide: ElementRef, useValue: mockElement}, MapsAPILoader, PlacesAutocompleteDirective]});
    directive = TestBed.get(PlacesAutocompleteDirective);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
