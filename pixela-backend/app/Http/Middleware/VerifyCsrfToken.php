<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        // Rutas API
        'api/*',
        // Rutas de autenticación web (si las necesitas)
        'login',
        'register',
        'password/*'
    ];
} 