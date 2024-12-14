const { siteUrl } = require('./next-sitemap.config');
const cmsDomain = process.env.NODE_ENV === 'production' ? 'localhost' : "localhost";
const protocol = process.env.NODE_ENV === 'production' ? 'http' : 'http';
// bundle analyzer 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfigp} */
const nextConfig = {

    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
        remotePatterns: [{
            protocol: "http",
            hostname: "localhost",
            port: '8080',
            pathname: '/**'
        }],
    },
    env: {
        url: `${protocol}://${cmsDomain}`,
        siteUrl: "https://greatspice.co.nz",
        name: "Great Spice Papamoa",
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.watchOptions = {
            ignored: [
              '**/.git/**',
              '**/node_modules/**',
              '/mnt/d',
              '/mnt/c/pagefile.sys',
            ],
          };
        }
        return config;
      },
    async redirects() {
        return [
            {
                source: '/gallery',
                destination: '/gallery/image-gallery',
                permanent: true,
            }

        ];
    },
}

module.exports = withBundleAnalyzer(nextConfig)
