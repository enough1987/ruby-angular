
// Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
// throw QuotaExceededError. We're going to detect this and just silently drop any calls to setItem
// to avoid the entire page breaking, without having to do a check at each usage of Storage.
if (typeof localStorage === 'object') {
    try {
        localStorage.setItem('localStorage', 1);
        localStorage.removeItem('localStorage');
    } catch (e) {
        Storage.prototype._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function() {};
        alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
    }
}

var settings_production_state = true;


console.log.info = function (log) {
    if (settings_production_state){
        console.log( '%c '+log, 'color: #26459e; text-shadow: 2px 4px 3px rgba(0,0,0,0.3); padding-left: 50px;' );
    }
};
console.log.get = function (log, data) {
    if (settings_production_state){
        console.log('%c '+log+'', 'color: #1aaf26; text-shadow: 2px 4px 3px rgba(0,0,0,0.3); padding-left: 25px;'  );
        console.log( data ); 
    }
};
  
window.clone_obj = function ( a ) {
    if ( typeof a === 'object' ) {
        var b =  JSON.stringify(a);
        b =  JSON.parse(b);
    }
    return b ? b : {};
};

window.count_prop_in_obj = function(a) {
    var count = 0;
    var i;
    for (i in a) {
        if (a.hasOwnProperty(i)) {
            count++;
        }
    }
    return count;
};


window.get_cookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
 };


try {
    var last_visit = window.localStorage.last_visit ? 
            window.localStorage.last_visit : 
            +Date.now()-86400001;
} catch(e) {
    var last_visit = +Date.now()-86400001;
    console.error( e ); 
}
    if ( (+last_visit + 86400000 ) < Date.now() ) {
        var settings = {};
        settings._token = 'guest';
        settings.old_token = 'guest';
        var settings_card = [];
        var settings_user = {};
        window.localStorage.setItem( "settings_hearts", JSON.stringify( [] ) );
        window.localStorage.setItem( "sellerinfo", JSON.stringify( {} ) );
        var last_visit = +Date.now();
    } else { 

try {
    var settings = JSON.parse(window.localStorage.settings) ? JSON.parse(window.localStorage.settings) : {};
} catch(e) {
    var settings = {};
    console.error( e ); 
}
try {
    settings._token = window.localStorage._token ? window.localStorage._token : 'guest';
} catch(e) {
    settings._token = 'guest';
    console.error( e ); 
}
settings.old_token = 'guest';

try {
    var settings_card = JSON.parse(window.localStorage.getItem("settings_card")) ? JSON.parse(window.localStorage.getItem("settings_card")) : [];
} catch(e) {
    var settings_card = [];
    console.error( e );
}
 
try {
    var settings_user = JSON.parse(window.localStorage.getItem("settings_user")) ? JSON.parse(window.localStorage.getItem("settings_user")) : {};
} catch(e) {
    var settings_user = {};
    console.error( e );
}

    } // end else

try {
    if ( ! YMaps ) { 
        console.error( 'YMaps is not goimg' );
        settings.appcurrency = '₤';
        settings.appcur = 'GBP';   
    } else {
        var country = YMaps.location.country;
        console.log.info( 'Ты сейчас в стране под названием ' + country  );
        
        var arrayofcountries = [ 
 "Австрия", "Албания", "Андорра", "Белоруссия", "Бельгия", "Болгария",
 "Босния", "Герцеговина", "Ватикан", "Венгрия",
 "Германия", "Греция", "Дания", "Ирландия", "Исландия",
 "Испания", "Италия", "Латвия", "Литва", "Лихтенштейн",
 "Люксембург", "Македония", "Мальта", "Молдавия", "Монако",
 "Нидерланды", "Норвегия", "Польша", "Португалия",
 "Румыния", "Сан-Марино", "Сербия" , "Словакия",
 "Словения", "Финляндия", "Франция", "Хорватия",
 "Черногория", "Чехия", "Швейцария", "Швеция", "Эстония"
];
        if ( arrayofcountries.indexOf(country) != '-1') {
            settings.appcurrency = '€';
            settings.appcur = 'EUR';    
        } else {
            settings.appcurrency = '$';
            settings.appcur = 'USD';    
        }	
        if ( country  == "Великобритания" || 
             country  == "Украина" || 
             country  == "Россия" ) {
            settings.appcurrency = '₤';
            settings.appcur = 'GBP';           
        }
        console.log.info( 'Твоя валюта ' + settings.appcur );        
    }    
} catch(e) {
    settings.appcurrency = '₤';
    settings.appcur = 'GBP';   
    console.error( e ); 
}
settings.website = 'http://watchr.42team.ru/';
// ulogin


    window.localStorage.setItem( "settings", JSON.stringify( settings ) ); 
    window.localStorage.setItem( "_token", settings._token );                
    window.localStorage.setItem( "settings_card", JSON.stringify( settings_card ) );        
    window.localStorage.setItem( "settings_user", JSON.stringify( settings_user ) );
    window.localStorage.setItem( "last_visit", last_visit ); 
    console.log( 'if users last visit was one day ago, we gonna clean all storage', (+last_visit + 86400000) , Date.now() , ((+last_visit + 86400000 ) < Date.now()) );
