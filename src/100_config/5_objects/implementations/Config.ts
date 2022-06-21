import { IConfig } from "../interfaces/IConfig";
import ConfigFile from "../files/config.json";
import generateConfig from "./generateConfig";

export default generateConfig(ConfigFile);