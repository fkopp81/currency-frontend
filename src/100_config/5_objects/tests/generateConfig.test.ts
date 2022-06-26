import { IConfigFile } from "..";
import ConfigFile from "../files/config.json"
import generateConfig from "../implementations/generateConfig";

describe("generateConfig", () =>
{
  test("generates config", async () =>
  {
    // Arrange
    const testKey = "testKey";
    process.env.API_KEY = testKey;
    const testConfig = ConfigFile;
    const apiFile = {
      API_KEY: testKey
    };
    // Act
    const config = generateConfig(testConfig, apiFile);
    // Assert
    expect(config).toBeTruthy();
  });
  
  test("gets apiKey from environment", async () =>
  {
    // Arrange
    const testKey = "testKey";
    const apiFile = {
      API_KEY: testKey
    };
    const testConfig = ConfigFile;
    // Act
    const config = generateConfig(testConfig, apiFile);
    // Assert
    expect(config.api.key).toBe(testKey);
  })

  test("throws when api key not in env", async () =>
  {
    // Arrange
    const testKey = "";
    const apiFile = {
      API_KEY: testKey
    };
    const testConfig = ConfigFile;
    // Act    // Assert
      expect(() => generateConfig(testConfig, apiFile)).toThrow();
  })

  test("throws when api key is in config file", async () =>
  {
    // Arrange
    const testKey = "testKey";
    const apiFile = {
      API_KEY: testKey
    };
    const testConfig: any = JSON.parse(JSON.stringify(ConfigFile));
    testConfig!.api!.key = testKey;
    // Act
    // Assert
    expect(() => generateConfig(testConfig as IConfigFile, apiFile)).toThrow();
  });
});