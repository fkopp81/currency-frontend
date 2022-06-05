import LocalStoragePersistance from "../implementations/LocalStoragePersistance"
import { IPersistance } from "../interfaces/IPersistance";

describe("local store persistance", () =>
{
  test('save uses localStorage set', () =>
  { 
    // Arrange
    const localStoragePersistance: IPersistance = new LocalStoragePersistance();

    const setMock = jest.fn();
    const getMock = jest.fn(() => "getMockResult");
    global.localStorage.__proto__.setItem = setMock;
    global.localStorage.__proto__.getItem = getMock;

    const testKey = "testStore";
    const testValue = {test: true};
    // Act
    localStoragePersistance.save(testKey, testValue);
    // Assert
    expect(setMock).toHaveBeenCalled();
    expect(getMock).not.toHaveBeenCalled();
  });
  
  test('load uses localStorage get', () =>
  { 
    // Arrange
    const localStoragePersistance: IPersistance = new LocalStoragePersistance();
    
    const testKey = "testStore";
    const testValue = '{"test": true}';

    const setMock = jest.fn();
    const getMock = jest.fn(() => testValue);
    global.localStorage.__proto__.setItem = setMock;
    global.localStorage.__proto__.getItem = getMock;
    // Act
    localStoragePersistance.load(testKey)
    // Assert
    expect(setMock).not.toHaveBeenCalled();
    expect(getMock).toHaveBeenCalled();
  });

  test('load throws error when key not present', () =>
  {
    // Arrange
    const localStoragePersistance: IPersistance = new LocalStoragePersistance();
    
    const setMock = jest.fn();
    const getMock = jest.fn();
    global.localStorage.__proto__.setItem = setMock;
    global.localStorage.__proto__.getItem = getMock;

    const testKey = "testStore";
    // Act
    // Assert
    expect(() => localStoragePersistance.load(testKey)).toThrow();
  });
});


  
