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

export interface SiteContentStep {
  /** Titre court de l'étape (ex. « Visite & écoute »). */
  title?: string
  /** Ce qui se passe à cette étape. */
  description?: string
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
  /**
   * Pays de l'entreprise, code ISO 3166-1 alpha-2 (« FR », « CH », « CA »…). Écrit par l'API ; permet à
   * une template de formuler ses propres libellés comme on les lit dans ce pays (voir `regionalLabel`).
   */
  country?: string
  /** Libellé de la licence professionnelle affichée en pied de page (ex. « Licence RBQ »). */
  professionalLicenseLabel?: string
  /** Numéro de la licence professionnelle (ex. « 5678-1234-01 ») ; vide = rien d'affiché. */
  professionalLicenseNumber?: string

  // Editorial (the prospect's own words — tagline + longer story)
  subtitle?: string
  about?: string

  // Editorial copy (client-editable in the CMS; empty = the template's own default text).
  // Pre-filled at generation with the template's real copy so the client edits what he sees.
  /** Grand titre (H1) du hero. Vide = le titre par défaut du template. */
  heroTitle?: string
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
  /** Paragraphe d'introduction sous le titre de la section services (vide = défaut du template). */
  servicesLead?: string
  /** Titre de la section « méthode / comment ça se passe » (vide = défaut du template). */
  stepsHeading?: string
  /**
   * Titre de la section « crédit d'impôt » (services à la personne : 50 % de la facture remboursés
   * en France). Vide = section masquée. Remplie seulement pour une entreprise déclarée.
   */
  taxCreditHeading?: string
  /** Paragraphe qui explique le crédit d'impôt au client final. */
  taxCreditLead?: string
  /** Points clés du crédit d'impôt (ex. « 50 % de la facture remboursés, même sans impôt à payer »). */
  taxCreditPoints?: string[]
  /** Mention en petit sous la section (conditions, plafond annuel de dépenses). */
  taxCreditNote?: string
  /** Paragraphe d'introduction sous le titre de la section réalisations (vide = défaut du template). */
  portfolioLead?: string
  /** Paragraphe d'introduction de la section contact (vide = défaut du template). */
  contactLead?: string
  /** Titre du bandeau d'appel à l'action au-dessus du contact (vide = défaut du template). */
  ctaTitle?: string
  /** Paragraphe du bandeau d'appel à l'action au-dessus du contact (vide = défaut du template). */
  ctaLead?: string
  galleryHeading?: string
  reviewsHeading?: string
  faqHeading?: string
  aboutHeading?: string
  contactHeading?: string
  teamHeading?: string
  portfolioHeading?: string

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
  /** Étapes de la méthode / du déroulé (vide = les étapes par défaut du template). */
  steps?: SiteContentStep[]
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
  method?: string
  taxCredit?: string
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

/**
 * Build the line a template prints for the professional licence (« Licence RBQ 5678-1234-01 »).
 *
 * @param {Pick<SiteContent, 'professionalLicenseLabel' | 'professionalLicenseNumber'>} content - Content carrying the licence fields.
 * @returns {string} The label and number joined by a space, or '' when there is no number (nothing to display).
 */
export function professionalLicenseLine(
  content: Pick<SiteContent, 'professionalLicenseLabel' | 'professionalLicenseNumber'>,
): string {
  const number: string = (content.professionalLicenseNumber ?? '').trim()
  if (!number) {
    return ''
  }
  const label: string = (content.professionalLicenseLabel ?? '').trim()
  return label ? `${label} ${number}` : number
}

/** Libellés écrits en dur par les templates, en français de France, et leur formulation québécoise : phrase exacte au caractère près, pour que l'accord reste juste. */
const QUEBEC_LABELS: Map<string, string> = new Map([
  ['E-mail', 'Courriel'],
  ['E-mail :', 'Courriel :'],
  ['Email', 'Courriel'],
  ['Email :', 'Courriel :'],
  ['EMAIL', 'COURRIEL'],
  ['Votre adresse email', 'Votre adresse courriel'],
  ['Écrire un email', 'Écrire un courriel'],
  ['Devis gratuit', 'Soumission gratuite'],
  ['Devis gratuit et sans engagement', 'Soumission gratuite et sans engagement'],
  ['Devis gratuit et sans engagement.', 'Soumission gratuite et sans engagement.'],
  ['Devis détaillé', 'Soumission détaillée'],
  ['Devis avant réparation', 'Soumission avant réparation'],
  ['Demande de devis', 'Demande de soumission'],
  ['Demander un devis', 'Demander une soumission'],
  ['Demander un devis gratuit', 'Demander une soumission gratuite'],
  ['Demandez votre devis gratuit', 'Demandez votre soumission gratuite'],
  ['Le devis est-il gratuit ?', 'La soumission est-elle gratuite ?'],
  ['Le devis est-il vraiment gratuit ?', 'La soumission est-elle vraiment gratuite ?'],
  ['Artisan électricien', 'Entrepreneur électricien'],
  ['Un seul artisan pour tout votre extérieur', 'Un seul entrepreneur pour tout votre extérieur'],
  ['Visite et devis', 'Visite et soumission'],
  [
    'Passage sur place, puis devis gratuit et détaillé.',
    'Passage sur place, puis soumission gratuite et détaillée.',
  ],
  [
    'Le devis est gratuit et sans engagement, remis avant les travaux.',
    'La soumission est gratuite et sans engagement, remise avant les travaux.',
  ],
  [
    'Un travail soigné, du devis au dernier test',
    'Un travail soigné, de la soumission au dernier test',
  ],
  [
    'Décrivez votre besoin, vous recevez une réponse rapide et un devis gratuit.',
    'Décrivez votre besoin, vous recevez une réponse rapide et une soumission gratuite.',
  ],
  [
    'Par téléphone, par e-mail ou avec le formulaire : réponse rapide et devis gratuit.',
    'Par téléphone, par courriel ou avec le formulaire : réponse rapide et soumission gratuite.',
  ],
  [
    'Oui. Nous nous déplaçons, écoutons votre projet et vous remettons un devis écrit, détaillé et sans engagement, avant tout début de chantier.',
    'Oui. Nous nous déplaçons, écoutons votre projet et vous remettons une soumission écrite, détaillée et sans engagement, avant tout début de chantier.',
  ],
  [
    'Chaque projet commence par une visite et un devis gratuit, et se termine par un extérieur dont on prend plaisir à profiter.',
    'Chaque projet commence par une visite et une soumission gratuite, et se termine par un extérieur dont on prend plaisir à profiter.',
  ],
  [
    'Le plus simple pour demander un devis : un appel, avec une réponse directe.',
    'Le plus simple pour demander une soumission : un appel, avec une réponse directe.',
  ],
  [
    'Entretien, diagnostic et réparations : un atelier de confiance, devis avant intervention.',
    'Entretien, diagnostic et réparations : un atelier de confiance, soumission avant intervention.',
  ],
  [
    'Valise multi-marques, lecture des défauts, recherche de panne. Le devis part du diagnostic, pas l’inverse.',
    'Valise multi-marques, lecture des défauts, recherche de panne. La soumission part du diagnostic, pas l’inverse.',
  ],
  [
    'Courroie / chaîne, pompe à eau, embrayage, joints : interventions planifiées avec devis ferme et délai clair.',
    'Courroie / chaîne, pompe à eau, embrayage, joints : interventions planifiées avec soumission ferme et délai clair.',
  ],
  [
    'Devis transparent avant réparation. Pas de surprise sur la facture : le devis validé, c’est le prix final.',
    'Soumission transparente avant réparation. Pas de surprise sur la facture : la soumission validée, c’est le prix final.',
  ],
  [
    'Contrôle visuel + électronique si besoin. On vous rappelle avec le devis.',
    'Contrôle visuel + électronique si besoin. On vous rappelle avec la soumission.',
  ],
  [
    'Le devis de réparation est établi après diagnostic. On vous l’explique clairement avant toute intervention. Rien n’est lancé sans votre accord.',
    'La soumission de réparation est établie après diagnostic. On vous l’explique clairement avant toute intervention. Rien n’est lancé sans votre accord.',
  ],
  [
    "Un entretien, un devis, une panne ? Appelez l'atelier ou écrivez : on vous répond rapidement.",
    "Un entretien, une soumission, une panne ? Appelez l'atelier ou écrivez : on vous répond rapidement.",
  ],
])

/**
 * Formule un libellé écrit en dur par une template comme on le lit dans le pays de l'entreprise (au Québec, « Devis gratuit » devient « Soumission gratuite »).
 *
 * @param {Pick<SiteContent, 'country'>} content - Contenu portant le pays de l'entreprise.
 * @param {string} label - Libellé de la template, en français de France, au caractère près.
 * @returns {string} Sa formulation québécoise pour une entreprise du Canada quand le libellé est connu, sinon le libellé tel quel.
 */
export function regionalLabel(content: Pick<SiteContent, 'country'>, label: string): string {
  if (content.country?.trim().toUpperCase() !== 'CA') {
    return label
  }
  return QUEBEC_LABELS.get(label) ?? label
}
