<x-guest-layout>
    <div class="py-8 px-4 max-w-md mx-auto">
        @if (session('status'))
            <div class="text-green-500 text-[14px] font-['Outfit'] mb-4">
                {{ session('status') }}
            </div>
        @endif
        <div class="text-white text-lg mb-2">
            {{ __('pixela.verify_email_prompt') }}
        </div>
        <div class="text-gray-400">
            {{ __('pixela.verify_email_prompt_msg') }}
        </div>
        <div class="mt-6">
            <a href="{{ route('login') }}" class="text-[#ec1b69] hover:text-[#ec1b69]/80 transition-colors duration-300">
                {{ __('pixela.go_to_login') }}
            </a>
        </div>
    </div>
</x-guest-layout>