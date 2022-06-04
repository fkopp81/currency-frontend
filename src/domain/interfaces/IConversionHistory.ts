import { IConversion } from "./IConversion";
import { TCurrency, TDate } from "./types";

export interface IConversionHistory
{
  [key: TDate]: {
    [key: TCurrency]: IConversion
  }
}