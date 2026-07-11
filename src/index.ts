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

export interface SiteContentBeforeAfterPair {
  /** Photo du chantier avant l'intervention. */
  before?: string
  /** Photo du même chantier après l'intervention. */
  after?: string
  /** Libellé court de la réalisation (ex. « Rénovation salle de bain »). */
  label?: string
}

export interface SiteContentTrustItem {
  /** Chiffre ou valeur mise en avant (ex. « 7j/7 », « Devis 0 € »). */
  value?: string
  /** Libellé sous la valeur (ex. « Dépannage & urgences »). */
  label?: string
}

export interface SiteContentSocialLink {
  /** Réseau : facebook, instagram, linkedin, tiktok, youtube, twitter. */
  network?: string
  /** URL complète du profil (ex. « https://facebook.com/monentreprise »). */
  url?: string
}

export interface SiteContent {
  // Identity / contact
  businessName?: string
  phone?: string
  email?: string
  city?: string
  area?: string

  // Editorial (the prospect's own words — tagline + longer story)
  subtitle?: string
  about?: string

  // Editorial copy (client-editable in the CMS; empty = the template's own default text).
  // Pre-filled at generation with the template's real copy so the client edits what he sees.
  /** Petit badge au-dessus du titre du hero (ex. « Artisan plombier »). */
  heroBadge?: string
  /** Points forts courts affichés dans le hero (ex. « Devis gratuit »). */
  heroPoints?: string[]
  /** Texte du bouton d'appel. */
  ctaCallLabel?: string
  /** Texte du bouton de demande de devis. */
  ctaQuoteLabel?: string
  /** Repères de confiance (chiffres/garanties) affichés sous le hero. */
  trustItems?: SiteContentTrustItem[]
  /** Titres des sections communes (vide = titre par défaut du template). */
  servicesHeading?: string
  galleryHeading?: string
  reviewsHeading?: string
  faqHeading?: string
  aboutHeading?: string
  contactHeading?: string

  // Media (scraped/enriched photos of the business and its work)
  heroImage?: string
  aboutImage?: string
  gallery?: SiteContentGalleryImage[]

  // Design
  palette?: SiteContentPalette

  // Structured content (a template renders the subset it needs; empty = hidden section)
  services?: SiteContentService[]
  reviews?: SiteContentReview[]
  faq?: SiteContentFaqItem[]
  zones?: string[]
  openingHours?: SiteContentOpeningHours[]
  /** Réalisations avant/après (paires de photos, éditables par le client dans son CMS). */
  beforeAfter?: SiteContentBeforeAfterPair[]
  /** Liens réseaux sociaux (affichés en pied de page / section contact). */
  social?: SiteContentSocialLink[]
}

/**
 * Build an empty SiteContent (every section hidden). Handy as a default or in tests.
 * @returns {SiteContent} An empty content object.
 */
export function emptySiteContent(): SiteContent {
  return {}
}
