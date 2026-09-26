import { defineType, defineField, defineArrayMember } from 'sanity'
import { TagIcon } from '@sanity/icons/Tag'

export const service = defineType({
  name: 'service',
  title: 'Services & Packages (/services)',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Service Name',
      description: 'e.g. PHOTOGRAPHY, GRAPHIC DESIGN, CUSTOM ARTWORK',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Label',
      type: 'string',
      options: {
        list: [
          { title: 'PHOTO', value: 'photo' },
          { title: 'DESIGN', value: 'design' },
          { title: 'ART', value: 'art' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
    }),
    defineField({
      name: 'items',
      title: 'Bullet Points / Included Offerings',
      description: 'List of features or services included in this package',
      type: 'array',
      of: [defineArrayMember({ type: 'localeString' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'cta',
      title: 'Button CTA Text',
      description: 'e.g. "BOOK DKGRFX", "START A PROJECT", "START A COMMISSION"',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaService',
      title: 'Inquiry Subject for WhatsApp',
      description: 'The service name that will pre-fill the WhatsApp chat message',
      type: 'string',
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
      titleEn: 'title.en',
      titleEs: 'title.es',
      subtitle: 'category',
    },
    prepare({ titleEn, titleEs, subtitle }) {
      return {
        title: titleEn || titleEs || 'Untitled Service',
        subtitle: subtitle ? subtitle.toUpperCase() : '',
      }
    },
  },
})
