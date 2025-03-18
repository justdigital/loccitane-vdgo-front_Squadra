import { drupal } from "@/libs/drupal"
import type { Metadata } from "next"
import type { DrupalNode } from "next-drupal"

export async function fetchDrupalData(endpoint?: string) {
  try {
    const nodes = await drupal.getResourceCollection<DrupalNode[]>(
      "node--page",
      {
        params: {
          "filter[status]": 1,
          "fields[node--page]": "title,path,uid,created,field_sections,field_items",
          include: "uid,field_sections,field_sections.field_items",
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