const env = process.env.NODE_ENV || 'development';

console.log('env *****', env);

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  process.env = { ...process.env, ...config[env] };
}