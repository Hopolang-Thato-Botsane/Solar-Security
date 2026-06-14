export default {
    name: "process",
    type: "document",
    title: "Process Configuration",
    fields: [
        {
            name: "sectionMiniHeading",
            type: "string",
            title: "Section Mini Header Title (e.g., process)"
        },
        {
            name: "sectionHeading",
            type: "string",
            title: "Section Header Title (e.g., How We Work)"
        },
        {
            name: "sectionDescription",
            type: "string",
            title: "Introduction Description"
        },
        {
            name: "processCards",
            type: "array",
            title: "How We Work, Process Explainer Cards",
            description: "Add and arrange the how we work/process cards",
            of: [
                {
                    type: "object",
                    name: "processCard",
                    title: "Process Card",
                    fields: [
                        {
                            name: "cardNumber",
                            type: "number",
                            title: "Card Number (e.g., 1, 2, 3)"
                        }
                        ,{
                            name: "cardHeading",
                            type: "string",
                            title: "Card Heading (e.g., Site Assessment & Diagnostics)"
                        }
                        ,{
                            name: "cardDescription",
                            type: "string",
                            title: "Card Description"
                        },
                    ]
                },
            ]
        }
    ]
}