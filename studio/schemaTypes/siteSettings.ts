import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Global Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Website Title',
      type: 'string',
      initialValue: 'DKGRFX — Visual Artist, Designer & Photographer',
    }),
    defineField({
      name: 'artistName',
      title: 'Artist Name / Brand',
      type: 'string',
      initialValue: 'DKGRFX',
    }),
    defineField({
      name: 'location',
      title: 'Artist Location',
      description: 'e.g. "Atlanta, GA"',
      type: 'localeString',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Phone Number',
      description: 'International format, e.g. "16784387649"',
      type: 'string',
      initialValue: '16784387649',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'contact@dkgrfx.com',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      initialValue: '@dkgrfx',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Profile URL',
      type: 'url',
      initialValue: 'https://instagram.com/dkgrfx',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Bio / Tagline',
      type: 'localeText',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Footer Copyright Text',
      type: 'localeString',
    }),
    defineField({
      name: 'defaultWatermarkImage',
      title: 'Global Watermark Logo Image',
      description: 'Upload a PNG/SVG logo with transparency to overlay across gallery photos',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'defaultWatermarkText',
      title: 'Global Watermark Text',
      description: 'Custom text (e.g. "DKGRFX"). Used if no watermark logo image is uploaded.',
      type: 'string',
      initialValue: 'DKGRFX',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Global Site Settings',
        subtitle: 'Contact Info & Social Links',
      }
    },
  },
})
