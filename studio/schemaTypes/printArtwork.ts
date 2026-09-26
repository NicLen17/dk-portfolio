import { defineType, defineField, defineArrayMember } from 'sanity'
import { PackageIcon } from '@sanity/icons/Package'

export const printArtwork = defineType({
  name: 'printArtwork',
  title: 'Art Prints & Merch (Own the Art)',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Artwork / Product Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => doc?.title?.en || doc?.title || 'print',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge Label',
      description: 'e.g. "ART PRINT", "POSTER", "STICKER PACK", "LIMITED EDITION"',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Artwork Image',
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
      name: 'sizes',
      title: 'Available Sizes / Format Specs',
      description: 'List of dimensions (e.g. 8" × 10", 11" × 14", 16" × 20" or Pack details)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      initialValue: ['8" × 10"', '11" × 14"', '16" × 20"'],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Fine Art Print', value: 'print' },
          { title: 'Satin Poster', value: 'poster' },
          { title: 'Sticker Pack', value: 'sticker' },
          { title: 'Merchandise / Apparel', value: 'merch' },
        ],
        layout: 'radio',
      },
      initialValue: 'print',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
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
      badgeEn: 'badge.en',
      badgeEs: 'badge.es',
      media: 'image',
    },
    prepare({ titleEn, titleEs, badgeEn, badgeEs, media }) {
      return {
        title: titleEn || titleEs || 'Untitled Print',
        subtitle: badgeEn || badgeEs || 'ART PRINT',
        media,
      }
    },
  },
})
