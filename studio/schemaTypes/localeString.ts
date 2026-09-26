import { defineType, defineField } from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String (EN / ES)',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
    defineField({
      name: 'es',
      title: 'Español',
      type: 'string',
    }),
  ],
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized Text (EN / ES)',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'es',
      title: 'Español',
      type: 'text',
      rows: 3,
    }),
  ],
})
