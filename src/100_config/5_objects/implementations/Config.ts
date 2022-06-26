import ConfigFile from "../files/config.json";
import ApiFile from "../files/apikey.json";
import generateConfig from "./generateConfig";

export default generateConfig(ConfigFile, ApiFile);