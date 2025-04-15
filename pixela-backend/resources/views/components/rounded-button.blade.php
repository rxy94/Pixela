@props(['disabled' => false])

<button {{ $attributes->merge(['type' => 'submit', 'class' => 'relative inline-flex items-center justify-center w-full h-[48px] bg-[#181818] border border-transparent rounded-[49px] font-semibold text-[16px] text-white hover:bg-[#ec1b69]/10 hover:border-[#ec1b69] transition-all duration-300 ease-in-out outline-none group']) }}>
    <span class="relative z-10 transition-transform duration-300 group-hover:scale-105">{{ $slot }}</span>
</button> 