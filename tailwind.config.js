// tailwind.config.js
module.exports = {
    content: [
        './src/**/*.{ts,tsx}',      // your source files
        './node_modules/flowbite/**/*.js'
    ],
    theme: { extend: {} },
    plugins: [
        require('flowbite/plugin'),
        // (do NOT try to require flowbite-plugin-charts—it doesn’t exist)
    ],
}