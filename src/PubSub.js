/**
 * @class PubSub
 * @classdesc This class implements a publish/subscribe broker that can be used to
 *            passively receive updates. This would typically be used with a
 *            technology such as WebSockets or an HTML5 postMessage.
 */
export default class PubSub {
  #subscriptions = new Map();

  /**
   * @method
   * @name PubSub#publish
   * @param {*} topic - The topic for the payload to be published on.
   * @param {*} payload - The payload that will be published.
   */
  publish(topic, payload) {
    if (this.#subscriptions.has(topic)) {
      const callbacks = this.#subscriptions.get(topic);
      callbacks.forEach((cb) => {
        cb(payload);
      });
    }
  }

  /**
   * Callback for handling the published payload.
   *
   * @callback handlePayload
   * @param {*} payload - The payload that was published.
   */

  /**
   * @method
   * @name PubSub#subscribe
   * @param {*} topic - The topic of interest.
   * @param {*} key - The value that is used to uniquely identify the callback.
   * @param {handlePayload} callback - The callback that will be ran when a payload is published.
   */
  subscribe(topic, key, callback) {
    if (this.#subscriptions.has(topic)) {
      const map = this.#subscriptions.get(topic);
      this.#subscriptions.set(topic, map.set(key, callback));
    } else {
      this.#subscriptions.set(topic, new Map([[key, callback]]));
    }
  }

  /**
   * @method
   * @name PubSub#unsubscribe
   * @param {*} topic - The topic that should be unsubscribed from.
   * @param {*} key - The key that was used when subscribing.
   * @returns {boolean} - True if the unsubscription was successful, false otherwise.
   */
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
