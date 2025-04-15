@props(['disabled' => false])

<div class="relative group">
    <input {{ $attributes->merge(['class' => 'w-full border border-transparent hover:border hover:border-[#ec1b69] rounded-[49px] transition-all duration-300 delay-75 ease-in-out outline-none focus:outline-none focus:ring-0 focus:border-transparent px-6 placeholder-gray-500/50 placeholder-shown:text-[16px] focus:placeholder-gray-500/30']) }} @disabled($disabled)>
    <div class="absolute inset-0 bg-gradient-to-r from-[#ec1b69]/0 via-[#ec1b69]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[49px] pointer-events-none"></div>
</div>
