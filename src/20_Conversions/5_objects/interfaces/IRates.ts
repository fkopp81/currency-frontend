import { ECurrency } from "./ECurrency";

export interface IRates extends Partial<Record<ECurrency, number>>
{
}