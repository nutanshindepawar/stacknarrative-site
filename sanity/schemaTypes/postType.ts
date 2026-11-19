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