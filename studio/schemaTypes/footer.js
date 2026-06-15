export default {
  name: 'footerSection',
  title: 'Footer Section',
  type: 'document',
  groups: [
    { name: 'ctaZone', title: 'CTA Background Zone' },
    { name: 'brandCol', title: 'Brand Metadata' },
    { name: 'navCol', title: 'Navigation Links' },
    { name: 'infraCol', title: 'Infrastructure Links' },
    { name: 'touchCol', title: 'Contact Metrics' },
  ],
  fields: [
    {
      name: 'ctaTitle',
      title: 'CTA Headline',
      type: 'string',
      group: 'ctaZone',
      initialValue: 'Secure Your Infrastructure.'
    },
    {
      name: 'ctaSubtitle',
      title: 'CTA Sub-headline',
      type: 'text',
      rows: 2,
      group: 'ctaZone',
      initialValue: 'Take absolute control of your energy and asset protection.'
    },
    {
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      group: 'ctaZone',
      initialValue: 'Request Technical Consult'
    },
    {
      name: 'ctaBackgroundImage',
      title: 'CTA Parallax Background Image',
      type: 'image',
      group: 'ctaZone',
      options: { hotspot: true }
    },
    {
      name: 'brandName',
      title: 'Brand Display Identity',
      type: 'string',
      group: 'brandCol',
      initialValue: 'Solar&Secure'
    },
    {
      name: 'brandDescription',
      title: 'Brand Description / Bio',
      type: 'text',
      rows: 3,
      group: 'brandCol',
      initialValue: 'Next-generation critical infrastructure engineering. Designing self-sustaining energy matrices and autonomous tactical perimeter grids for premium residential and commercial estates.'
    },
    {
      name: 'socialLinks',
      title: 'Social Engine Handle Matrix',
      type: 'array',
      group: 'brandCol',
      of: [
        {
          type: 'object',
          name: 'socialHandle',
          title: 'Social Handle Channel',
          fields: [
            { name: 'platform', title: 'Platform Label (e.g. LinkedIn)', type: 'string' },
            { name: 'urlTarget', title: 'Destination URL Link Target', type: 'string' },
            { 
              name: 'inlineSvgRaw', 
              title: 'Raw Inline SVG Code', 
              type: 'text', 
              rows: 4,
              description: 'Paste the raw <svg> structural XML paths directly into this box to preserve premium render resolutions.'
            }
          ]
        }
      ]
    },
    {
      name: 'navigationColumnTitle',
      title: 'Navigation Section Column Header',
      type: 'string',
      group: 'navCol',
      initialValue: 'Navigation'
    },
    {
      name: 'navigationLinks',
      title: 'Core Internal Navigation Links',
      type: 'array',
      group: 'navCol',
      of: [
        {
          type: 'object',
          name: 'navLinkItem',
          title: 'Link Node',
          fields: [
            { name: 'label', title: 'Link Label Text', type: 'string' },
            { name: 'urlTarget', title: 'Destination Target ID (e.g. #home)', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'infrastructureColumnTitle',
      title: 'Infrastructure Section Column Header',
      type: 'string',
      group: 'infraCol',
      initialValue: 'Infrastructure'
    },
    {
      name: 'infrastructureLinks',
      title: 'Core Infrastructure Links Matrix',
      type: 'array',
      group: 'infraCol',
      of: [
        {
          type: 'object',
          name: 'infraLinkItem',
          title: 'Link Node',
          fields: [
            { name: 'label', title: 'Link Label Text', type: 'string' },
            { name: 'urlTarget', title: 'Destination Target ID (e.g. #solar)', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'getInTouchColumnTitle',
      title: 'Get In Touch Section Column Header',
      type: 'string',
      group: 'touchCol',
      initialValue: 'Get In Touch'
    },
    {
      name: 'contactDetails',
      title: 'Contact Details Matrix Nodes',
      type: 'array',
      group: 'touchCol',
      of: [
        {
          type: 'object',
          name: 'contactItem',
          title: 'Contact Data Block',
          fields: [
            { 
              name: 'detailText', 
              title: 'Display Detail Text (e.g. 011 xxx xxxx)', 
              type: 'string' 
            },
            { 
              name: 'isPhoneType', 
              title: 'Is Bold Phone Variant Structure?', 
              type: 'boolean',
              initialValue: false,
              description: 'When enabled, applies the dominant bold layout styling.'
            },
            { 
              name: 'isMailTo', 
              title: 'Wrap in hyperlinked Mailto Action Handler?', 
              type: 'boolean',
              initialValue: false 
            },
            { 
              name: 'mailToAddress', 
              title: 'Target Address Hook (e.g. consult@solarandsecure.co.za)', 
              type: 'string',
              hidden: ({ parent }) => !parent?.isMailTo
            }
          ]
        }
      ]
    }
  ]
}