import { prompts } from '@umijs/utils';
import { Plugin } from './plugin';
import { PluginAPI } from './pluginAPI';
import { IServicePluginAPI } from './service';

export enum GeneratorType {
  generate = 'generate',
  enable = 'enable',
}

export interface IGeneratorOpts {
  key: string;
  name?: string;
  description?: string;
  type?: GeneratorType;
  checkEnable?: {
    (opts: { args: any; api: PluginAPI & IServicePluginAPI }): boolean;
  };
  fn: {
    (opts: {
      args: any;
      api: PluginAPI & IServicePluginAPI;
      generateFile: {
        (opts: {
          path: string;
          target: string;
          data?: any;
          questions?: prompts.PromptObject[];
        }): void;
      };
      updatePackageJSON: {
        (opts: { opts: object; cwd?: string }): void;
      };
      installDeps: {
        (opts: {
          opts: {
            devDependencies?: string[];
            dependencies?: string[];
          };
          cwd?: string;
        }): void;
      };
    }): void;
  };
  plugin: Plugin;
}

export class Generator {
  key: IGeneratorOpts['key'];
  name?: IGeneratorOpts['name'];
  description?: IGeneratorOpts['description'];
  type?: IGeneratorOpts['type'];
  checkEnable?: IGeneratorOpts['checkEnable'];
  fn: IGeneratorOpts['fn'];
  plugin: IGeneratorOpts['plugin'];
  constructor(opts: IGeneratorOpts) {
    this.key = opts.key;
    this.name = opts.name;
    this.type = opts.type;
    this.description = opts.description;
    this.checkEnable = opts.checkEnable;
    this.fn = opts.fn;
    this.plugin = opts.plugin;
  }
}
