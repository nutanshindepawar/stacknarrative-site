import type {StructureResolver} from 'sanity/structure'

// Studio sidebar: website content first, blog helpers below.
const MAIN = ['post', 'agent', 'clientCase', 'page', 'category', 'author']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('StackNarrative')
    .items([
      S.documentTypeListItem('post').title('Blog posts'),
      S.documentTypeListItem('agent').title('AI agents'),
      S.documentTypeListItem('clientCase').title('Client work'),
      S.documentTypeListItem('page').title('Pages'),
      S.divider(),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      ...S.documentTypeListItems().filter((item) => item.getId() && !MAIN.includes(item.getId()!)),
    ])
