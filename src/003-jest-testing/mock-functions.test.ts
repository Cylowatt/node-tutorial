function forEach(items: any[], callback: (obj: any) => any): void {
  for (let i = 0; i < items.length; i++) {
    callback(items[i]);
  }
}

test('mock functions', () => {
  const mockCallback = jest.fn(x => 42 + x);
  forEach([0, 1], mockCallback);

  // The mock function is called twice.
  expect(mockCallback.mock.calls.length).toBe(2);

  // The first argument of the first call to the function was 0.
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1.
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42.
  expect(mockCallback.mock.results[0].value).toBe(42);
});

test('mock functions 2', () => {
  const myMock = jest.fn();

  const a = new myMock();
  const b = {};
  const bound = myMock.bind(b);
  bound();

  console.log(myMock.mock.instances);

  // The mock function was instantiated exactly twice.
  expect(myMock.mock.instances.length).toBe(2);
});

function valueInjection() {
  // Example 1:
  const myMock = jest.fn();
  console.log(myMock());

  myMock.mockReturnValueOnce(1).mockReturnValueOnce('x').mockReturnValue(true);

  console.log(myMock(), myMock(), myMock(), myMock());

  // Example 2:
  const filterTestFn = jest.fn();

  filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

  const result = [11, 12].filter(num => filterTestFn(num));

  console.log(result);
  console.log(filterTestFn.mock.calls);
}

valueInjection();
