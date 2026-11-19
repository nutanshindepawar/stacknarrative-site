/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5jspd31o'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({
  api: { projectId, dataset },
  // `npx sanity deploy` updates the hosted Studio at https://stacknarrative-nsp.sanity.studio
  deployment: { appId: 'gh4cmm8y5zfsozhn8smdkh16' },
})
