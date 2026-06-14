export default {
  name: 'hero',
  type: 'document',
  title: 'Hero Configuration',
  fields: [
    {
      name: 'branding',
      type: 'string',
      title: 'Top Left Branding Title (e.g., Solar & Secure)'
    },
    /* {
      name: 'logoImage',
      type: 'image',
      title: 'Custom Brand Logo Graphic'
    }, 
    I will be using this once I have a company logo
    */
    {
      name: 'navigationLinks',
      type: 'array',
      title: 'Header Navigation Menu Links',
      description: 'Add and arrange the navigation links for your top navbar.',
      of: [
        {
          type: 'object',
          name: 'navLink',
          title: 'Navigation Link',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Link Label Text (e.g., Services)'
            },
            {
              name: 'urlTarget',
              type: 'string',
              title: 'URL Target Path (e.g., #services or /services.html)'
            }
          ]
        }
      ]
    },
    {
      name: 'mainHeading',
      type: 'string',
      title: 'Main Statement Heading (e.g., SURFACE PERFECTION. / NO SHORTCUTS.)'
    },
    {
      name: 'subHeading',
      type: 'string',
      title: 'Re-inforcing statement'
    },
    {
      name: 'primaryCTA',
      type: 'string',
      title: 'Primary CTA Label (e.g., Request Assessment)'
    },
    {
      name: 'secondaryCTA',
      type: 'string',
      title: 'Secondary CTA Label (e.g., Explore Services)'
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Premium Background Asset Shot',
      options: { hotspot: true }
    }
  ]
}