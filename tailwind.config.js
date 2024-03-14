/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0091ff",
                'custom-color': '#081C36',
            },
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [require("daisyui")],
}