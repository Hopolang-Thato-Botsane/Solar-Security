export default {
  name: 'assessmentModal',
  title: 'Assessment Modal Config',
  type: 'document',
  fields: [
    {
      name: 'modalHeadline',
      title: 'Modal Headline',
      type: 'string',
      initialValue: 'Reserve Technical Assessment'
    },
    {
      name: 'modalSubtitle',
      title: 'Modal Subtitle Copy',
      type: 'text',
      rows: 3,
      initialValue: 'Schedule an on-site structural evaluation. Establish a self-sustaining energy baseline and deploy private telemetry grids tailored to your estate.'
    },
    {
      name: 'serviceOptions',
      title: 'Dynamic Service Type Options',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Off-Grid Solar Integration',
        'Tactical Security Overlays',
        'Unified Systems Integration'
      ]
    },
    {
      name: 'propertyOptions',
      title: 'Dynamic Property Scale Options',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Premium Residential Estate',
        'Commercial / Industrial Asset',
        'Remote Off-Grid Outpost'
      ]
    },
    {
      name: 'submitButtonLabel',
      title: 'Submit Button Label',
      type: 'string',
      initialValue: 'Send Assessment Request'
    }
  ]
}