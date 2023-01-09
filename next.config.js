// import withBundleAnalyzer from '@next/bundle-analyzer'
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // reactStrictMode: true,
//   images: {
//     domains: [
//       "res.cloudinary.com",
//       "cdn.pixabay.com",
//       "lh3.googleusercontent.com",
//     ],
//   },
// };


// module.exports = nextConfig

// module.exports = (phase, defaultConfig) => {
//   return withBundleAnalyzer(defaultConfig)
// }
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true
})
module.exports = withBundleAnalyzer({
  images: {
        domains: [
          "res.cloudinary.com",
          "cdn.pixabay.com",
          "lh3.googleusercontent.com",
        ],
      }
})