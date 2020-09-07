function fetchData(callback: (data: string) => any): void {
  setTimeout(() => callback('peanut butter'), 0);
}

function fetchDataWithPromise(): Promise<string> {
  return Promise.resolve('peanut butter');
}

function failFetchDataWithPromise(): Promise<string> {
  return Promise.reject('error');
}

test('the data is peanut butter', done => {
  fetchData((data: string) => {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  });
});

test('the data is peanut butter promise', () => {
  return fetchDataWithPromise().then(data => {
    expect(data).toBe('peanut butter');
  });
});

test('the fetch fails with an error', () => {
  expect.assertions(1);
  return failFetchDataWithPromise().catch(e => expect(e).toMatch('error'));
});

test('the data is peanut butter resolves', () => {
  return expect(fetchDataWithPromise()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error rejects', () => {
  return expect(failFetchDataWithPromise()).rejects.toMatch('error');
});

test('the data is peanut butter async', async () => {
  const data = await fetchDataWithPromise();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error async', async () => {
  expect.assertions(1);

  try {
    await failFetchDataWithPromise();
  } catch (e) {
    expect(e).toMatch('error');
  }
});

test('the data is peanut butter async resolve', async () => {
  await expect(fetchDataWithPromise()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error async rejects', async () => {
  await expect(failFetchDataWithPromise()).rejects.toMatch('error');
});
