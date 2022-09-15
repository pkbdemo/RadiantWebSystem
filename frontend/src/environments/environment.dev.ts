import { KeycloakConfig } from 'keycloak-js'

const keycloakConfig: KeycloakConfig = {
  url: 'https://keycloak-dev.wistron.com/auth',
  realm: 'k8sdevwhqims',
  clientId: 'ims',
}

export const environment = {
  production: false,
  apiServerRootUrl: 'http://ims-backend-dev.k8sqas-whq.k8s.wistron.com/',
  apiServerURL: 'http://ims-backend-dev.k8sqas-whq.k8s.wistron.com/api/',
  keycloakConfig,
}
