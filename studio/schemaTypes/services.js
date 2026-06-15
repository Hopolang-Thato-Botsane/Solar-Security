export default {
  name: 'servicesSection',
  type: 'document',
  title: 'Services Configuration',
  fields: [
      {
        name: "sectionMiniHeading",
        type: "string",
        title: "Section Mini Header Title (e.g., What We Do)"
      },
      {
        name: "sectionHeading",
        type: "string",
        title: "Section Header Title (e.g., Services)"
      },
      {
        name: "sectionDescription",
        type: "string",
        title: "Introduction Description"
      },
      {
        name: 'servicesList',
        type: 'array',
        title: 'Services Cards List',
        description: 'Add, remove, and reorder your property service cards.',
        of: [
        {
          type: 'object',
          name: 'serviceCard',
          title: 'Service Card Blueprint',
          fields: [
            {
              name: 'serviceName',
              type: 'string',
              title: 'Service Name (e.g., Off-Grid Solar Array Integration)'
            },
            {
              name: 'serviceDescription',
              type: 'string',
              title: 'Service Description Detailed Text'
            },
            {
              name: 'serviceIcon',
              type: 'image',
              title: 'Service Icon Graphic',
              description: 'Upload a clean vector graphic asset (SVG or PNG) to represent this service.'
            },
            {
              name: 'cardImage',
              type: 'image',
              title: 'Service Showcase Image Asset',
              description: 'Premium photographic asset displaying this specific deployment.',
              options: {
                hotspot: true
              }
            }
          ]
        }
      ]
    }
  ]
}