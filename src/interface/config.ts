import { serverConfig } from './serverConfig';
import { dirConfig } from './dirConfig';
export interface Config {
    port: number;
    servers: Array<serverConfig>;
    dir: dirConfig
}