import { DConfig, IConfig } from "100_config/5_objects";
import Config from "100_config/5_objects/implementations/Config";
import { container } from "tsyringe";

container.register<IConfig>(DConfig, { useValue: Config });