function generatorFactory(responders, payload) {
  function* generator(handlers, data) {
    // eslint-disable-next-line no-restricted-syntax
    for (const handler of handlers) {
      yield handler(data);
    }
  }

  return generator(responders, payload);
}

export default class ReqResp {
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
      return map.delete(key);
    }
    return false;
  }

  request(event, payload) {
    if (this.#registrations.has(event)) {
      const map = this.#registrations.get(event);
      const handlers = map.values();
      return generatorFactory(handlers, payload);
    }

    return null;
  }
}
