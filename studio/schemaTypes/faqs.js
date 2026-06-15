export default {
  name: "faqSection",
  type: "document",
  title: "FAQ Configuration",
  fields: [
    {
      name: "sectionMiniHeading",
      type: "string",
      title: "Section Mini Header Title (e.g., Technical Intelligence)"
    },
    {
      name: "sectionHeading",
      type: "string",
      title: "Section Header Title (e.g., Frequently Asked Questions)"
    },
    {
      name: "sectionDescription",
      type: "text",
      title: "Sidebar Description Text",
      rows: 3
    },
    {
      name: "ctaLabel",
      type: "string",
      title: "Button CTA Label (e.g., Ask A Question)"
    },
    {
      name: "faqList",
      type: "array",
      title: "Accordions List",
      description: "Add, remove, and reorder your accordion items.",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "Accordion Panel Blueprint",
          fields: [
            {
              name: "question",
              type: "string",
              title: "Accordion Trigger Title / Question"
            },
            {
              name: "answer",
              type: "text",
              title: "Accordion Secret Panel Text / Answer",
              rows: 4
            }
          ]
        }
      ]
    }
  ]
};