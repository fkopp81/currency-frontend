import { ECurrency } from "../../../25_Currency/5_objects/interfaces/ECurrency";

export interface IRates extends Partial<Record<ECurrency, number>>
{
}