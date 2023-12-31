// Polyfills
import 'core-js/es6/object'
import 'core-js/es6/promise'
import 'core-js/es6/number'
import 'core-js/es6/math'
import 'core-js/es6/string'
import 'core-js/es6/array'
import 'core-js/es6/weak-map'
import 'core-js/es6/set'
import 'core-js/es7/array'
import 'core-js/es7/object'

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    wsHost: 'noeddev.widatra.com:8181',
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    authEndpoint: "http://noeddev.widatra.com:8181/AdminVue/pusher/user-auth",
    encrypted: true,
    forceTLS: true,
    userAuthentication: {
      headers: {
        "X-CSRF-Token": token.content,
      },
    },
});

/**
 * Load Vue.js app
 */

require('./main.js');
