/**
 * Created by Mahiraj Singh on 2/8/2017.
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
    .filter('cleanStyle', function () {
        // Create the return function
        // set the required parameter name to **number**
        return function (cleanStyle) {
            switch (cleanStyle) {
                case '1':
                    return 'Standard Clean'
                    break;
                case '2':
                    return 'Deep Clean'
                    break;
                default:
                    return 'NA'
            }
        }
    })
    .filter('miles', function () {
        // Create the return function
        // set the required parameter name to **number**
        return function (distance) {
            if(distance == undefined) {
                return 'na'
            }else{
                return (distance*0.000621371192).toFixed(1) + ' Mi'
            }

        }
    })
    .filter('timeFilter', function () {
        // Create the return function
        // set the required parameter name to **number**
        return function (duration) {
            if(duration == undefined) {
                return 'na'
            }else{
                return duration + ' Mins'
            }

        }
    }).filter('status',function () {
    return function (status) {
        switch (status) {
            case '1':
                return 'Completed'
                break;
            case '2':
                return 'Dropped'
                break;
            case '3':
                return 'Started'
                break;
            case '4':
                return 'Arrived'
                break;
            case '5':
                return 'Accepted'
                break;
            case '6':
                return 'Pending'
                break;
            case '7':
                return 'Rejected'
                break;
            case '8':
                return 'Cancelled'
                break;
            case '9':
                return 'Cancelled'
                break;
            case '10':
                return 'No Response'
                break;
            case '11':
                return 'No Cleaner Found'
                break;
            default:
                return 'NA'
        }
    }
});
