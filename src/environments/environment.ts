/**
 * Development environment configuration.
 *
 * The apiBaseUrl points to the mock API. To switch to a real mockapi.io
 * endpoint, replace this with your mockapi.io base URL, e.g.:
 *   'https://63e4d3f2.mockapi.io/api/v1'
 *
 * The MockApiInterceptor will pass through any requests that don't match
 * its routes, so switching to a real backend requires only changing this URL
 * and removing the interceptor registration in app.config.ts.
 */
export const environment = {
  production: false,
  apiBaseUrl: '/api/v1',
};
