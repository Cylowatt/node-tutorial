import axios from 'axios';

import foo from './foo';
import Users from './users';

jest.mock('./foo');
jest.mock('axios');

test('should fetch users', () => {
  const users = [{ name: 'Bob' }];
  const resp = { data: users };
  (axios.get as any).mockResolvedValue(resp);

  // Could also use:
  // axios.get.mockImplementation(() => Promise.resolve(resp));

  return Users.all().then(data => expect(data).toEqual(users));
});

test('replace mock function implementation', () => {
  const myMockFn = jest.fn(cb => cb(null, true));

  myMockFn((err: any, val: any) => console.log(val));
});

test('mock import implementation', () => {
  (foo as jest.Mock).mockImplementation(() => 42);
  console.log(foo());
});

test('mock once implementation', () => {
  const myMockFn = jest
    .fn(() => 'default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call');

  console.log(myMockFn(), myMockFn(), myMockFn());
});

test('mock return this', () => {
  const myObj = {
    myMethod: jest.fn().mockReturnThis()
  };

  // Same as:
  const otherObj = {
    myMethod: jest.fn(() => this)
  };
});

test('named mocks', () => {
  const myMockFn = jest
    .fn()
    .mockReturnValue('default')
    .mockImplementation(scalar => 42 + scalar)
    .mockName('add42');
});

test('custom mock matchers', () => {
  const mockFunc = jest.fn().mockName('customMockFn');

  mockFunc(1, 2);
  mockFunc(3, 4);

  // The mock function was called at least once.
  expect(mockFunc).toHaveBeenCalled();
  expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

  // The mock function was called at least once with the specified args.
  expect(mockFunc).toHaveBeenCalledWith(1, 2);
  expect(mockFunc.mock.calls).toContainEqual([1, 2]);

  // The last call to the mock function was called with the specified args.
  expect(mockFunc).toHaveBeenLastCalledWith(3, 4);
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([3, 4]);

  // The first arg of the last call to the mock function was 3.
  // There is no sugar helper for this specific type of assertion.
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(3);

  // All calls and the name of the mock is written as a snapshot.
  expect(mockFunc).toMatchSnapshot();
});
