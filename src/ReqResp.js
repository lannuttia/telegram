/**
 * @class ReqResp
 * @classdesc This class implements a request/response broker that can be used to actively request
 *            information. This would typically be used with a technology such as HTTP.
 */
class ReqResp {
  #registrations = new Map();

  /**
   * Callback for handling the request.
   *
   * @callback handleRequest
   * @param {*} payload - The payload that was passed as an argument to the request method.
   */

  /**
   * @param {*} topic - The topic that the handler should be registered for.
   * @param {*} key - The value that is used to uniquely identify the handler.
   * @param {handleRequest} handler - The callback that should handle the request.
   * @returns {void}
   */
  register(topic, key, handler) {
    if (this.#registrations.has(topic)) {
      const map = this.#registrations.get(topic);
      map.set(key, handler);
    } else {
      this.#registrations.set(topic, new Map([[key, handler]]));
    }
  }

  /**
   * @param {*} topic - The topic that the handler should be unregistered from.
   * @param {*} key - The value that was used to uniquely identify the handler when subscribing.
   * @returns {boolean} True if unregistering was successful, false otherwise.
   */
  unregister(topic, key) {
    if (this.#registrations.has(topic)) {
      const map = this.#registrations.get(topic);
      const deleted = map.delete(key);
      if (map.size === 0) {
        this.#registrations.delete(topic);
      }
      return deleted;
    }
    return false;
  }

  /**
   * @param {*} topic - The topic that should be requested.
   * @param {*} payload - The payload that should be passed to the topic handler callback.
   * @returns {Array<*>} An array of the values returned by the registered handlers.
   */
  request(topic, payload) {
    if (this.#registrations.has(topic)) {
      const map = this.#registrations.get(topic);
      return Array.from(map.values()).map(handler => handler(payload));
    }
    return [];
  }
}

export default ReqResp;
