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
  /** Photo illustrant le service (carte prestation, soin, plat…), éditable par le client. */
  image?: string
}

export interface SiteContentTeamMember {
  /** Photo du membre de l'équipe. */
  photo?: string
  /** Nom du membre (ex. « Dr Marie Lefèvre »). */
  name?: string
  /** Rôle / spécialité (ex. « Chirurgien-dentiste »). */
  role?: string
  /** Courte présentation du membre. */
  bio?: string
}

export interface SiteContentPortfolioItem {
  /** Photo de la réalisation. */
  image?: string
  /** Titre de la réalisation (ex. « Jardin contemporain à Rennes »). */
  title?: string
  /** Catégorie / type de chantier (ex. « Aménagement paysager »). */
  category?: string
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
  /** Logo de l'entreprise (URL) — utilisé notamment comme favicon. */
  logo?: string
  heroImage?: string
  aboutImage?: string
  gallery?: SiteContentGalleryImage[]
  /**
   * Generic map of template-specific image slots, keyed by a slot name the template chooses
   * (e.g. `midCta`, `contactBackground`, `aboutCollageLeft`). Keeps one-off images a single
   * template renders out of the shared contract's named fields (golden rule) while still making
   * each one an editable, click-to-edit asset in the client's CMS.
   */
  images?: Record<string, string>

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
  /** Membres de l'équipe (photo + nom + rôle), pour les métiers qui présentent leur personnel. */
  teamMembers?: SiteContentTeamMember[]
  /** Réalisations / portfolio (photo + titre + catégorie), éditables par le client. */
  portfolio?: SiteContentPortfolioItem[]
  /** Liens réseaux sociaux (affichés en pied de page / section contact). */
  social?: SiteContentSocialLink[]

  /**
   * Storyblok click-to-edit markers, per section. Present ONLY inside the Visual Editor (the API's
   * `content_json` never carries them), so binding them is inert on the public site. A template
   * spreads the matching entry on each section root via `editableAttrs` to make it clickable.
   */
  _editable?: SiteContentEditable
}

/** Per-section Storyblok `_editable` strings (keyed by the section the template renders). */
export interface SiteContentEditable {
  hero?: string
  trust?: string
  about?: string
  services?: string
  gallery?: string
  reviews?: string
  faq?: string
  beforeAfter?: string
  team?: string
  portfolio?: string
  contact?: string
}

/**
 * Build an empty SiteContent (every section hidden). Handy as a default or in tests.
 * @returns {SiteContent} An empty content object.
 */
export function emptySiteContent(): SiteContent {
  return {}
}

/**
 * Turn a Storyblok `_editable` string into the `data-blok-*` attributes that make a rendered element
 * clickable in the Visual Editor. Framework-agnostic (returns a plain object to spread / `v-bind`);
 * mirrors `@storyblok/js`'s `storyblokEditable`. Returns `{}` outside the editor, so it is a no-op
 * on the public site.
 *
 * @param {string | undefined} editable - A section's `_editable` marker (e.g. `content._editable?.hero`).
 * @returns {Record<string, string>} The `data-blok-c` / `data-blok-uid` attributes, or `{}` when absent/invalid.
 */
export function editableAttrs(editable?: string): Record<string, string> {
  if (!editable) {
    return {}
  }
  try {
    const options: { id?: string | number; uid?: string } = JSON.parse(
      editable.replace(/^<!--#storyblok#/, '').replace(/-->$/, ''),
    )
    if (options && options.id !== undefined && options.uid) {
      return {
        'data-blok-c': JSON.stringify(options),
        'data-blok-uid': `${options.id}-${options.uid}`,
      }
    }
  } catch {
    return {}
  }
  return {}
}
