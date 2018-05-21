export default {
  
    // Methods to get and set cookies from W3 Schools
    // https://www.w3schools.com/js/js_cookies.asp
  
    // get cookie given the cookie's name
    get(cname){
      const name = cname + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
    },
  
    // set cookie given the cookie's name, value and time*optional
    set(cname, cvalue, exdays = 30){
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      const expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
  }
  