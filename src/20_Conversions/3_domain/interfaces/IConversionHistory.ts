import { IConversion } from "./IConversion";
import { TCurrency, TDate } from "./types";

export interface IConversionHistory extends
  Record<TDate, Record<TCurrency, IConversion>> { }