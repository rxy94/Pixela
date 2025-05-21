<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&family=Roboto:wght@400;500;600&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-['Roboto'] text-gray-900 antialiased">
        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gradient-to-tr from-[#111111] to-[#181818]">
            <div class="w-full max-w-[960px] mt-6 px-6 py-8 overflow-hidden min-h-[400px] flex items-center bg-[#111111] bg-opacity-95 backdrop-blur-sm rounded-[25px]">
                <div class="flex items-center justify-between w-full">
                    <div class="w-1/2 flex items-center justify-center">
                        {{ $slot }}
                    </div>
                    <!-- Logo -->
                    <div class="w-1/2 flex justify-center">
                        <div class="relative group">
                            <img src="{{ asset('storage/img/Logo-login.svg') }}" alt="Pixela.io" 
                                class="w-48 h-auto transform transition-all duration-500 ease-in-out 
                                       group-hover:scale-110
                                       filter group-hover:brightness-110">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
