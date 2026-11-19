import {defineArrayMember, defineField, defineType} from 'sanity'

// An AI agent shown on /agents and in the home page teaser.
export const agentType = defineType({
  name: 'agent',
  title: 'AI Agent',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'name'}, validation: (r) => r.required()}),
    defineField({
      name: 'status',
      type: 'string',
      initialValue: 'live',
      options: {list: [{title: 'Live', value: 'live'}, {title: 'Coming soon', value: 'coming-soon'}], layout: 'radio'},
    }),
    defineField({name: 'job', title: 'What it does', type: 'text', rows: 3, validation: (r) => r.required().max(400)}),
    defineField({name: 'outputs', title: 'What you get', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'forWho', title: 'Built for', type: 'string'}),
    defineField({name: 'phase', title: 'Toolbook phase', type: 'string'}),
    defineField({name: 'platform', title: 'Runs on', type: 'string', description: 'e.g. Google Gemini (Gem), ChatGPT, Claude'}),
    defineField({name: 'time', type: 'string', description: 'e.g. 10–20 min per brief'}),
    defineField({name: 'url', title: 'Try it link', type: 'url'}),
    defineField({name: 'guideUrl', title: 'Step-by-step guide link', type: 'url'}),
    defineField({name: 'order', type: 'number', description: 'Lower numbers show first'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'status'}},
})
