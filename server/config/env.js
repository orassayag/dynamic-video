import configJson from './env.json' assert { type: 'json' };
//  After environment variables are supplied,
export default {
  ...configJson,
  server: {
    ...configJson.server,
    logging: {
      ...configJson.server.logging,
    },
  },
};
