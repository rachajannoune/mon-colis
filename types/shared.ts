
//Colis
export type StatutColis =
  | 'pris_en_charge'
  | 'en_transit'
  | 'en_cours_de_livraison'
  | 'livre'
  | 'avis_de_passage'

export interface EvenementColis {
  date: string
  libelle: string
  lieu: string
}

export interface DestinataireColis {
  adresse: string
  ville: string
  codePostal: string
}

export interface Colis {
  numero: string
  statut: StatutColis
  destinataire: DestinataireColis
  dateLivraisonPrevue: string
  evenements: EvenementColis[]
}


//Bureau
export type ServiceBureau =
  | 'retrait'
  | 'affranchissement'
  | 'banque'

export type JourSemaine =
  | 'lundi'
  | 'mardi'
  | 'mercredi'
  | 'jeudi'
  | 'vendredi'
  | 'samedi'
  | 'dimanche'

export type HorairesBureau = Record<JourSemaine, string[]>

export interface Bureau {
  id: string
  nom: string
  adresse: string
  ville: string
  codePostal: string
  services: ServiceBureau[]
  horaires: HorairesBureau
}

//Tarif
export type TypeEnvoi =
  | 'lettre'
  | 'colis'

export type DestinationTarif =
  | 'france'
  | 'ue'
  | 'monde'

export interface DemandeTarif {
  typeEnvoi: TypeEnvoi
  poidsG: number
  destination: DestinationTarif
  avecSuivi: boolean
}

export interface ResultatTarif {
  prix: number
}