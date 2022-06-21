export const DConfig = "IConfig";
export interface IConfig extends IConfigFile
{
  api: IApiPublic & IApiSecret
}

export interface IConfigFile
{
  api: IApiPublic
  persistanceKeys: IPersistanceKeys
}

interface IApiPublic 
{
    baseUrl: string
    latestPath: string
    historicalPath: string
}

interface IApiSecret
{
  key: string
}

interface IPersistanceKeys
{
  conversions: string
}