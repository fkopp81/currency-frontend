import { DPersistance, IPersistance } from "99_Persistance/4_infrastructure";
import LocalStoragePersistance from "99_Persistance/4_infrastructure/implementations/LocalStoragePersistance";
import { container } from "tsyringe";

container.register<IPersistance>(DPersistance, { useClass: LocalStoragePersistance });