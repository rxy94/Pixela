<x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}" class="py-4 space-y-6">
        @csrf

        <!-- Titulo del Login -->
        <h2 class="text-[24px] font-['Outfit'] text-white font-bold mb-8">Bienvenido a Pixela | <span class="text-gray-500">Iniciar sesión</span></h2>

        <!-- Email Address -->
        <div class="relative">
            <x-text-input 
                id="email" 
                class="block w-full bg-[#181818] text-white/90 text-[16px] font-['Outfit'] pl-10
                       transition-all duration-300 ease-in-out
                       hover:border-gray-600 hover:border-2" 
                type="email" 
                name="email" 
                placeholder="Email"
                :value="old('email')" 
                required 
                autofocus 
                autocomplete="username" />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <x-carbon-user-multiple class="h-5 w-5 text-[#ec1b69]" />
            </div>
            <x-input-error :messages="$errors->get('email')" class="mt-2 text-[14px] font-['Outfit']" />
        </div>

        <!-- Password -->
        <div class="relative">
            <x-text-input 
                id="password" 
                class="block w-full bg-[#181818] text-white/90 text-[16px] font-['Outfit'] pl-4
                       transition-all duration-300 ease-in-out
                       hover:border-gray-600 hover:border-2" 
                type="password"
                name="password"
                placeholder="Contraseña"
                required 
                autocomplete="current-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2 text-[14px] font-['Outfit']" />
        </div>

        <!-- Remember Me -->
        <!-- <div class="block mt-4">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox" class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800" name="remember">
                <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{ __('Remember me') }}</span>
            </label>
        </div> -->

        <div class="flex items-center justify-between mt-8">
            <div class="w-1/2">
                <x-rounded-button>
                    Iniciar
                </x-rounded-button>
            </div>
            
            @if (Route::has('password.request'))
                <a class="text-[14px] font-['Outfit'] text-gray-500 hover:text-[#ec1b69] transition-colors duration-300" href="{{ route('password.request') }}">
                    {{ __('¿Olvidaste tu contraseña?') }}
                </a>
            @endif
        </div>
    </form>
</x-guest-layout>
