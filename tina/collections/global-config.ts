import type { Collection } from "tinacms";

export const GlobalConfigCollection: Collection = {
  name: "config",
  label: "Global Config",
  path: "src/content/config",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      name: "seo",
      label: "Site Identity & SEO",
      description:
        "Site-wide identity. These values appear on every page — the Site Name is shown in the header navigation and used as the default browser title; the Description is the default for search results and social shares.",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Site Name",
          type: "string",
          required: true,
          description:
            "Shown in the header navigation on every page. Lives in Global Config because it's the same site-wide — each page sets its own browser title via the Meta Title field on the page, and this Site Name is used as the fallback if a page is ever missing one.",
        },
        {
          name: "description",
          label: "Default Meta Description (SEO)",
          type: "string",
          required: true,
          description:
            "Default description shown in search results and social-sharing previews when a page does not provide its own.",
        },
        {
          name: "siteOwner",
          label: "Site Owner (shown in footer)",
          required: true,
          type: "string",
          description: "Your name or company name. Displayed in the site footer.",
          ui: {
            defaultValue: "Your name here"
          },
        },
        {
          name: 'logo',
          label: 'Logo',
          type: 'image',
          description: 'Shown next to the Site Name in the header navigation.',
        }
        //Add more site settings here...
      ],
    },
    {
      name: "nav",
      label: "Navigation Menu",
      description:
        "Links shown in the header navigation. Reorder, add, or remove items below. The Site Name shown to the left of these links is set in Site Identity & SEO above.",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item.title
          };
        },
      },
      fields: [
        {
          name: "title",
          label: "Link Label",
          description: "The text shown in the nav for this link.",
          type: "string",
          required: true
        },
        {
          name: "link",
          label: "Link URL",
          description: "Where this nav item points (e.g. /about or https://example.com).",
          type: "string",
          required: true

        }
      ]
    },
    {
      name: "contactLinks",
      label: "Contact Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item.title
          }
        },
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string"
        },
        {
          name: "link",
          label: "Link",
          type: "string"
        },
        {
          name: "icon",
          label: "Icon",
          description: "Any Tabler icon name, e.g. tabler:brand-x, tabler:book-2, tabler:brand-github. Browse at https://icones.js.org/collection/tabler",
          type: "string"
        }
      ],
    },
    {
      name: "footerStarfield",
      label: "Show starfield in footer",
      type: "boolean",
    }

    // Add other config fields here...
  ]
}
