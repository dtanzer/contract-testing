import type {Config} from '@jest/types'

// Sync object
const config: Config.InitialOptions = {
  testEnvironment: "node",
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': [ 'ts-jest', { isolatedModules: true } ],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
export default config
