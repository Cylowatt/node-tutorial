let cityDb = new Map<string, string>();

async function initialiseCityDatabase(): Promise<void> {
  cityDb.set('Vienna', 'Austria');
  cityDb.set('San Juan', 'Puerto Rico');
}

async function clearCityDatabase(): Promise<void> {
  cityDb = new Map<string, string>();
}

function isCity(city: string): boolean {
  return cityDb.has(city);
}

beforeAll(() => initialiseCityDatabase());

afterAll(() => clearCityDatabase());

beforeEach(() => initialiseCityDatabase());

afterEach(() => clearCityDatabase());

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

let foodDb = new Map<string, string>();

async function initialiseFoodDatabase(): Promise<void> {
  foodDb.set('Vienna', 'Wiener Schnitzel');
  foodDb.set('San Juan', 'Mofongo');
}

function isValidCityFoodPair(city: string, food: string): boolean {
  return foodDb.get(city) === food;
}

describe('matching cities to foods', () => {
  // Applies only to tests in this describe block.
  // The top-level beforeEach is run before the nested one (this one).
  beforeEach(() => initialiseFoodDatabase());

  test('Vienna <3 sausage', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});

// test.only('2 + 2 = 4', () => {
//   // Only this test will run in the scope/file.
//   // Useful for when there are many tests.
//   expect(2 + 2).toBe(4);
// });
