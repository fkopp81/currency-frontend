import mockConversionHistory from "../../domain/tests/mockIConversionHistory";
import LocalStoragePersistance from "../implementations/localStorage";
import { IPersistance } from "../interfaces/IPersistance";

describe("local store persistance", () =>
{
  test('save uses localStorage set', () =>
  { 
    // Arrange
    const localStoragePersistance: IPersistance = new LocalStoragePersistance();
    const setSpy = jest.spyOn(global.localStorage, "setItem");
    const getSpy = jest.spyOn(global.localStorage, "getItem");

    const testKey = "testStore";
    // Act
    localStoragePersistance.save(testKey, mockConversionHistory);
    // Assert
    expect(setSpy).toHaveBeenCalled();
    expect(getSpy).not.toHaveBeenCalled();
  });
  
  test('load uses localStorage get', () =>
  { 
    // Arrange
    const localStoragePersistance: IPersistance = new LocalStoragePersistance();
    const setSpy = jest.spyOn(global.localStorage, "setItem");
    const getSpy = jest.spyOn(global.localStorage, "getItem");

    const testKey = "testStore";
    // Act
    localStoragePersistance.save(testKey, mockConversionHistory);
    // Assert
    expect(setSpy).not.toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalled();
  });
});


  
