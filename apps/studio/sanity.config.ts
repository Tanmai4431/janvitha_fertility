import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { deskStructure } from './deskStructure'
import { StudioLogo } from './components/StudioLogo'
import client from '../../client.json'

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID || (client as any).sanity?.projectId || 'xwuayh4h'
const dataset = import.meta.env.SANITY_STUDIO_DATASET || (client as any).sanity?.dataset || 'production'

export default defineConfig({
  name: 'default',
  title: `${client.business.name} CMS`,

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  studio: {
    components: {
      logo: StudioLogo,
    },
  },

  schema: {
    types: schemaTypes,
  },

  vite: (prev: Record<string, any>) => ({
    ...prev,
    optimizeDeps: {
      ...prev.optimizeDeps,
      include: [
        ...(prev.optimizeDeps?.include || []),
        'refractor',
      ],
    },
  }),
})
