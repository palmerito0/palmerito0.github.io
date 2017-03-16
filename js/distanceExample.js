(() => {
    const elements = {  //Get all elements
        homeAddress: $('#homeAddress'),
        addressForm: $('#addresses'),
        addresses: $('#addresses').find('input'),
        submit: $('#submitButton'),
        addAddress: $('#addAddress'),
        resultsTable: $('#resultsTable'),
        resultsTableBody: $('#resultsTable trbody'),
        sortable: $('.sortable')
    };
    
    let geocoder = {};
    
    $(document).ready(() => { //Runs on page laod
        
    });
    
    elements.addAddress.click(() => { //Add extra box for address and update addresses array
        elements.addressForm.append('<div class="control"><input class="input" type="text" placeholder="Address to find" /></div>');
        elements.addresses = $('#addresses').find('input');
    });
    
    elements.submit.click(() => {  //Find distance to each address and display when button is pressed
        let promiseArray = [];
        geocoder = new google.maps.Geocoder(); //Create geocoder and establish link to Geocoding API
        
        elements.submit.addClass('is-loading');
        
        elements.addresses.each(function() { //Iterate through each address and make requests to API
            if ($(this).val() != '') {
                promiseArray.push(distanceBetween(geocoder, elements.homeAddress.val(), $(this).val())
                .then(res => {
                    //console.log(`${$(this).val()}: ${res}`);
                    //console.log(elements.resultsTable.html())
                    
                    elements.resultsTable.append(`<tr><td>${$(this).val()}</td><td>${res}</td></tr>`); //Add result to table
                })
                .catch(err => {
                    console.error(`Attempt to geocode address ${$(this).val()} resulted in error ${err}`);
                }));
            }
        });
        
        Promise.all(promiseArray).then(values => {
            elements.submit.removeClass('is-loading');
        });
    });


    /**
     * Finds distance in km between two addresses
     * @returns {Promise}
     * @param {Geocoder} geocoder
     * @param {string} address1
     * @param {string} address2
     */
     
    const distanceBetween = (geocoder, address1, address2) => {
        // Create geocoder object and establish connection to Geocoding API
        let latLng1 = {},
            latLng2 = {};
            
        return new Promise((resolve, reject) => {
            geocode(geocoder, address1)
                .then(res => latLng1 = res)
                .then(res => geocode(geocoder, address2))
                .then(res2 => latLng2 = res2)
                .then(() => {
                    resolve(haversine(latLng1, latLng2));
                })
                .catch(err => reject(err));
            });
    };

    /**
     * Finds distance in km between two latitude and longitude pairs using haversine formula
     * @returns {number}
     * @param {LatLng} latLng1 
     * @param {LatLng} latLng2 
     */
     
    const haversine = (latLng1, latLng2) => {
        let R = 6371, //Earth's radius in kilometers
            lat1Rad = latLng1.lat() * (Math.PI / 180), //Convert to radians
            lat2Rad = latLng2.lat() * (Math.PI / 180),
            deltaLatRad = (latLng2.lat() - latLng1.lat()) * (Math.PI / 180),
            deltaLngRad = (latLng2.lng() - latLng1.lng()) * (Math.PI / 180),

            a = Math.sin(deltaLatRad / 2) * //Haversine formula
            Math.sin(deltaLatRad / 2) +
            Math.cos(lat1Rad) *
            Math.cos(lat2Rad) *
            Math.sin(deltaLngRad / 2) *
            Math.sin(deltaLngRad / 2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
            d = Math.round(R * c * 100) / 100;
                    
        return d;
    };

    /**
     * Takes geocoder object and string address to find latitude and longitude
     * @returns {Promise}
     * @param {Geocoder} geocoder 
     * @param {string} address 
     */
    const geocode = (geocoder, address) => {
        return new Promise((resolve, reject) => {
            geocoder.geocode({ 'address': address },
                (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        resolve(results[0].geometry.location);
                    } else {
                        reject(status);
                    }
                });
        });
    };

    window.connectedToAPI = () => { //Runs when API finishes loading
        console.log('Connection to Google Maps API established.');
    };
})();