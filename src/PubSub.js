export default class PubSub {
  constructor() {
    this._subscriptions = new Map();
  }

  publish(topic, payload) {
    if (this._subscriptions.has(topic)) {
      const callbacks = this._subscriptions.get(topic);
      callbacks.forEach((cb) => {
        cb(payload);
      });
    }
  }

  subscribe(topic, callback) {
    if (this._subscriptions.has(topic)) {
      const callbacks = this._subscriptions.get(topic);
      this._subscriptions.set(topic, [...callbacks, callback]);
    } else {
      this._subscriptions.set(topic, [callback]);
    }
  }

  unsubscribe(topic, callback) {
    if (this._subscriptions.has(topic)) {
      const callbacks = this._subscriptions.get(topic);
      const idx = callbacks.findIndex(callback);
      if (idx > -1) {
        this._subscriptions.set(topic, callbacks.splice(idx, 1));
        return true;
      }
    }
    return false;
  }
}
