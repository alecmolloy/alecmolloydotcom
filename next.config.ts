import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    })
    return config
  },
  async redirects() {
    return [
      {
        source: '/things/portrait-of-five-cubes',
        destination: 'https://portraitoffivecubes.alecmolloy.com',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
