import { defineType, defineField, defineArrayMember } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

export const project = defineType({
  name: 'project',
  title: 'Projects (Portfolio)',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => doc?.title?.en || doc?.title || 'project',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Art & Illustration', value: 'art' },
          { title: 'Graphic Design', value: 'design' },
          { title: 'Photography', value: 'photo' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory / Tagline',
      description: 'e.g. Sports Action, Streetwear, Art Commission, Documentary',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'localeText',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      initialValue: () => new Date().getFullYear().toString(),
      validation: (rule) => rule.required().regex(/^\d{4}$/, { name: 'year', invert: false }),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (rule) => rule.required().warning('Alt text is essential for SEO & accessibility'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Project Gallery Images',
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
              title: 'Alternative Text',
              type: 'string',
            }),
          ],
        }),
      ],
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
      name: 'isCaseStudy',
      title: 'Is this a Case Study?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study Details',
      type: 'object',
      hidden: ({ parent }) => !parent?.isCaseStudy,
      fields: [
        defineField({
          name: 'summary',
          title: 'Case Study Summary',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'phases',
          title: 'Process Phases (Before / After / Sketches)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Phase Title',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Phase Description',
                  type: 'text',
                  rows: 2,
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'images',
                  title: 'Phase Images',
                  type: 'array',
                  of: [
                    defineArrayMember({
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
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
