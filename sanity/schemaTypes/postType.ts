import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}}),
    defineField({name: 'author', type: 'reference', to: {type: 'author'}}),
    defineField({
      name: 'mainImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text'})],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({name: 'publishedAt', type: 'datetime'}),
    defineField({
      name: 'excerpt',
      title: 'Description (shows under the title)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'quickAnswer',
      title: 'Quick answer (for AI and featured snippets)',
      description: 'One or two sentences that directly answer the main question of the post. Shown at the top of the article.',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(320),
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key takeaways',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (r) => r.max(6),
    }),
    defineField({name: 'seoTitle', title: 'SEO title (optional)', type: 'string', validation: (r) => r.max(65)}),
    defineField({
      name: 'seoDescription',
      title: 'SEO description (optional, defaults to the description)',
      type: 'text',
      rows: 2,
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          title: 'FAQ',
          fields: [
            defineField({name: 'question', type: 'string'}),
            defineField({name: 'answer', type: 'text'}),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text'})],
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'author.name', media: 'mainImage'},
  },
})