/**
 * Created by admin on 2/8/2017.
 */
angular.module('starter')
    .filter('property', function () {
        // Create the return function
        // set the required parameter name to **number**
        return function (propertyId) {
            switch (propertyId) {
                case '1':
                    return 'Home'
                    break;
                case '2':
                    return 'Apartment'
                    break;
                case '3':
                    return 'Apartment'
                    break;
                case '4':
                    return 'Office'
                    break;
                default:
                    return 'NA'
            }
        }
    })