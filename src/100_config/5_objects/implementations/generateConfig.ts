import { IConfig, IConfigFile } from "../interfaces/IConfig";

export default function generateConfig(configFile: IConfigFile): IConfig
{
  if ((configFile as any)?.api?.key) throw new Error(`Api key must not be in config file!`);
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("Api key not found in env!");
  const Config: IConfig = {
    api: { ...configFile.api, key: apiKey },
    persistanceKeys: {...configFile.persistanceKeys}
  }
  return Config;
}