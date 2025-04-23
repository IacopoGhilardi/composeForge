import { defineStore } from 'pinia'

interface Port {
  host: string
  container: string
}

interface EnvVar {
  key: string
  value: string
}

interface Service {
  name: string
  image: string
  containerName: string
  ports: Port[]
  environment: EnvVar[]
  networks: string[]
  dependsOn: string[]
}

interface Network {
  name: string
  driver: string
  enableIpv6: boolean
  extras?: { [key: string]: string }
}

interface BaseConfig {
  version: string
  projectName: string
  description: string
}

export const useDockerComposeStore = defineStore('dockerCompose', {
  state: () => ({
    baseConfig: {
      version: '3.8',
      projectName: '',
      description: ''
    } as BaseConfig,
    services: [] as Service[],
    networks: [] as Network[],
    environmentVariables: [] as EnvVar[]
  }),

  actions: {
    updateBaseConfig(config: BaseConfig) {
      this.baseConfig = config
    },
    addService() {
      this.services.push({
        name: '',
        image: '',
        containerName: '',
        ports: [],
        environment: [],
        networks: [],
        dependsOn: []
      })
    },
    removeService(index: number) {
      this.services.splice(index, 1)
    },
    addNetwork() {
      this.networks.push({
        name: '',
        driver: 'bridge',
        enableIpv6: false
      })
    },
    removeNetwork(index: number) {
      this.networks.splice(index, 1)
    },
    addEnvironmentVariable() {
      this.environmentVariables.push({
        key: '',
        value: ''
      })
    },
    removeEnvironmentVariable(index: number) {
      this.environmentVariables.splice(index, 1)
    },
    generateDockerCompose() {
      // Convertiamo i dati nel formato richiesto dal backend
      const composeData = {
        version: this.baseConfig.version,
        services: this.services.map(service => ({
          name: service.name,
          image: service.image,
          containerName: service.containerName,
          ports: service.ports.map(p => `${p.host}:${p.container}`),
          environmentVars: service.environment.map(env => `${env.key}=${env.value}`),
          networks: service.networks,
          dependsOn: service.dependsOn
        })),
        networks: this.networks.map(network => ({
          name: network.name,
          driver: network.driver,
          extras: network.enableIpv6 ? { 'enable_ipv6': 'true' } : undefined
        }))
      }

      // Per ora restituiamo una versione formattata JSON
      return JSON.stringify(composeData, null, 2)
    }
  }
}) 