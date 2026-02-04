import * as fs from 'fs';
import * as path from 'path';

type Stage = 'predeployment' | 'postdeployment';

interface EnvironmentConfig {
  stage: Stage;
  predeployment: {
    loginUrl: string;
    appUrl: string;
  };
  postdeployment: {
    loginUrl: string;
    appUrl: string;
  };
}

export class Environment {
  private static cachedConfig: EnvironmentConfig | null = null;

  private static loadConfig(): EnvironmentConfig {
    if (this.cachedConfig) {
      return this.cachedConfig;
    }

    const configPath = path.resolve(__dirname, '..', 'properties.json');
    const raw = fs.readFileSync(configPath, 'utf-8');
    this.cachedConfig = JSON.parse(raw) as EnvironmentConfig;
    return this.cachedConfig;
  }

  static getStage(): Stage {
    return this.loadConfig().stage;
  }

  static getLoginUrl(): string {
    const config = this.loadConfig();
    return config[this.getStage()].loginUrl;
  }

  static getAppUrl(): string {
    const config = this.loadConfig();
    return config[this.getStage()].appUrl;
  }
}
