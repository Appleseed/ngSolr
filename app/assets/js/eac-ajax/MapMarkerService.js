/**
 * This file is subject to the terms and conditions defined in the
 * 'LICENSE.txt' file, which is part of this source code package.
 */
'use strict';

/*---------------------------------------------------------------------------*/
/* Service                                                                   */

/**
 * Creates and configures standard map icons for a Google Map.
 * @param CONSTANTS Application constants
 */
angular.module('MapServices', []).factory('MapMarkerService', ['CONSTANTS', function (CONSTANTS) {

    // the service instance
    var svc = {};

    // a default classifer to icon path mapping
    svc.categoryToIconMap = {
        default:"../assets/img/icon/information.png",
        corporateBody:"../assets/img/icon/house.png",
        government:"../assets/img/icon/house.png",
        organization:"../assets/img/icon/firstaid.png",
        person:"../assets/img/icon/firstaid.png"
    };

    // google map info window
    svc.infowindow = new google.maps.InfoWindow();

    /**
     * Add info window to marker
     * @param Map Google map
     * @param Marker Map marker
     * @param Content HTML content to be displayed in the info window
     */
    svc.addInfoWindow = function (Map, Marker, Content) {
        var infoWindow = new google.maps.InfoWindow({
            content:Content
        });
        google.maps.event.addListener(Marker, 'click', function () {
            infoWindow.close();
            infoWindow.open(Map, Marker);
        });
    };

    /**
     * Get a map marker.
     * @param Map Map
     * @param Title Tooltip label
     * @param Content Popup window HTML content
     * @param Category Item category
     * @param Lat Latitude
     * @param Lng Longitude
     */
    svc.getMarker = function (Map, Title, Content, Category, Lat, Lng) {
        // get the marker icon
        var icon = svc.categoryToIconMap['default'];
        if (Category != null && Category in svc.categoryToIconMap) {
            icon = svc.categoryToIconMap[Category];
        }
        // create the marker
        var marker = new google.maps.Marker({
            icon:icon,
            map:Map,
            position:new google.maps.LatLng(Lat, Lng),
            title:Title
        });
        // attach an info window to the marker
        svc.addInfoWindow(Map, marker, Content);
        // return result
        return marker;
    };

    ///////////////////////////////////////////////////////////////////////

    // @todo consider merging the override icons into the map
    if (CONSTANTS['ICONS'] != undefined && CONSTANTS['ICONS'] != null) {
        svc.categoryToIconMap = CONSTANTS['ICONS'];
    }

    // handle close click event on info window
    google.maps.event.addListener(svc.infowindow, 'close', function () {
        svc.infowindow.close();
    });

    // return the service instance
    return svc;

}]);