export default class PubSub {
  #subscriptions = new Map();

  publish(topic, payload) {
    if (this.#subscriptions.has(topic)) {
      const callbacks = this.#subscriptions.get(topic);
      callbacks.forEach((cb) => {
        cb(payload);
      });
    }
  }

  subscribe(topic, key, callback) {
    if (this.#subscriptions.has(topic)) {
      const map = this.#subscriptions.get(topic);
      this.#subscriptions.set(topic, map.set(key, callback));
    } else {
      this.#subscriptions.set(topic, new Map([[key, callback]]));
    }
  }

  unsubscribe(topic, key) {
    if (this.#subscriptions.has(topic)) {
      const map = this.#subscriptions.get(topic);
      const deleted = map.delete(key);
      if (map.size === 0) {
        this.#subscriptions.delete(topic);
      }
      return deleted;
    }
    return false;
  }
}
