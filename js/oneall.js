


   // https://docs.oneall.com/api/javascript/library/events/
  
   /* Replace the subdomain with your own subdomain from a Site in your OneAll account */  

/*    
  var oneall_subdomain = 'watchr';
   
  // Asynchronously load the library 
  var oa = document.createElement('script');
  oa.type = 'text/javascript'; oa.async = true;
  oa.src = 'http://' + watchr + '.api.oneall.com/socialize/library.js'
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(oa, s)
*/ 

/*
  var oneall_my_on_login = function(args) {
    console.log(' ALLAH ACBAR ')
    console.log('on_login_redirect ',  args); 

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/oauth?connection_token=" + args.connection.connection_token ); 

      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
      xhr.onreadystatechange = function () {
         if (xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse ( xhr.responseText );
            console.log( 'xhr.responseText ', result );
            if ( result.status == 500 ) {
              block-oneall-phone
            }

         }
      }
      xhr.send();
  }

 */ 
  var oneall_my_on_login_redirect = function(args) {
    return false;
  }
 
  document.cookie = 'referer='+location.href+';max-age=604800;'; 

  //console.log( document.cookie );

  /* Initialise the asynchronous queue */
  var _oneall = _oneall || [];
    
  /* Social Login Example */
  _oneall.push(['social_login', 'set_providers', ['facebook', 'google', 'linkedin']]);
  _oneall.push(['social_login', 'set_grid_sizes', [3,3]]);
  _oneall.push(['social_login', 'set_event', 'on_login_end', oneall_my_on_login]);
  _oneall.push(['social_login', 'set_callback_uri', 'http://'+location.host+'/api/oneall?referer='+location.pathname ]);
  _oneall.push(['social_login', 'set_event', 'on_login_redirect', oneall_my_on_login_redirect ]);
  _oneall.push(['social_login', 'do_render_ui', 'social_login_demo']);

  function getCookie(cname) {
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
  }
  if( get_cookie('connection_token') ){
        oneall_my_on_login_mobile( get_cookie('connection_token') );
  }