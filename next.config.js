/** @type {import('next').NextConfig} */
// const isProduction = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: false,
  // output: isProduction ? 'export' : 'standalone',

  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = {
      dns: false,
      fs: false,
      path: false,
      stream: false,
      constants: false,
      tls: false,
      net: false,
      dgram: false,
    };

    return config;
  },
};

module.exports = nextConfig;
/*
module.exports = {
  i18n: {
    locales: ["es-MX","en"],
    defaultLocale: "es-MX",
  },
};
*/

/*

  experimental: {
    // this includes files from the monorepo base two directories up
     outputFileTracingRoot: path.join(__dirname, '../../'),
  },

*/
