import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG_PARAMS');

export interface AppConfig{

}
export const WEB_BASE_URL ="http://localhost:4200"
