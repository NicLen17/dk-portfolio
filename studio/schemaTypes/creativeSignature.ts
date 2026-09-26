import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

export const creativeSignature = defineType({
  name: 'creativeSignature',
  title: 'Creative Signature (Process Showcase)',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'localeString',
    }),
    defineField({
      name: 'headingLine1',
      title: 'Heading Line 1',
      description: 'First line of the big title (e.g. "PHOTO → SKETCH →")',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headingLine2',
      title: 'Heading Line 2',
      description: 'Second line of the big title (e.g. "FINAL ART")',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'localeText',
    }),

    // ── STEP 1: REFERENCE PHOTO ──────────────────
    defineField({
      name: 'step1',
      title: 'Step 1: Reference Photo',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Label',
          type: 'localeString',
        }),
        defineField({
          name: 'title',
          title: 'Step Title',
          type: 'localeString',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline / Subtitle',
          type: 'localeString',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'localeText',
        }),
        defineField({
          name: 'image',
          title: 'Reference Photo Image',
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
      ],
    }),

    // ── STEP 2: SKETCH & LINEWORK ────────────────
    defineField({
      name: 'step2',
      title: 'Step 2: Digital Sketch & Linework',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Label',
          type: 'localeString',
        }),
        defineField({
          name: 'title',
          title: 'Step Title',
          type: 'localeString',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline / Subtitle',
          type: 'localeString',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'localeText',
        }),
        defineField({
          name: 'image',
          title: 'Sketch / Linework Image',
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
      ],
    }),

    // ── STEP 3: FINAL ARTWORK ────────────────────
    defineField({
      name: 'step3',
      title: 'Step 3: Final Artwork',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Label',
          type: 'localeString',
        }),
        defineField({
          name: 'title',
          title: 'Step Title',
          type: 'localeString',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline / Subtitle',
          type: 'localeString',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'localeText',
        }),
        defineField({
          name: 'image',
          title: 'Final Artwork Image',
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
      ],
    }),

    // ── CTA BUTTON ──────────────────────────────
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/services',
    }),
  ],
  preview: {
    select: {
      title: 'headingLine1.en',
      subtitle: 'headingLine2.en',
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title || 'PHOTO → SKETCH →'} ${subtitle || 'FINAL ART'}`,
        subtitle: 'Creative Signature Process Settings',
      }
    },
  },
})
