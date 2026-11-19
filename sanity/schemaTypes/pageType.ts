import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

// A new page built from ready-made sections, published at /<slug>.
const faqItem = defineArrayMember({
  type: 'object',
  name: 'faq',
  fields: [
    defineField({name: 'question', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'answer', type: 'text', rows: 3, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'question'}},
})

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [{name: 'content', default: true}, {name: 'seo', title: 'SEO & menu'}],
  fields: [
    defineField({name: 'title', type: 'string', group: 'content', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title'},
      description: 'The page address, e.g. "pricing" becomes stacknarrative.com/pricing',
      validation: (r) =>
        r.required().custom((slug) => {
          const reserved = ['about', 'contact', 'blog', 'agents', 'toolbook', 'studio', 'AI-content-ops-guide']
          return slug?.current && reserved.includes(slug.current) ? 'This address is already used by a built-in page' : true
        }),
    }),
    defineField({
      name: 'sections',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'heroSection',
          title: 'Hero',
          fields: [
            defineField({name: 'eyebrow', type: 'string'}),
            defineField({name: 'heading', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'lead', type: 'text', rows: 3}),
            defineField({name: 'buttonLabel', type: 'string'}),
            defineField({name: 'buttonUrl', type: 'string', description: 'A full URL or a site path like /contact'}),
          ],
          preview: {select: {title: 'heading'}, prepare: ({title}) => ({title, subtitle: 'Hero'})},
        }),
        defineArrayMember({
          type: 'object',
          name: 'textSection',
          title: 'Text',
          fields: [
            defineField({name: 'heading', type: 'string'}),
            defineField({name: 'body', type: 'blockContent'}),
          ],
          preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Text', subtitle: 'Text'})},
        }),
        defineArrayMember({
          type: 'object',
          name: 'cardsSection',
          title: 'Cards',
          fields: [
            defineField({name: 'heading', type: 'string'}),
            defineField({
              name: 'cards',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'card',
                  fields: [
                    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
                    defineField({name: 'text', type: 'text', rows: 2}),
                    defineField({name: 'url', type: 'string'}),
                  ],
                }),
              ],
            }),
          ],
          preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Cards', subtitle: 'Cards'})},
        }),
        defineArrayMember({
          type: 'object',
          name: 'faqSection',
          title: 'FAQs',
          fields: [defineField({name: 'heading', type: 'string'}), defineField({name: 'faqs', type: 'array', of: [faqItem]})],
          preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'FAQs', subtitle: 'FAQs'})},
        }),
        defineArrayMember({
          type: 'object',
          name: 'ctaSection',
          title: 'Call to action',
          fields: [
            defineField({name: 'heading', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'text', type: 'text', rows: 2}),
            defineField({name: 'buttonLabel', type: 'string'}),
            defineField({name: 'buttonUrl', type: 'string'}),
          ],
          preview: {select: {title: 'heading'}, prepare: ({title}) => ({title, subtitle: 'Call to action'})},
        }),
      ],
    }),
    defineField({name: 'seoTitle', title: 'SEO title', type: 'string', group: 'seo', validation: (r) => r.max(65)}),
    defineField({name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2, group: 'seo', validation: (r) => r.max(160)}),
    defineField({name: 'showInMenu', title: 'Show in menu', type: 'boolean', group: 'seo', initialValue: false}),
    defineField({
      name: 'menuGroup',
      title: 'Menu group',
      type: 'string',
      group: 'seo',
      initialValue: 'top',
      options: {list: [{title: 'Top level', value: 'top'}, {title: 'Under "Why us"', value: 'why'}, {title: 'Under "Work"', value: 'work'}]},
      hidden: ({parent}) => !parent?.showInMenu,
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
})
