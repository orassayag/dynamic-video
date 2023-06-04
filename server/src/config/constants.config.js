const CONSTANTS = {
  SERVER: {
    PORT: '8080',
    EXPRESS_LIMIT: '5mb',
  },
  ENVIRONMENTS: {
    LOCAL: 'local',
    DEVELOPMENT: 'dev',
    QA: 'qa',
    PRODUCTION: 'prod',
  },
  DATA: {
    BASE_URL: 'https://usa-api.idomoo.com/api/v2/storyboards/',
    AUTH: `Basic ${btoa('3550:PiKQ1xfuKC22c1c5c0061af12a240e092d93ec6a47gmckwQGhp6')}`,
  },
  AUTH: {
    HTTP_HEADERS: {
      AUTHORIZATION: 'Authorization',
    },
  },
  EVENTS: {
    SERVER_UP: 'server-up',
  },
  NOT_FOUND: 'Not Found',
};

export default CONSTANTS;
