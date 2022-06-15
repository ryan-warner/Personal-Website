module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  safelist: [
    "animate-[spin-normal_12s_linear_infinite]",
    "animate-[spin-normal_10s_linear_infinite]",
    "animate-[spin-normal_14s_linear_infinite]",
    "animate-[spin-normal_16s_linear_infinite]",
    "animate-[spin-normal_18s_linear_infinite]",
    "animate-[spin-normal_20s_linear_infinite]",
    "animate-[spin-normal_22s_linear_infinite]",
    "animate-[spin-normal_24s_linear_infinite]",
    "animate-[spin-normal_26s_linear_infinite]",
    "animate-[spin-normal_28s_linear_infinite]",
    "animate-[spin-normal_30s_linear_infinite]",
    "animate-[spin-normal_32s_linear_infinite]",
    "animate-[spin-normal_34s_linear_infinite]",
    "animate-[spin-normal_36s_linear_infinite]",
    "animate-[spin-normal_38s_linear_infinite]",
    "animate-[spin-normal_40s_linear_infinite]",
    "animate-[spin-reverse_10s_linear_infinite]",
    "animate-[spin-reverse_12s_linear_infinite]",
    "animate-[spin-reverse_14s_linear_infinite]",
    "animate-[spin-reverse_16s_linear_infinite]",
    "animate-[spin-reverse_18s_linear_infinite]",
    "animate-[spin-reverse_20s_linear_infinite]",
    "animate-[spin-reverse_22s_linear_infinite]",
    "animate-[spin-reverse_24s_linear_infinite]",
    "animate-[spin-reverse_26s_linear_infinite]",
    "animate-[spin-reverse_28s_linear_infinite]",
    "animate-[spin-reverse_30s_linear_infinite]",
    "animate-[spin-reverse_32s_linear_infinite]",
    "animate-[spin-reverse_34s_linear_infinite]",
    "animate-[spin-reverse_36s_linear_infinite]",
    "animate-[spin-reverse_38s_linear_infinite]",
    "animate-[spin-reverse_40s_linear_infinite]"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      },
      animation: {
        'spin-reverse': 'spin-reverse 3s linear infinite',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
