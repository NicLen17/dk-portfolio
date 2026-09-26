import { defineType, defineField, defineArrayMember } from 'sanity'
import { SparklesIcon } from '@sanity/icons/Sparkles'

export const commissionsSettings = defineType({
  name: 'commissionsSettings',
  title: 'Commissions Section (Homepage)',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'localeString',
    }),
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'localeText',
    }),
    defineField({
      name: 'referencePhoto',
      title: 'Sample Reference Photo',
      description: 'The client reference photo for the side-by-side showcase',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'referencePhotoLabel',
      title: 'Reference Photo Badge',
      type: 'localeString',
    }),
    defineField({
      name: 'finalArtwork',
      title: 'Sample Final Artwork',
      description: 'The finalized digital illustration for the side-by-side showcase',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'finalArtworkLabel',
      title: 'Final Artwork Badge',
      type: 'localeString',
    }),
    defineField({
      name: 'commissionInputs',
      title: 'What Can Be Commissioned (Pills)',
      type: 'array',
      of: [defineArrayMember({ type: 'localeString' })],
    }),
    defineField({
      name: 'steps',
      title: '4-Step Commission Process',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Step Number',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Step Label / Description',
              type: 'localeString',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'trustBadge',
      title: 'Trust Badge Tagline',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaSubject',
      title: 'WhatsApp Inquiry Subject',
      type: 'localeString',
    }),
  ],
  preview: {
    select: {
      title: 'headline.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Commissions Section Settings',
        subtitle: 'Homepage Custom Art Showcase',
      }
    },
  },
})
