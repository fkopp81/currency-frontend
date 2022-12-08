import { IApiFile, IConfig, IConfigFile } from "..";

export default function generateConfig(
  configFile: IConfigFile,
  apiFile: IApiFile = {} as IApiFile
): IConfig {
  if ((configFile as any)?.api?.key)
    throw new Error(`Api key must not be in config file!`);
  const apiKey = apiFile.API_KEY;
  // if (!apiKey) throw new Error("Api key not found!");
  const Config: IConfig = {
    api: { ...configFile.api, key: apiKey },
    persistanceKeys: { ...configFile.persistanceKeys },
  };
  return Config;
}
