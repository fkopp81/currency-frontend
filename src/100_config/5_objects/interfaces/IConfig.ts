export interface IConfig
{
  api: {
    baseUrl: string
    latestPath: string
    historicalPath: string
    key: string
  }
  persistanceKeys: {
    conversions: string
  }
}