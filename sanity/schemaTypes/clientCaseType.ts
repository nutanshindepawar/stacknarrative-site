import {defineArrayMember, defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

// A client card in the Work section of the home page.
export const clientCaseType = defineType({
  name: 'clientCase',
  title: 'Client work',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({name: 'name', title: 'Client name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'website', type: 'url'}),
    defineField({name: 'segment', title: 'Segment tag', type: 'string', description: 'e.g. Travel distribution'}),
    defineField({name: 'summary', type: 'text', rows: 4, validation: (r) => r.required()}),
    defineField({name: 'deliverables', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({
      name: 'links',
      title: 'Featured work links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'workLink',
          fields: [
            defineField({name: 'label', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'url', type: 'url', validation: (r) => r.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({name: 'order', type: 'number', description: 'Lower numbers show first'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'segment'}},
})
