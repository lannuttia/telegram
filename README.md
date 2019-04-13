### Summary
This repo contains Publish/Subscribe and Request/Response broker implementations written in Javascript.

### Why would I want to use these???
Because loose coupling is important!!! The Pub/Sub pattern is intended to passively push updates on topics. The Req/Resp pattern is intended for actively requesting information from some data source(s). By interfacing with these brokers, instead of directly with the data source, you can ensure looser coupling between consumers and suppliers.

### Supported Environments
Currently my intention is for this to work in both the Node environment as well as in a (modern) browser environment.

If anyone has any ideas or improvements, feel free to open an issue or submit a pull request.
