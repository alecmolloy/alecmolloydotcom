/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.(glsl|vs|fs|vert|frag)$/,
          type: 'asset/source',
        },
      ],
    },
  }),
}

module.exports = nextConfig
