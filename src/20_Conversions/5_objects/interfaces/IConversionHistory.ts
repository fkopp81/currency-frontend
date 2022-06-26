import { ECurrency } from "../../../25_Currency/5_objects/interfaces/ECurrency";
import { IConversion } from "./IConversion";
import { TDate } from "./types";

export interface IConversionHistory extends
  Record<TDate, Partial<Record<ECurrency, IConversion>>> { }