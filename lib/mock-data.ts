export const MOCK_USER = {
  id: "u001",
  username: "Moussa_Diallo",
  firstName: "Moussa",
  lastName: "Diallo",
  email: "moussa@gmail.com",
  profileCompletion: 75,
  notifications: 3,
  location: "Dakar, Senegal",
  flag: "\ud83c\uddf8\ud83c\uddf3",
}

export const MOCK_PROFILE = {
  level: "Bac+3",
  gpa: "13.2",
  domain: "Informatique",
  experience: "1",
  countries: ["France", "Allemagne", "Canada"],
  budget: "600",
  languages: [
    { name: "Francais", level: "C1" },
    { name: "Anglais", level: "B2" },
    { name: "Allemand", level: "A1" },
  ],
  cityPref: "Grandes villes",
  scholarship: "Oui souhaitable",
  objectives: "Devenir ingenieur IA et contribuer au developpement technologique en Afrique",
  interests: ["Tech", "Entrepreneuriat", "Sport", "Voyage"],
}

export const MOCK_RESULTS = {
  globalScore: 87,
  universities: 150,
  countries: 28,
  processingTime: "8 min",
  topCountries: [
    {
      name: "Allemagne",
      city: "Berlin",
      flag: "\ud83c\udde9\ud83c\uddea",
      score: 94,
      budget: 650,
      tuition: "0-500\u20ac/an",
      visa: 89,
      rank: "Top 50 mondial",
      community: "Tres active",
      english: "Disponibles",
      medal: "\ud83e\udd47",
      badge: "Meilleur choix pour votre profil",
      color: "indigo",
      pros: [
        "Budget : 650\u20ac/mois \u2014 Compatible avec votre budget",
        "Frais scolarite : 0-500\u20ac/an \u2014 Quasi gratuit",
        "Taux visa : 89% \u2014 Eleve",
        "Classement tech : Top 50 mondial",
        "Communaute africaine : Tres active",
        "Cours en anglais : Disponibles",
      ],
      cons: [
        "Hiver rigoureux (a noter)",
        "Allemand recommande (cours disponibles)",
      ],
    },
    {
      name: "Canada",
      city: "Montreal",
      flag: "\ud83c\udde8\ud83c\udde6",
      score: 89,
      budget: 900,
      tuition: "5000-8000\u20ac/an",
      visa: 82,
      rank: "Top 200",
      community: "Grande communaute",
      english: "Francais parle",
      medal: "\ud83e\udd48",
      badge: "Excellent choix francophone",
      color: "purple",
      pros: [
        "Francais parle \u2014 Ideal pour vous",
        "Grande communaute africaine",
        "Fort taux emploi post-diplome",
      ],
      cons: [
        "Budget : 900\u20ac/mois (legerement au-dessus)",
        "Frais scolarite : 5 000-8 000\u20ac/an",
      ],
    },
    {
      name: "Portugal",
      city: "Lisbonne",
      flag: "\ud83c\uddf5\ud83c\uddf9",
      score: 85,
      budget: 550,
      tuition: "1000-3500\u20ac/an",
      visa: 91,
      rank: "Top 300",
      community: "Croissante",
      english: "Portugais requis",
      medal: "\ud83e\udd49",
      badge: "Meilleur rapport qualite-prix",
      color: "pink",
      pros: [
        "Budget : 550\u20ac/mois \u2014 Excellent",
        "Frais scolarite : 1 000-3 500\u20ac/an",
        "Taux visa : 91% \u2014 Le plus eleve",
        "Meteo douce",
        "Communaute africaine croissante",
      ],
      cons: ["Portugais requis (cours disponibles)"],
    },
  ],
}

