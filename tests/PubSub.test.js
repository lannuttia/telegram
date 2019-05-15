const { default: PubSub } = require('../src/PubSub');

test('Pub/Sub broker construction', () => {
  const mock = jest.fn(() => new PubSub());
  const instance = mock();
  expect(mock).toHaveReturned();
  expect(instance).toBeInstanceOf(PubSub);
});
