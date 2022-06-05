import { ECurrency } from "./ECurrency";
import { IConversion } from "./IConversion";
import { TDate } from "./types";

export interface IConversionHistory extends
  Record<TDate, Partial<Record<ECurrency, IConversion>>> { }