const { default: ReqResp } = require('../src/ReqResp');

test('Constructs Req/Resp broker', () => {
  const mock = jest.fn(() => new ReqResp());
  const instance = mock();
  expect(mock).toHaveReturned();
  expect(instance).toBeInstanceOf(ReqResp);
});
