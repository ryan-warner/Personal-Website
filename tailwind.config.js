module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  safelist: [
    "animate-[spin_10s_linear_infinite]",
    "animate-[spin_12s_linear_infinite]",
    "animate-[spin_14s_linear_infinite]",
    "animate-[spin_16s_linear_infinite]",
    "animate-[spin_18s_linear_infinite]",
    "animate-[spin_20s_linear_infinite]",
    "animate-[spin_22s_linear_infinite]",
    "animate-[spin_24s_linear_infinite]",
    "animate-[spin_26s_linear_infinite]",
    "animate-[spin_28s_linear_infinite]",
    "animate-[spin_30s_linear_infinite]",
    "animate-[spin_32s_linear_infinite]",
    "animate-[spin_34s_linear_infinite]",
    "animate-[spin_36s_linear_infinite]",
    "animate-[spin_38s_linear_infinite]",
    "animate-[spin_40s_linear_infinite]",
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
