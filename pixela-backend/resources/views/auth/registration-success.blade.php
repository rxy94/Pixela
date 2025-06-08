<x-guest-layout>
    <div class="py-8 px-4 max-w-md mx-auto">

        <!-- Mensaje de éxito -->
        <h2 class="text-[24px] font-['Outfit'] text-white font-bold mb-4">
            {{ __('pixela.registration_thanks_msg') }}
        </h2>
        
        <div class="text-gray-400 mb-8">
            {{ __('pixela.registration_success') }}
        </div>

        <!-- Botón para ir al home -->
        <div class="mb-6 w-full">
            <a href="{{ config('app.frontend_url') }}" 
               class="relative inline-flex items-center justify-center h-[48px] px-16 whitespace-nowrap bg-[#181818] border border-transparent rounded-[49px] font-semibold text-[16px] text-white hover:bg-[#ec1b69]/10 hover:border-[#ec1b69] transition-all duration-300 ease-in-out outline-none group w-1/2">
                <span class="relative z-10 transition-transform duration-300 group-hover:scale-105">
                    {{ __('pixela.start_exploring') }}
                </span>
            </a>
        </div>

    </div>
</x-guest-layout>