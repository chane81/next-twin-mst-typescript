const dotenv = require('dotenv');
const isDev = process.env.NODE_ENV === 'development';
const env = dotenv.config({ path: `./env/.env.${isDev ? 'dev' : 'prod'}` }).parsed || {};

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // .env 값 세팅
  env,

  // 웹팩 설정
  webpack: (config, options) => {
    const originalEntry = config.entry;
    config.plugins = config.plugins || [];

    // devtool 설정
    // if (options.dev) {
    //   config.devtool = 'inline-source-map';
    // }

    // webpack 5 부터는 config.node 안씀 -> resolve.fallback 써야함
    if (!options.isServer) {
      // config.resolve.fallback = {
      //   fs: false,
      //   crypto: false,
      //   path: false,
      //   stream: false,
      // };
    }

    // 개발모드인지 여부 true/false
    // console.log('is development mod?:', options.dev);

    // 기본 플러그인 어떤것을 로드하는지 확인
    // config.plugins.map(data => {
    //   console.log('config name:', data.constructor.name);
    // })

    // 옵션정보 확인
    // console.log('options:', options);

    // entry 설정
    config.entry = async () => {
      const entries = await originalEntry();

      return entries;
    };

    return config;
  },
  images: {
    domains: ['tailwindcss.com'],
  },
};


/**
 * next.js 12.2.3 이후로 next-compose-plugin은 더이상 작동하지 않으므로 
 * 아래와 같이 reduce로 대체
 * 참고: https://dev.to/krzysztofzuraw/migrating-nextjs-plugins-from-next-compose-plugins-2gnl
 */
module.exports = () => {
  // plugin 은 아래 배열에 넣어줄것
  const plugins = [];
  const config = plugins.reduce((acc, next) => next(acc), {
    ...nextConfig,
  });
  return config;
};