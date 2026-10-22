export interface WeddingConfig {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  theme: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    muted: string;
    mutedForeground: string;
    gold: string;
    goldSoft: string;
    paper: string;
    rsvpNavy: string;
    rsvpGold: string;
    sectionGray: string;
  };
  intro: {
    enabled: boolean;
    tapToOpenText: string;
    /** MP4 shown on the “tap to open” screen (envelope animation). Put file in public/assets/. */
    videoUrl: string;
    /** Optional still image while the video loads; leave "" to use the first video frame. */
    posterImage: string;
  };
  couple: {
    partner1Name: string;
    partner2Name: string;
    wedsText: string;
    monogramAlt: string;
    monogramImage: string;
    rsvpInitials: string;
  };
  hero: {
    tagline: string;
    saveTheDateLabel: string;
    dateDisplay: string;
    countdownIso: string;
    location: string;
    countdownTitle: string;
    countdownFooter: string;
    thankYouMessage: string;
    scratchRevealEnabled: boolean;
    images: { mobile: string; desktop: string };
  };
  families: {
    eyebrow: string;
    title: string;
    titleScript: string;
    partner1: FamilyMember;
    partner2: FamilyMember;
    closingLine1: string;
    closingLine2: string;
    images: { mobile: string; desktop: string };
  };
  story: {
    title: string;
    subtitle: string;
    quote: string;
    photos: { src: string; alt: string }[];
    images: { mobile: string; desktop: string };
  };
  schedulePreWedding: {
    title: string;
    subtitle: string;
    cardImage: string;
    cardAlt: string;
    images: { mobile: string; desktop: string };
  };
  wedding: {
    title: string;
    subtitle: string;
    dateHeading: string;
    eventName: string;
    time: string;
    venueLabel: string;
    venueName: string;
    venueUrl: string;
    bibleQuote: string;
    bibleReference: string;
    decorativeImage: string;
    images: { mobile: string; desktop: string };
  };
  reception: {
    title: string;
    subtitle: string;
    scheduleImage: string;
    scheduleAlt: string;
    images: { mobile: string; desktop: string };
  };
  rsvp: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    attendanceLabel: string;
    acceptLabel: string;
    declineLabel: string;
    submitLabel: string;
    footerMessage: string;
    directionsLabel: string;
    directionsUrl: string;
    submitEndpoint: string;
    storeLocally: boolean;
    images: { mobile: string; desktop: string; cardShape: string };
  };
  effects: {
    birds: boolean;
    petals: boolean;
  };
}

export interface FamilyDetail {
  label: string;
  value: string;
}

export interface FamilyMember {
  name: string;
  details: FamilyDetail[];
}
