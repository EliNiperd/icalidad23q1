// import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // config.plugins.push(new NodePolyfillPlugin());

      config.resolve.fallback = {
        tls: false,
        net: false,
        fs: false,
        dns: false,
        dgram: false,
        // events: require.resolve('events/'),
        // Añadir otros módulos de Node.js aquí según sea necesario
      };
    }

    return config;
  },
};

export default nextConfig;

/* @type {import('next').NextConfig} */
// const isProduction = process.env.NODE_ENV === 'production';
// const nextConfig = {
//  reactStrictMode: false,
// output: isProduction ? 'export' : 'standalone',
/*
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
*/
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
