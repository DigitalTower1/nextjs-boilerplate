import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'mainImage', type: 'image', options: { hotspot: true } }),
    defineField({ 
      name: 'hoverVideo', 
      title: 'Hover Video URL', 
      type: 'url', 
      description: 'Direct link to .mp4 file for bento grid effects' 
    }),
    defineField({
      name: 'content',
      title: 'Project Content',
      type: 'array',
      of: [
        { type: 'block' }, // Standard text
        { type: 'image' }, // Inline images
        { 
          type: 'object',
          name: 'videoBlock',
          fields: [{ name: 'url', type: 'url' }, { name: 'caption', type: 'string' }]
        }
      ]
    })
  ]
})