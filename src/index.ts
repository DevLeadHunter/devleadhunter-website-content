/**
 * The content contract shared by every DevLeadHunter website template and by demo-host.
 *
 * A template renders this — nothing else. demo-host builds a `SiteContent` (from a Storyblok
 * draft or the API's `content_json`) and passes it, typed, to the template's root component.
 *
 * Golden rule: every key is optional — an empty/absent key hides its section. Only add
 * TRANSVERSE fields here (useful to several trades); a field specific to a single template
 * stays inside that template, not in this shared contract, so it never becomes a god-object.
 */

export interface SiteContentPalette {
  primary?: string
  secondary?: string
  accent?: string
}

export interface SiteContentService {
  title?: string
  description?: string
  icon?: string
}

export interface SiteContentReview {
  author?: string
  rating?: number
  text?: string
}

export interface SiteContentFaqItem {
  question?: string
  answer?: string
}

export interface SiteContentGalleryImage {
  url?: string
  alt?: string
}

export interface SiteContentOpeningHours {
  day?: string
  hours?: string
}

export interface SiteContent {
  businessName?: string
  phone?: string
  email?: string
  city?: string
  area?: string
  subtitle?: string
  palette?: SiteContentPalette

  services?: SiteContentService[]
  reviews?: SiteContentReview[]
  faq?: SiteContentFaqItem[]
  gallery?: SiteContentGalleryImage[]
  zones?: string[]
  openingHours?: SiteContentOpeningHours[]
}

/**
 * Build an empty SiteContent (every section hidden). Handy as a default or in tests.
 * @returns {SiteContent} An empty content object.
 */
export function emptySiteContent(): SiteContent {
  return {}
}
