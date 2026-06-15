export default {
  name: "projectsSection",
  type: "document",
  title: "Strategic Deployments Configuration",
  fields: [
    {
      name: "sectionMiniHeading",
      type: "string",
      title: "Section Mini Header Title (e.g., Infrastructure Register)"
    },
    {
      name: "sectionHeading",
      type: "string",
      title: "Section Header Title (e.g., Strategic Deployments)"
    },
    {
      name: "sectionDescription",
      type: "string",
      title: "Introduction Description Text"
    },
    {
      name: "projectsList",
      type: "array",
      title: "Projects Cards List",
      description: "Add, remove, and reorder your deployment project cards.",
      of: [
        {
          type: "object",
          name: "projectCard",
          title: "Project Card Blueprint",
          fields: [
            {
              name: "projectImage",
              type: "image",
              title: "Project Showcase Image Asset",
              options: { hotspot: true }
            },
            {
              name: "projectTitle",
              type: "string",
              title: "Project Name (e.g., The Karoo Off-Grid Sanctuary)"
            },
            {
              name: "projectLocation",
              type: "string",
              title: "Project Location Description (e.g., Remote High-Security Wilderness Retreat)"
            },
            {
              name: "projectSpecs",
              type: "array",
              title: "Technical Specifications Checklist",
              description: "Add individual technical bullet points (e.g., 'Independent Satellite Telemetry')",
              of: [{ type: "string" }]
            }
          ]
        }
      ]
    }
  ]
};