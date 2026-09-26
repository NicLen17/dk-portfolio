import { defineType, defineField, defineArrayMember } from 'sanity'
import { HomeIcon } from '@sanity/icons/Home'

export const heroSettings = defineType({
  name: 'heroSettings',
  title: 'Hero Section (Homepage)',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Main Headline',
      description: 'The large typography title on the hero banner (use line breaks as needed)',
      type: 'localeText',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading Description',
      description: 'The bold lead description below the headline',
      type: 'localeString',
    }),
    defineField({
      name: 'badge',
      title: 'Badge Tagline',
      description: 'Monospace badge under subheading (e.g. "REAL MOMENTS → ART")',
      type: 'localeString',
    }),
    defineField({
      name: 'categoryTags',
      title: 'Pillar Categories Header',
      description: 'Tags shown above the headline (e.g. ART, DESIGN, PHOTO)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: ['ART', 'DESIGN', 'PHOTO'],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary Button Text',
      type: 'localeString',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary Button Text',
      type: 'localeString',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary Button Link',
      type: 'string',
      initialValue: '/services',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Bottom Bar Tagline',
      type: 'localeString',
    }),
    defineField({
      name: 'slides',
      title: 'Background Carousel Images',
      description: 'Photos displayed in the continuous Ken Burns background slideshow',
      type: 'array',
      of: [
        defineArrayMember({
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
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheading',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Hero Section Settings',
        subtitle: subtitle || 'Homepage Banner Configuration',
      }
    },
  },
})
