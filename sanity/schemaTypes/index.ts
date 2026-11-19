import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {agentType} from './agentType'
import {clientCaseType} from './clientCaseType'
import {pageType} from './pageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, agentType, clientCaseType, pageType],
}
