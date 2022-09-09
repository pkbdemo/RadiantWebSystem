// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import { KeycloakConfig } from "keycloak-js";

// const keycloakConfig: KeycloakConfig = {
//   url: 'https://keycloak-dev.wistron.com/auth',
//   realm: 'k8sdevwhqims',
//   clientId: 'ims'
// };

export const environment = {
  production: false,
  apiServerRootUrl: "http://localhost:5091/",
  apiServerURL: "http://localhost:5091/api/",
  matomoSiteId: -1
  // keycloakConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.