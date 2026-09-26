import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '1nddltrp',
    dataset: 'production'
  },
  deployment: {
    appId: 'dyvr9554vcmmjyufg14tq23f',
    autoUpdates: true,
  },
  studioHost: 'dkgrfx',
  typegen: {
    path: '../DK-Portfolio/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../DK-Portfolio/src/sanity/sanity.types.ts',
    overloadClientMethods: true,
  },
})
