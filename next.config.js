/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'cdn.shortpixel.ai',
            port: '',
          },
        ],
      },


}

module.exports = nextConfig
