import mockConversionHistory from "../../domain/tests/mockIConversionHistory";
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
    // Act
    localStoragePersistance.save(testKey, mockConversionHistory);
    // Assert
    expect(setMock).toHaveBeenCalled();
    expect(getMock).not.toHaveBeenCalled();
  });
  
  test('load uses localStorage get', () =>
  { 
    // Arrange
    const localStoragePersistance: IPersistance = new LocalStoragePersistance();
    
    const setMock = jest.fn();
    const getMock = jest.fn(() => '{"test": true}');
    global.localStorage.__proto__.setItem = setMock;
    global.localStorage.__proto__.getItem = getMock;

    const testKey = "testStore";
    // Act
    localStoragePersistance.load(testKey)
    // Assert
    expect(setMock).not.toHaveBeenCalled();
    expect(getMock).toHaveBeenCalled();
  });
});


  
