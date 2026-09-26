import { defineType, defineField, defineArrayMember } from 'sanity'
import { UserIcon } from '@sanity/icons/User'

export const aboutSettings = defineType({
  name: 'aboutSettings',
  title: 'About the Artist Settings',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'localeString',
    }),
    defineField({
      name: 'previewWords',
      title: 'Homepage Animated Words',
      description: 'The 3 big typographic words shown on the landing page preview',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: ['ART.', 'DESIGN.', 'PHOTO.'],
    }),
    defineField({
      name: 'previewBadge',
      title: 'Homepage Tagline Badge',
      type: 'localeString',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline Tagline',
      type: 'localeString',
    }),
    defineField({
      name: 'previewBio',
      title: 'Homepage Preview Bio',
      description: 'Short intro paragraph shown in the landing page About section',
      type: 'localeText',
    }),

    // ── FULL /ABOUT PAGE CONTENT ─────────────────────
    defineField({
      name: 'fullBioHeading',
      title: 'About Page Main Headline',
      type: 'localeString',
    }),
    defineField({
      name: 'fullBioParagraphs',
      title: 'Artist Story & Philosophy Paragraphs',
      type: 'array',
      of: [defineArrayMember({ type: 'localeText' })],
    }),
    defineField({
      name: 'profileImage',
      title: 'Artist Portrait / Profile Image',
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
      name: 'actionImage',
      title: 'Artist at Work / Action Photo',
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
      name: 'stats',
      title: 'Artist Key Highlights / Metrics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Metric / Stat',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Description',
              type: 'localeString',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Darwin / DKGRFX',
        subtitle: 'Artist Bio, Manifesto, Portrait & Metrics',
      }
    },
  },
})
