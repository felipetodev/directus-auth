import { Directus } from '@directus/sdk'

const url = process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL as string

export const directus = new Directus(url)
