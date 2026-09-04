import { defineCliConfig } from 'sanity/cli'
import path from 'path'
import client from '../../client.json'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || (client as any).sanity?.projectId || 'e894k7c2'
const dataset = process.env.SANITY_STUDIO_DATASET || (client as any).sanity?.dataset || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset
  },
  deployment: {
    /**
     * Set to false to use locally installed studio bundle during build
     */
    autoUpdates: false,
  },
  typegen: {
    schema: path.resolve(__dirname, 'schema.json'),
    generates: path.resolve(__dirname, '../web/src/types/sanity.ts'),
    path: path.resolve(__dirname, '../web/src/**/*.{ts,tsx}'),
  },
})