export const MOCK_UNIVERSITIES = [
  { id: 1, name: "Technische Universitat Berlin", country: "Allemagne", flag: "\ud83c\udde9\ud83c\uddea", city: "Berlin", score: 94, budget: 400, ranking: "Top 100", rank: 87, lang: "EN/DE", deadline: 15, color: "indigo" },
  { id: 2, name: "Freie Universitat Berlin", country: "Allemagne", flag: "\ud83c\udde9\ud83c\uddea", city: "Berlin", score: 91, budget: 450, ranking: "Top 150", rank: 112, lang: "EN/DE", deadline: 22, color: "indigo" },
  { id: 3, name: "Universite de Montreal", country: "Canada", flag: "\ud83c\udde8\ud83c\udde6", city: "Montreal", score: 89, budget: 900, ranking: "Top 200", rank: 141, lang: "FR", deadline: 30, color: "purple" },
  { id: 4, name: "Polytechnique Montreal", country: "Canada", flag: "\ud83c\udde8\ud83c\udde6", city: "Montreal", score: 87, budget: 950, ranking: "Top 250", rank: 189, lang: "FR/EN", deadline: 45, color: "purple" },
  { id: 5, name: "Universidade de Lisboa", country: "Portugal", flag: "\ud83c\uddf5\ud83c\uddf9", city: "Lisbonne", score: 85, budget: 500, ranking: "Top 300", rank: 234, lang: "PT/EN", deadline: 60, color: "pink" },
  { id: 6, name: "NOVA University Lisboa", country: "Portugal", flag: "\ud83c\uddf5\ud83c\uddf9", city: "Lisbonne", score: 83, budget: 480, ranking: "Top 350", rank: 298, lang: "PT/EN", deadline: 55, color: "pink" },
  { id: 7, name: "Warsaw Univ of Technology", country: "Pologne", flag: "\ud83c\uddf5\ud83c\uddf1", city: "Varsovie", score: 81, budget: 350, ranking: "Top 400", rank: 367, lang: "EN/PL", deadline: 40, color: "indigo" },
  { id: 8, name: "KU Leuven", country: "Belgique", flag: "\ud83c\udde7\ud83c\uddea", city: "Leuven", score: 79, budget: 700, ranking: "Top 100", rank: 81, lang: "EN/NL", deadline: 25, color: "purple" },
  { id: 9, name: "Universite de Liege", country: "Belgique", flag: "\ud83c\udde7\ud83c\uddea", city: "Liege", score: 77, budget: 650, ranking: "Top 500", rank: 412, lang: "FR", deadline: 35, color: "purple" },
  { id: 10, name: "TU Delft", country: "Pays-Bas", flag: "\ud83c\uddf3\ud83c\uddf1", city: "Delft", score: 76, budget: 750, ranking: "Top 50", rank: 47, lang: "EN", deadline: 20, color: "indigo" },
  { id: 11, name: "Universite de Lausanne", country: "Suisse", flag: "\ud83c\udde8\ud83c\udded", city: "Lausanne", score: 74, budget: 1200, ranking: "Top 200", rank: 167, lang: "FR", deadline: 50, color: "pink" },
  { id: 12, name: "Vilnius University", country: "Lituanie", flag: "\ud83c\uddf1\ud83c\uddf9", city: "Vilnius", score: 72, budget: 300, ranking: "Top 600", rank: 551, lang: "EN", deadline: 65, color: "indigo" },
]

export const MOCK_APPLICATIONS = [
  { id: 1, univ: "TU Berlin", country: "\ud83c\udde9\ud83c\uddea", status: "submitted", score: 94 },
  { id: 2, univ: "Univ Montreal", country: "\ud83c\udde8\ud83c\udde6", status: "in_progress", score: 89 },
  { id: 3, univ: "Univ Lisboa", country: "\ud83c\uddf5\ud83c\uddf9", status: "accepted", score: 85 },
]

export const MOCK_DOCUMENTS = [
  { id: 1, name: "CV", type: "cv", status: "uploaded", size: "245 KB", date: "2024-01-15" },
  { id: 2, name: "Releves de notes", type: "transcript", status: "processing", size: "1.2 MB", date: "2024-01-14" },
  { id: 3, name: "Lettre de motivation", type: "cover_letter", status: "pending", size: null, date: null },
  { id: 4, name: "Passeport / ID", type: "passport", status: "pending", size: null, date: null },
  { id: 5, name: "Diplomes", type: "diploma", status: "pending", size: null, date: null },
]

export const MOCK_TESTIMONIALS = [
  { id: 1, name: "Aminata Sow", country: "Acceptee en Allemagne", avatar: "AS", stars: 5, text: "SmartAdmit m'a fait decouvrir Berlin alors que je ne visais que Paris. Resultat : admise a la TU Berlin avec une bourse complete !" },
  { id: 2, name: "Ibrahim Konate", country: "Accepte au Canada", avatar: "IK", stars: 5, text: "L'analyse IA a detecte que mon budget ne correspondait pas a mes choix initiaux. Grace a SmartAdmit, j'ai trouve la bonne universite a Montreal." },
  { id: 3, name: "Fatou Diop", country: "Acceptee au Portugal", avatar: "FD", stars: 4, text: "Le processus est incroyablement simple. En 10 minutes, j'avais mes recommandations personnalisees. Je suis maintenant a Lisbonne !" },
  { id: 4, name: "Ousmane Ba", country: "Accepte en Belgique", avatar: "OB", stars: 5, text: "Je recommande a tous les etudiants africains. L'IA comprend vraiment nos contraintes specifiques de budget et de visa." },
  { id: 5, name: "Mariama Toure", country: "Acceptee en Suisse", avatar: "MT", stars: 5, text: "Sans SmartAdmit, je n'aurais jamais pense a postuler en Suisse. Aujourd'hui j'y etudie avec un financement complet." },
]

export const PRICING_PLANS = [
  {
    name: "Essentiel",
    price: 49,
    annual: 39,
    features: [
      "Analyse IA de votre profil",
      "3 recommandations universites",
      "1 pays cible",
      "Support email",
    ],
    notIncluded: [
      "CV optimise par l'IA",
      "Lettres de motivation",
      "Preparation entretien",
      "Suivi candidatures",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: 99,
    annual: 79,
    features: [
      "Analyse IA complete",
      "12 recommandations universites",
      "5 pays cibles",
      "CV optimise par l'IA",
      "3 lettres de motivation",
      "Support prioritaire",
    ],
    notIncluded: [
      "Preparation entretien",
      "Suivi candidatures illimite",
    ],
    popular: true,
  },
  {
    name: "Excellence",
    price: 199,
    annual: 159,
    features: [
      "Analyse IA illimitee",
      "Universites illimitees",
      "Tous les pays",
      "CV optimise par l'IA",
      "Lettres illimitees",
      "Preparation entretiens",
      "Suivi candidatures complet",
      "Coach dedie",
    ],
    notIncluded: [],
    popular: false,
  },
]
