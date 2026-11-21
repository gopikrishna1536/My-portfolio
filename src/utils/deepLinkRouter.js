/**
 * Single-Page Application Hash Deep-Link Router
 */
class HashRouter {
  constructor() {
    this.routes = new Map();
    this.notFoundHandler = null;
  }

  addRoute(pattern, handler) {
    this.routes.set(pattern, handler);
  }

  setNotFound(handler) {
    this.notFoundHandler = handler;
  }

  resolve(hash) {
    const cleanHash = (hash || '').replace(/^#\/?/, '');
    const [path, queryString] = cleanHash.split('?');
    const params = new URLSearchParams(queryString || '');

    if (this.routes.has(path)) {
      return this.routes.get(path)({ path, params });
    }
    if (this.notFoundHandler) {
      return this.notFoundHandler({ path, params });
    }
    return { error: 'Route not found', path };
  }
}

module.exports = { HashRouter };
