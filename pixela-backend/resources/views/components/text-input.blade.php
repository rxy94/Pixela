@props(['disabled' => false, 'icon' => null])

@php
    $isPasswordField = isset($attributes['type']) && $attributes['type'] === 'password';
    $inputId = $attributes['id'] ?? 'input_' . uniqid();
@endphp

<div class="relative group overflow-hidden">
    @if($icon)
        <div class="absolute top-0 bottom-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <x-dynamic-component :component="$icon" class="h-5 w-5 text-[#ec1b69]" />
        </div>
    @endif
    
    <input 
        {{ $attributes->merge([
            'class' => 'w-full border border-transparent bg-[#181818] hover:border-gray-500 focus:border-gray-500 hover:border-opacity-70 focus:border-opacity-90 rounded-[49px] transition-all duration-200 ease-out outline-none focus:outline-none focus:ring-0 px-6 placeholder-gray-500/50 placeholder-shown:text-[16px] focus:placeholder-gray-500/30',
            'id' => $inputId
        ]) }} 
        @disabled($disabled)>
    
    @if($isPasswordField)
        <button 
            type="button"
            onclick="togglePassword('{{ $inputId }}')"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#ec1b69] transition-colors duration-200 cursor-pointer z-10 p-1 rounded focus:outline-none"
            aria-label="Mostrar/Ocultar contraseña"
        >
            <div id="eye-open-{{ $inputId }}">
                <x-dynamic-component component="carbon-view" class="h-4 w-4" />
            </div>
            <div id="eye-closed-{{ $inputId }}" class="hidden">
                <x-dynamic-component component="carbon-view-off" class="h-4 w-4" />
            </div>
        </button>
    @endif
    
    <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent translate-y-full opacity-0 group-hover:opacity-80 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 ease-out"></div>
</div>

<style>
/* Estilos para el autocompletado */
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus {
    -webkit-text-fill-color: rgba(255, 255, 255, 0.9) !important;
    -webkit-box-shadow: 0 0 0px 1000px #181818 inset !important;
    transition: background-color 5000s ease-in-out 0s;
    border-radius: 49px !important;
    caret-color: white;
}
</style>

@if($isPasswordField)
<script>
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeOpen = document.getElementById('eye-open-' + inputId);
    const eyeClosed = document.getElementById('eye-closed-' + inputId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeOpen.classList.add('hidden');
        eyeClosed.classList.remove('hidden');
    } else {
        passwordInput.type = 'password';
        eyeOpen.classList.remove('hidden');
        eyeClosed.classList.add('hidden');
    }
}
</script>
@endif
