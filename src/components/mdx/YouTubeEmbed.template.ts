import type { Template } from "tinacms";

export const youTubeEmbedTemplate: Template = {
  name: "YouTubeEmbed",
  label: "YouTube Embed",
  fields: [
    {
      name: "videoId",
      label: "YouTube video ID",
      type: "string",
      required: true,
      description: "The 11-character ID from a YouTube URL (e.g. dQw4w9WgXcQ)",
    },
  ],
};
