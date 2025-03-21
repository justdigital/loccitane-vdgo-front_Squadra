import { drupal } from "@/libs/drupal"
import type { Metadata } from "next"
import type { DrupalNode } from "next-drupal"

export async function fetchDrupalData(endpoint?: string) {
  try {
    const nodes = await drupal.getResourceCollection<DrupalNode[]>(
      "node--landing_page",
      {
        params: {
          "filter[status]": 1,
          // "filter[id]": '0c913858-d49a-4ca7-b79d-449ee81cf561',
          // "filter[path.alias]": endpoint,
          "fields[node--landing_page]": "field_section, field_image",
          include: "uid,field_section,field_section.field_media.field_media_video_file",
          // sort: "-created",
        },
        next: {
          revalidate: 3600,
        },
      }
    )

    console.log('nodes =====', nodes);
  } catch (error) {
    console.error('Erro ao buscar dados do Drupal:', error)
    throw error
  }
}