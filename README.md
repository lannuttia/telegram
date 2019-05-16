# Telegram &middot; [![Github License](https://img.shields.io/github/license/lannuttia/telegram.svg?style=plastic)](https://github.com/lannuttia/telegram/blob/master/LICENSE) [![Report an issue!](https://img.shields.io/github/issues/lannuttia/telegram.svg?style=plastic)](https://github.com/lannuttia/telegram/issues)
Telegram is a library for opaque data routing.
* **Simple:** Telegram allows you to easily start opaquely routing payloads.
* **Flexible:** With support for both the Publish/Subscribe pattern as well as the Request/Response pattern, you can passively receive updates or actively acquire data.
* **Loose Coupling** Never tightly couple your consumer code with the provider again. Whether acquiring data via HTTP, WebSockets, or an HTML5 postMessage, never have modify consumer code just because the data source changed.

### Why would I want to use these???
Because loose coupling is important!!! The Pub/Sub pattern is intended to passively push updates on topics. The Req/Resp pattern is intended for actively requesting information from some data source(s). By interfacing with these brokers, instead of directly with the data source, you can ensure looser coupling between consumers and suppliers.

### Supported Environments
Currently my intention is for this to work in both the Node environment as well as in a (modern) browser environment.

If anyone has any ideas or improvements, feel free to open an issue or submit a pull request.