'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">rideshare-client documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-d7476836e2091e87dc6ee7a015845549"' : 'data-target="#xs-components-links-module-AppModule-d7476836e2091e87dc6ee7a015845549"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-d7476836e2091e87dc6ee7a015845549"' : 'id="xs-components-links-module-AppModule-d7476836e2091e87dc6ee7a015845549"' }>
                                        <li class="link">
                                            <a href="components/AccountinfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccountinfoComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CallbackComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CallbackComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CarRegistrationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CarRegistrationComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FavoritesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FavoritesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HowToComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HowToComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LandingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LandingComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LikesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LikesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LikesmatchwebComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LikesmatchwebComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/RideswipeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RideswipeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/UsercardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsercardComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/UsermatchwebComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsermatchwebComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ViewProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewProfileComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#directives-links-module-AppModule-d7476836e2091e87dc6ee7a015845549"' : 'data-target="#xs-directives-links-module-AppModule-d7476836e2091e87dc6ee7a015845549"' }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="directives-links-module-AppModule-d7476836e2091e87dc6ee7a015845549"' : 'id="xs-directives-links-module-AppModule-d7476836e2091e87dc6ee7a015845549"' }>
                                        <li class="link">
                                            <a href="directives/PlacesAutocompleteDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlacesAutocompleteDirective</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-d7476836e2091e87dc6ee7a015845549"' : 'data-target="#xs-injectables-links-module-AppModule-d7476836e2091e87dc6ee7a015845549"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-d7476836e2091e87dc6ee7a015845549"' : 'id="xs-injectables-links-module-AppModule-d7476836e2091e87dc6ee7a015845549"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MapsControllerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>MapsControllerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MatchingControllerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>MatchingControllerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserControllerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>UserControllerService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/AddressModel.html" data-type="entity-link">AddressModel</a>
                    </li>
                    <li class="link">
                        <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                    </li>
                    <li class="link">
                        <a href="classes/Car.html" data-type="entity-link">Car</a>
                    </li>
                    <li class="link">
                        <a href="classes/Filter.html" data-type="entity-link">Filter</a>
                    </li>
                    <li class="link">
                        <a href="classes/SwipecardModel.html" data-type="entity-link">SwipecardModel</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/Auth0Service.html" data-type="entity-link">Auth0Service</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/GeocodeService.html" data-type="entity-link">GeocodeService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MapsControllerService.html" data-type="entity-link">MapsControllerService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/MatchingControllerService.html" data-type="entity-link">MatchingControllerService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/TokenStorage.html" data-type="entity-link">TokenStorage</a>
                            </li>
                            <li class="link">
                                <a href="injectables/UploadService.html" data-type="entity-link">UploadService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/UserControllerService.html" data-type="entity-link">UserControllerService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"' }>
                <span class="icon ion-ios-swap"></span>
                <span>Interceptors</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                    <li class="link">
                        <a href="interceptors/ErrorInterceptor.html" data-type="entity-link">ErrorInterceptor</a>
                    </li>
                    <li class="link">
                        <a href="interceptors/JwtInterceptor.html" data-type="entity-link">JwtInterceptor</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AccessGuard.html" data-type="entity-link">AccessGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/ApiError.html" data-type="entity-link">ApiError</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ContactInfo.html" data-type="entity-link">ContactInfo</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Location.html" data-type="entity-link">Location</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Marker.html" data-type="entity-link">Marker</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Office.html" data-type="entity-link">Office</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Register.html" data-type="entity-link">Register</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/RouteInfo.html" data-type="entity-link">RouteInfo</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/User.html" data-type="entity-link">User</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/UserCard.html" data-type="entity-link">UserCard</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/UserCard-1.html" data-type="entity-link">UserCard</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
