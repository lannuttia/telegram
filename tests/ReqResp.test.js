const { default: ReqResp } = require('../src/ReqResp');

test('Constructs Req/Resp broker', () => {
  const mock = jest.fn(() => new ReqResp());
  const instance = mock();
  expect(mock).toHaveReturned();
  expect(instance).toBeInstanceOf(ReqResp);
});

describe('Testing registration', () => {
  let broker = null;

  beforeEach(() => {
    broker = new ReqResp();
  });

  test('Checking registration of single responder', () => {
    const mock = jest.fn((topic, key, handler) => broker.register(topic, key, handler));

    mock(Symbol('Some topic'), Symbol('Some key'), () => {});

    expect(mock).toHaveReturned();
  });

  test('Checking registration of multiple responders', () => {
    const mock = jest.fn((topic, key, handler) => broker.register(topic, key, handler));

    mock(Symbol('Some topic'), Symbol('Some key'), () => {});
    mock(Symbol('Another topic'), Symbol('Another key'), () => {});

    expect(mock).toHaveReturnedTimes(2);
  });
});

describe('Testing unregistering', () => {
  let broker = null;
  beforeEach(() => {
    broker = new ReqResp();
  });

  test('Checking unregistration for a single handler', () => {
    const KEY = Symbol('Some key');
    const TOPIC = Symbol('Some topic');
    const mock = jest.fn((topic, key) => broker.unregister(topic, key));

    broker.register(TOPIC, KEY, () => {});

    mock(TOPIC, KEY);

    expect(mock).toHaveReturned();
    expect(mock).toHaveReturnedWith(true);
  });

  test('Checking unregistration for multiple handlers', () => {
    const mock = jest.fn((topic, key) => broker.unregister(topic, key));
    const TOPIC = Symbol('Some topic');
    const KEYS = Object.freeze([
      Symbol('Some key'),
      Symbol('Another key'),
    ]);
    KEYS.forEach(key => broker.register(TOPIC, key, () => {}));
    KEYS.forEach(key => mock(TOPIC, key));
    KEYS.forEach(key => mock(TOPIC, key));

    expect(mock).toHaveReturnedTimes(4);
    expect(mock).toHaveNthReturnedWith(1, true);
    expect(mock).toHaveNthReturnedWith(2, true);
    expect(mock).toHaveNthReturnedWith(3, false);
    expect(mock).toHaveNthReturnedWith(4, false);
  });
});

describe('Testing request routing', () => {
  let broker = null;

  beforeEach(() => {
    broker = new ReqResp();
  });

  test('Checking that topic with no responders returns empty array', () => {
    const TOPIC = Symbol('Nonexistent topic');
    const mock = jest.fn(topic => broker.request(topic));

    const response = mock(TOPIC);

    expect(mock).toHaveReturned();
    expect(response).toBeInstanceOf(Array);
    expect(response).toEqual([]);
  });

  test('Checking that topic with responders returns payload array', () => {
    const TOPIC = Symbol('Some topic');
    const KWARGS = Object.freeze([
      { key: Symbol('Some unique key'), payload: Symbol('Some payload') },
      { key: Symbol('Another unique key'), payload: Symbol('Another payload') },
    ]);

    KWARGS.forEach(({ key, payload }) => broker.register(TOPIC, key, () => payload));
    const response = broker.request(TOPIC);
    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBe(2);
    expect(response[0]).toBe(KWARGS[0].payload);
    expect(response[1]).toBe(KWARGS[1].payload);
    KWARGS.forEach(({ key }) => broker.unregister(TOPIC, key));
  });
});
