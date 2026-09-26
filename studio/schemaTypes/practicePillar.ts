import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

export const practicePillar = defineType({
  name: 'practicePillar',
  title: 'The Practice Pillars (Homepage)',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Pillar Title',
      description: 'e.g. ART, DESIGN, PHOTO',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Link',
      type: 'string',
      options: {
        list: [
          { title: 'Art & Illustration (/work?category=art)', value: 'art' },
          { title: 'Graphic Design (/work?category=design)', value: 'design' },
          { title: 'Photography (/work?category=photo)', value: 'photo' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'Short subtitle under card, e.g. "Sports · Campaigns · Branding"',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
    }),
    defineField({
      name: 'items',
      title: 'Pillar Highlight Items',
      description: 'Bullet list items shown under description (e.g. Digital Art, Custom Illustrations)',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'image',
      title: 'Pillar Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'orderRank',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'image',
    },
  },
})
