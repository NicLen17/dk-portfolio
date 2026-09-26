import type { StructureResolver } from 'sanity/structure'
import { HomeIcon } from '@sanity/icons/Home'
import { DocumentsIcon } from '@sanity/icons/Documents'
import { ImageIcon } from '@sanity/icons/Image'
import { TagIcon } from '@sanity/icons/Tag'
import { PackageIcon } from '@sanity/icons/Package'
import { CalendarIcon } from '@sanity/icons/Calendar'
import { SparklesIcon } from '@sanity/icons/Sparkles'
import { UserIcon } from '@sanity/icons/User'
import { CogIcon } from '@sanity/icons/Cog'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ── 1. LANDING PAGE SECTIONS ─────────────────────
      S.listItem()
        .title('🏠 Landing Page (Home)')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Landing Page Sections')
            .items([
              // Singleton Hero Section Editor
              S.listItem()
                .title('⚡ Hero Section (Banner & Headlines)')
                .icon(HomeIcon)
                .child(
                  S.document()
                    .schemaType('heroSettings')
                    .documentId('heroSettings')
                    .title('Hero Section Configuration')
                ),
              // Singleton Creative Signature Editor
              S.listItem()
                .title('✨ Creative Signature (Photo → Sketch → Art)')
                .icon(SparklesIcon)
                .child(
                  S.document()
                    .schemaType('creativeSignature')
                    .documentId('creativeSignature')
                    .title('Creative Signature Process')
                ),
              S.listItem()
                .title('🖼️ Selected Work (Featured Projects)')
                .icon(ImageIcon)
                .child(
                  S.documentTypeList('project')
                    .title('Selected Work Projects')
                ),
              S.listItem()
                .title('🏛️ The Practice (3 Visual Pillars with Images)')
                .icon(ImageIcon)
                .child(
                  S.documentTypeList('practicePillar')
                    .title('The Practice Homepage Pillars')
                ),
              // Singleton Commissions Showcase Editor
              S.listItem()
                .title('🎨 Commissions Process (Custom Art Showcase)')
                .icon(SparklesIcon)
                .child(
                  S.document()
                    .schemaType('commissionsSettings')
                    .documentId('commissionsSettings')
                    .title('Commissions Showcase Settings')
                ),
              // Singleton About Preview Editor
              S.listItem()
                .title('👤 About DKGRFX (Landing Preview)')
                .icon(UserIcon)
                .child(
                  S.document()
                    .schemaType('aboutSettings')
                    .documentId('aboutSettings')
                    .title('About Preview Settings')
                ),
              S.listItem()
                .title('📅 Event Highlights (Featured Albums)')
                .icon(CalendarIcon)
                .child(
                  S.documentTypeList('galleryEvent')
                    .title('Featured Event Galleries')
                ),
            ])
        ),

      S.divider(),

      // ── 2. INNER PAGES & COLLECTIONS ─────────────────
      S.listItem()
        .title('📁 Inner Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Page Content Management')
            .items([
              S.listItem()
                .title('/work Page (All Portfolio Projects)')
                .icon(ImageIcon)
                .child(
                  S.documentTypeList('project')
                    .title('Complete Project Archive')
                ),
              S.listItem()
                .title('/services Page (Packages, Text Descriptions & Checklist)')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('service')
                    .title('All Services & Packages')
                ),
              S.listItem()
                .title('/services Page — Art Prints & Merch (Own the Art)')
                .icon(PackageIcon)
                .child(
                  S.documentTypeList('printArtwork')
                    .title('Art Prints & Merch Products')
                ),
              S.listItem()
                .title('/about Page (Full Bio, Story & Stats)')
                .icon(UserIcon)
                .child(
                  S.document()
                    .schemaType('aboutSettings')
                    .documentId('aboutSettings')
                    .title('Full About Page Settings')
                ),
              S.listItem()
                .title('/events Page (All Client Galleries)')
                .icon(CalendarIcon)
                .child(
                  S.documentTypeList('galleryEvent')
                    .title('All Client Event Galleries')
                ),
            ])
        ),

      S.divider(),

      // ── 3. GLOBAL SITE SETTINGS ──────────────────────
      S.listItem()
        .title('⚙️ Global Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Global Contact & Social Links')
        ),

      S.divider(),

      // Catch-all for any other document types
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'siteSettings',
            'heroSettings',
            'creativeSignature',
            'commissionsSettings',
            'aboutSettings',
            'project',
            'service',
            'practicePillar',
            'printArtwork',
            'galleryEvent',
          ].includes(listItem.getId() ?? '')
      ),
    ])
