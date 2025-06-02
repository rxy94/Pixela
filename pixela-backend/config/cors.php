<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => [

        'api/*',
        'sanctum/csrf-cookie',
        'login',        // POST /login
        'logout',       // POST /logout
        'register',     // POST /register
        'verify-email', // GET /verify-email
        'verify-email/*', // GET /verify-email/{id}/{hash}
        'confirm-password', // POST /confirm-password
        'confirm-password/*', // POST /confirm-password/{id}/{hash}

    ],

    'allowed_methods'   => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    'allowed_origins'   => ['http://localhost', 'http://localhost:3000', 'http://laravel.test'],
    // PRODUCTION: 'allowed_origins'   => ['http://localhost', 'http://localhost:3000', 'http://laravel.test', 'https://pixela.duckdns.org'],

    'allowed_headers'   => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true
]; 