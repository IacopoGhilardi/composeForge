import { defineStore } from 'pinia'
import yaml from 'js-yaml'

interface Port {
  host: string
  container: string
}

interface EnvVar {
  key: string
  value: string
}

interface DockerfileConfig {
  baseImage: string
  baseImageTag: string
  workdir: string
  copy: Array<{ src: string; dest: string }>
  run: string[]
  cmd: string
}

interface Volume {
  named: Array<{
    name: string
    mountPath: string
  }>
  binds: Array<{
    source: string
    target: string
    mode: 'rw' | 'ro'
  }>
}

interface BuildConfig {
  context: string
  args: Array<{
    key: string
    value: string
  }>
}

interface Service {
  name: string
  containerSource: 'image' | 'dockerfile' | 'build'
  image?: string
  build?: BuildConfig
  volumes: Volume
  dockerfile: DockerfileConfig
  ports: Array<{ host: string; container: string }>
  environment: Array<{ key: string; value: string }>
  containerName: string
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
    preview: ''
  }),

  actions: {
    updateBaseConfig(config: BaseConfig) {
      this.baseConfig = config
    },
    addService() {
      this.services.push({
        name: '',
        containerSource: 'image',
        volumes: {
          named: [],
          binds: []
        },
        build: {
          context: '.',
          args: []
        },
        dockerfile: {
          baseImage: '',
          baseImageTag: 'latest',
          workdir: '/app',
          copy: [],
          run: [],
          cmd: ''
        },
        ports: [],
        environment: [],
        containerName: '',
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
    generatePreview() {
      const compose: any = {
        version: this.baseConfig.version,
        services: {},
        volumes: {}
      }

      this.services.forEach(service => {
        if (service.name) {
          compose.services[service.name] = {}

          // Container source configuration
          switch (service.containerSource) {
            case 'image':
              if (service.image) {
                compose.services[service.name].image = service.image
              }
              break
            case 'dockerfile':
              compose.services[service.name].build = {
                context: '.',
                dockerfile: `Dockerfile.${service.name}`
              }
              break
            case 'build':
              if (service.build) {
                compose.services[service.name].build = {
                  context: service.build.context
                }
                if (service.build.args.length > 0) {
                  compose.services[service.name].build.args = service.build.args.reduce(
                    (acc, { key, value }) => {
                      if (key && value) acc[key] = value
                      return acc
                    },
                    {}
                  )
                }
              }
              break
          }

          // Volumes configuration
          const volumes: string[] = []
          
          // Add named volumes
          service.volumes.named.forEach(vol => {
            if (vol.name && vol.mountPath) {
              volumes.push(`${vol.name}:${vol.mountPath}`)
              // Add to top-level volumes if not exists
              if (!compose.volumes[vol.name]) {
                compose.volumes[vol.name] = null
              }
            }
          })

          // Add bind mounts
          service.volumes.binds.forEach(bind => {
            if (bind.source && bind.target) {
              volumes.push(`${bind.source}:${bind.target}:${bind.mode}`)
            }
          })

          if (volumes.length > 0) {
            compose.services[service.name].volumes = volumes
          }
        }
      })

      // Remove empty volumes object
      if (Object.keys(compose.volumes).length === 0) {
        delete compose.volumes
      }

      this.preview = yaml.dump(compose)
    },
    generateDockerfile(service: Service): string {
      const lines = []
      
      // Base image
      lines.push(`FROM ${service.dockerfile.baseImage}:${service.dockerfile.baseImageTag}`)
      
      // Workdir
      if (service.dockerfile.workdir) {
        lines.push(`WORKDIR ${service.dockerfile.workdir}`)
      }
      
      // Copy commands
      service.dockerfile.copy.forEach(({ src, dest }) => {
        if (src && dest) {
          lines.push(`COPY ${src} ${dest}`)
        }
      })
      
      // Run commands
      service.dockerfile.run.forEach(cmd => {
        if (cmd) {
          lines.push(`RUN ${cmd}`)
        }
      })
      
      // CMD
      if (service.dockerfile.cmd) {
        lines.push(`CMD ${service.dockerfile.cmd}`)
      }
      
      return lines.join('\n')
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

      return JSON.stringify(composeData, null, 2)
    }
  }
}) 