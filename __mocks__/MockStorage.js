/**
 * A mock of react-native's AsyncStorage
 * based on https://stackoverflow.com/questions/40952566/how-to-test-async-storage-with-jest
 */
export default class MockStorage {
  constructor(cache = {}) {
    this.storageCache = cache;
  }

  setItem = jest.fn((key, value) => {
    return new Promise((resolve, reject) => {
      return (typeof key !== 'string' || typeof value !== 'string')
        ? reject(new Error('key and value must be string'))
        : resolve(this.storageCache[key] = value);
    });
  });

  getItem = jest.fn((key) => {
    return new Promise((resolve) => {
      return this.storageCache.hasOwnProperty(key)
        ? resolve(this.storageCache[key])
        : resolve(null);
    });
  });

  removeItem = jest.fn((key) => {
    return new Promise((resolve, reject) => {
      return this.storageCache.hasOwnProperty(key)
        ? resolve(delete this.storageCache[key])
        : reject('No such key!');
    });
  });

  multiSet = jest.fn( (keyValuePairs) => {
    return new Promise( (resolve, reject) => {
      resolve(keyValuePairs.forEach(pair => {
        this.storageCache[pair[0]] = pair[1]
      }))
      }
    );
    }
  );

  multiGet = jest.fn( (keys) => {
    return new Promise( (resolve, reject) => {
      const result = [];
      keys.forEach(key => {
        const resultPair = [];
        resultPair.push(key);
        resultPair.push(this.storageCache[key]);
        result.push(resultPair);
      });
      resolve(result);
    })
    }

  );

  clear = jest.fn((key) => {
    return new Promise((resolve, reject) =>  resolve(this.storageCache = {}));
  });

  getAllKeys = jest.fn((key) => {
    return new Promise((resolve, reject) => resolve(Object.keys(this.storageCache)));
  });
}
