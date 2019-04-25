export default class ReqResp {
  constructor() {
    this._registrations = new Map();
  }

  register(event, handler) {
    if (this._registrations.has(event)) {
      this._registrations.get(event).push(handler);
    } else {
      this._registrations.set(event, [handler]);
    }
  }

  unregister(event, handler) {
    if (this._registrations.has(event)) {
      const handlers = this._registrations.get(event);
      const idx = handlers.findIndex(handler);
      if (idx > -1) {
        handlers.splice(idx, 1);
        return true;
      }
    }
    return false;
  }

  request(event, payload) {
    if (this._registrations.has(event)) {
      const handlers = this._registrations.get(event);
      return handlers.map(handler => handler(payload));
    }
    return [];
  }
}
