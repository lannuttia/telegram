class ReqResp {
  #registrations = new Map();

  register(event, key, handler) {
    if (this.#registrations.has(event)) {
      const map = this.#registrations.get(event);
      map.set(key, handler);
    } else {
      this.#registrations.set(event, new Map([[key, handler]]));
    }
  }

  unregister(event, key) {
    if (this.#registrations.has(event)) {
      const map = this.#registrations.get(event);
      const deleted = map.delete(key);
      if (map.size === 0) {
        this.#registrations.delete(event);
      }
      return deleted;
    }
    return false;
  }

  request(event, payload) {
    if (this.#registrations.has(event)) {
      const map = this.#registrations.get(event);
      return Array.from(map.values()).map(handler => handler(payload));
    }
    return [];
  }
}

export default ReqResp;
