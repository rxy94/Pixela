<x-guest-layout>
    <form method="POST" action="{{ route('password.store') }}" class="py-4 space-y-6">
        @csrf

        <!-- Titulo del Reset -->
        <h2 class="text-[24px] font-['Outfit'] text-white font-bold mb-8">Bienvenido a Pixela | <span class="text-gray-500">Nueva contraseña</span></h2>

        <!-- Password Reset Token -->
        <input type="hidden" name="token" value="{{ $request->route('token') }}">

        <!-- Email Address -->
        <div class="relative">
            <x-text-input 
                id="email"
                icon="carbon-email" 
                class="block w-full bg-[#181818] text-white/90 text-[16px] font-['Outfit'] pl-10" 
                type="email" 
                name="email" 
                placeholder="{{ __('Email') }}"
                :value="old('email', $request->email)" 
                required 
                autofocus 
                readonly
                autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2 text-[14px] font-['Outfit']" />
        </div>

        <!-- Password -->
        <div class="relative">
            <x-text-input 
                id="password"
                icon="carbon-password" 
                class="block w-full bg-[#181818] text-white/90 text-[16px] font-['Outfit'] pl-10" 
                type="password"
                name="password"
                placeholder="{{ __('Nueva contraseña') }}"
                required 
                autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2 text-[14px] font-['Outfit']" />
        </div>

        <!-- Confirm Password -->
        <div class="relative">
            <x-text-input 
                id="password_confirmation"
                icon="carbon-checkmark" 
                class="block w-full bg-[#181818] text-white/90 text-[16px] font-['Outfit'] pl-10" 
                type="password"
                name="password_confirmation"
                placeholder="{{ __('Confirmar nueva contraseña') }}"
                required 
                autocomplete="new-password" />
            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2 text-[14px] font-['Outfit']" />
        </div>

        <div class="flex items-center justify-between mt-8">
            <div class="w-1/2">
                <x-rounded-button>
                    {{ __('Restablecer contraseña') }}
                </x-rounded-button>
            </div>
            
            <a class="text-[14px] font-['Outfit'] text-gray-500 hover:text-[#ec1b69] transition-colors duration-300" href="{{ route('login') }}">
                {{ __('Volver al login') }}
            </a>
        </div>
    </form>
</x-guest-layout>
