// import withBundleAnalyzer from '@next/bundle-analyzer'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.pixabay.com",
      "lh3.googleusercontent.com",
    ],
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },

};


module.exports = nextConfig

// module.exports = (phase, defaultConfig) => {
//   return withBundleAnalyzer(defaultConfig)
// }
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: true
// })
// module.exports = withBundleAnalyzer({
//   images: {
//         domains: [
//           "res.cloudinary.com",
//           "cdn.pixabay.com",
//           "lh3.googleusercontent.com",
//         ],
//       }
// })