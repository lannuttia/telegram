const { default: PubSub } = require('../src/PubSub');

test('Pub/Sub broker construction', () => {
  const mock = jest.fn(() => new PubSub());
  const instance = mock();
  expect(mock).toHaveReturned();
  expect(instance).toBeInstanceOf(PubSub);
});

const broker = new PubSub();

test('Setting up a Subscription', () => {
  const TOPIC = Symbol('Some garbage topic');
  const [
    firstKey,
    secondKey,
  ] = [
    Symbol('Some unique key'),
    Symbol('Another unique key'),
  ];

  const noop = () => {};
  const subMock = jest.fn(key => broker.subscribe(TOPIC, key, noop));

  const unsubMock = jest.fn(key => broker.unsubscribe(TOPIC, key));

  subMock(firstKey);
  subMock(secondKey);
  expect(subMock).toHaveReturned();
  expect(subMock).toHaveBeenCalledTimes(2);
  unsubMock(firstKey);
  expect(unsubMock).toHaveReturned();
  unsubMock(secondKey);
  expect(unsubMock).toHaveReturned();
  unsubMock(firstKey);
  expect(unsubMock).toHaveReturned();
  expect(unsubMock).toHaveReturnedWith(false);
  expect(unsubMock).toHaveBeenCalledTimes(3);
});

test('Payload routing on publish', () => {
  const TOPIC = Symbol('Some garbage topic');
  const PAYLOAD = Symbol('Some payload');
  const calledMock = jest.fn();

  const publishMock = jest.fn(() => broker.publish(TOPIC, PAYLOAD));
  publishMock();
  expect(publishMock).toHaveReturned();

  const key = Symbol('Some unique key');
  broker.subscribe(TOPIC, key, calledMock);
  publishMock();
  broker.unsubscribe(TOPIC, key);
  expect(calledMock).toHaveBeenCalledTimes(1);
  expect(calledMock).toHaveBeenCalledWith(PAYLOAD);
});
