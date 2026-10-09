Mon Colis La Poste
L’objectif du projet est de regrouper plusieurs services liés aux envois postaux dans une seule application simple, responsive et accessible.

L’utilisateur peut suivre un colis, rechercher un bureau de poste, calculer un tarif et gérer une sélection personnelle de colis après connexion.

>Fonctionnalités principales
>>Suivi de colis
La page d’accueil contient un formulaire permettant de saisir un numéro de suivi.

Le format attendu est composé de deux lettres, neuf chiffres et deux lettres.

Exemple :

LA123456789FR
Après la recherche, l’application affiche :

le statut actuel du colis ;
la date de livraison prévue ;
l’adresse de destination ;
l’historique des différentes étapes de livraison ;
les cinq derniers colis consultés.
Un message adapté est affiché lorsque le format du numéro est incorrect ou lorsque le colis n’existe pas.

>>Recherche de bureaux
L’utilisateur peut rechercher un bureau de poste avec un code postal et filtrer les résultats selon le service souhaité.

Les filtres sont synchronisés avec l’URL. Cela permet de conserver une recherche et d’utiliser correctement les boutons précédent et suivant du navigateur.

Chaque bureau possède une page détaillée contenant :

son nom ;
son adresse ;
les services disponibles ;
les horaires d’ouverture ;
son état d’ouverture actuel.
L’indication « Ouvert » ou « Fermé » dépend de l’heure locale du navigateur.

>>Calcul d’un tarif
Le simulateur permet de choisir :

le type d’envoi ;
le poids ;
la destination ;
l’ajout ou non d’une option de suivi.
Les informations sont envoyées au backend, qui calcule le tarif à partir du barème enregistré dans les données du projet.

Le résultat est ensuite affiché au format français en euros.

>>Authentification
L’application contient une authentification de démonstration.

Les identifiants disponibles sont :

Email : test@moncolis.fr
Mot de passe : colis123
Après une connexion réussie, le backend crée un cookie de session.

Ce cookie permet au middleware de contrôler l’accès à la page Mon espace.

Lorsqu’un utilisateur non connecté essaie d’accéder à cette page, il est redirigé vers la connexion. Après une connexion réussie, l’utilisateur revient automatiquement vers la page initialement demandée.

>>Mon espace
La page Mon espace permet à l’utilisateur connecté de gérer sa sélection de colis suivis.

L’utilisateur peut :

consulter les colis enregistrés ;
ajouter un numéro de suivi ;
retirer un colis ;
accéder à la page détaillée de chaque envoi.
La gestion utilise trois opérations backend :

GET pour récupérer les colis ;
POST pour ajouter un colis ;
DELETE pour retirer un colis.
Dans cette version de démonstration, les numéros sont enregistrés temporairement en mémoire côté serveur.

La liste est donc réinitialisée lorsque le serveur redémarre.

>Technologies utilisées
Le projet utilise principalement :

Nuxt 3 ;
Vue 3 ;
TypeScript ;
Nitro ;
Pinia ;
Tailwind CSS ;
Vite ;
Vitest ;
Nuxt Test Utils ;
Vue Test Utils ;
Happy DOM ;
ESLint.
>>Prérequis
Le projet utilise la version de Node.js indiquée dans le fichier .nvmrc.

Si NVM est installé, exécuter :

nvm use
Il est possible de vérifier les versions installées avec :

node --version
npm --version

>>Installation
Cloner le dépôt :

git clone https://github.com/rachajannoune/mon-colis.git
Entrer dans le dossier du projet :

cd mon-colis
Installer les dépendances :

npm install
Créer un fichier .env à la racine du projet avec une clé locale :

NUXT_SESSION_SECRET=remplacer-par-une-cle-locale
Le fichier .env est ignoré par Git afin d’éviter d’envoyer une valeur privée sur le dépôt.

Démarrer l’application :

npm run dev
L’application est ensuite disponible à l’adresse suivante :

http://localhost:3000

>>Commandes disponibles
Démarrer le serveur de développement :

npm run dev
Vérifier les règles ESLint :

npm run lint
Vérifier les types TypeScript :

npm run typecheck
Exécuter les tests automatisés :

npm run test
Construire l’application pour la production :

npm run build
Prévisualiser le build de production :

npm run preview

>>Pages principales
L’application contient les routes suivantes :

/ pour l’accueil et le formulaire de suivi ;
/suivi/[numero] pour le détail d’un colis ;
/bureaux pour la recherche des bureaux ;
/bureaux/[id] pour le détail d’un bureau ;
/tarifs pour la simulation tarifaire ;
/connexion pour l’authentification ;
/mon-espace pour la gestion des colis suivis.

>>Routes API
Le backend Nitro contient les routes suivantes :

GET /api/colis/[numero] pour récupérer un colis ;
GET /api/bureaux pour rechercher les bureaux ;
POST /api/tarifs pour calculer un tarif ;
POST /api/auth/login pour authentifier l’utilisateur ;
GET /api/mes-colis pour récupérer les colis suivis ;
POST /api/mes-colis pour ajouter un colis ;
DELETE /api/mes-colis pour retirer un colis.

>>Organisation du projet
Le projet est organisé selon les conventions de Nuxt.

assets/
  feuilles de style globales

components/
  composants visuels réutilisables

composables/
  logique métier partagée et appels API

layouts/
  structures générales des pages

middleware/
  protection des routes frontend

pages/
  routes frontend générées par Nuxt

plugins/
  fonctionnalités globales

server/api/
  routes backend Nitro

server/data/
  données JSON de démonstration

server/middleware/
  middleware de journalisation

stores/
  état global Pinia

tests/
  tests unitaires et tests Nuxt

types/
  types TypeScript partagés

>>Choix techniques
>>>Composants
Les composants servent à isoler les éléments visuels réutilisables.

Par exemple :

StatutBadge.vue affiche le statut d’un colis ;
ColisTimeline.vue affiche son historique ;
BureauCard.vue affiche les informations d’un bureau ;
ColisSuiviCard.vue affiche un colis enregistré dans Mon espace.
La carte utilisée dans Mon espace reçoit les informations du colis avec des props.

Lorsque l’utilisateur clique sur le bouton de suppression, le composant émet un événement vers la page parente avec defineEmits().

La page reste ensuite responsable de l’appel au composable et au backend.

Cette organisation permet de séparer l’affichage de la logique métier.

>>>Composables
Les composables regroupent les logiques réutilisables.

Ils sont notamment utilisés pour :

récupérer un colis ;
rechercher les bureaux ;
calculer un tarif ;
gérer les colis de Mon espace ;
conserver les derniers colis consultés.
Un composable ne sert pas uniquement à contacter le backend. Il peut également gérer un état partagé ou une logique utilisée dans plusieurs fichiers.

>>>Plugin de formatage
Le plugin global centralise le formatage français des dates, des heures et des prix.

Il fournit trois fonctions disponibles dans les pages et les composants :

$formatDate() ;
$formatDateTime() ;
$formatPrice().
Cela évite de répéter la logique de formatage dans plusieurs fichiers et garantit un affichage cohérent dans toute l’application.

>>>Store Pinia
Le store Pinia centralise l’état d’authentification.

Il contient notamment :

les informations publiques de l’utilisateur ;
l’état de connexion ;
l’état de chargement ;
le message d’erreur ;
la fonction de connexion.
Le mot de passe n’est jamais conservé dans le store.

>>>Authentification
Le fonctionnement général de l’authentification est le suivant :

Formulaire de connexion
→ store Pinia
→ appel de l’API de connexion
→ vérification par le backend
→ création du cookie
→ redirection
→ middleware auth
→ accès à Mon espace
Le middleware frontend contrôle la navigation.

Les routes backend vérifient également le cookie avant de retourner ou de modifier les données protégées.

>>>Gestion des colis suivis
Lors de l’ouverture de Mon espace, une requête GET récupère les colis suivis.

Lorsqu’un utilisateur ajoute un colis, une requête POST enregistre le numéro dans le tableau temporaire. La liste est ensuite actualisée avec une nouvelle requête GET.

Lorsqu’un utilisateur retire un colis, une requête DELETE supprime le numéro. La liste est ensuite actualisée.

Le fichier JSON contenant les colis n’est jamais modifié.

>>>Configuration Nuxt
La configuration publique contient :

le nom de l’application ;
le préfixe utilisé pour les API.
Le secret de session reste en dehors de la partie publique de runtimeConfig.

Sa valeur est fournie localement avec la variable :

NUXT_SESSION_SECRET
Cette valeur ne doit jamais être placée dans la partie publique de la configuration.

>>>Route Rules
Deux règles particulières sont utilisées.

La page /tarifs est prérendue parce que son interface initiale est publique et stable. Le calcul du prix reste effectué dynamiquement par le backend.

La page /mon-espace utilise un rendu client parce que son contenu dépend de la session, du cookie et des actions de l’utilisateur.

>>>Données de démonstration
Le projet contient :

10 colis ;
les 5 statuts demandés ;
15 bureaux ;
3 codes postaux ;
un barème tarifaire pour les lettres et les colis.
Les statuts disponibles sont :

pris_en_charge
en_transit
en_cours_de_livraison
livre
avis_de_passage
Les données sont conservées dans des fichiers JSON afin de simuler une source de données sans utiliser de base de données.

>>>SEO
Chaque page possède un titre et une description grâce à useSeoMeta().

Les pages dynamiques utilisent le numéro du colis ou le nom du bureau dans leur titre.

Les pages privées utilisent noindex, nofollow afin de ne pas être indexées par les moteurs de recherche.

Cette règle concerne notamment :

la page de connexion ;
la page Mon espace.

>>>Responsive et accessibilité
L’application a été vérifiée sur mobile, tablette et ordinateur.

La navigation au clavier a été testée avec les touches Tab, Shift + Tab, Entrée et Espace.

Les animations décoratives respectent également la préférence de réduction des mouvements du système.

>>>Tests automatisés
Les tests sont réalisés avec Vitest.

Le projet utilise deux environnements :

un environnement Node.js pour les tests unitaires simples et les routes serveur ;
un environnement Nuxt pour les composables et les composants qui utilisent le runtime Nuxt.
Les tests vérifient actuellement :

l’ajout d’un numéro dans les derniers colis consultés ;
l’absence de doublon ;
la limite de cinq numéros ;
les libellés du composant de statut ;
les classes visuelles du statut livré ;
le calcul d’un tarif valide ;
le refus d’un poids non pris en charge.


>>>Journalisation des API
Un middleware serveur journalise les requêtes envoyées vers les routes /api/.

Pour chaque appel, le terminal affiche :

la méthode HTTP ;
le chemin appelé ;
la durée de traitement.
Cette journalisation facilite l’observation et le débogage des échanges entre le frontend et le backend.


>>>Utilisation d’un assistant IA (Copilot)
Un assistant IA a été utilisé comme outil d’accompagnement pendant le développement.

J’ai commencé par définir les fonctionnalités attendues, l’organisation générale du projet et les idées principales de l’interface.

J’ai également consulté la documentation Nuxt afin d’identifier les concepts, les fonctions et les variables nécessaires, notamment les composables, les middlewares, useAsyncData, useCookie, useSeoMeta, les plugins et les outils de test.

À partir de mes idées, de mes recherches et de mes choix techniques, l’assistant m’a aidée à proposer une structure de code et à organiser certaines parties du projet.

Lorsque je rencontrais une erreur dans le terminal ou dans l’application, je transmettais le message d’erreur obtenu. L’assistant m’aidait ensuite à comprendre la cause, à identifier le fichier concerné et à trouver une correction adaptée.

Chaque fonctionnalité a été testée manuellement dans le navigateur. Le projet a également été contrôlé avec ESLint, TypeScript, Vitest et le build de production.

L’assistant IA a donc été utilisé comme aide à la recherche, à la structuration et au débogage. Les idées, les choix, la compréhension, l’intégration et la validation finale ont été réalisés dans le cadre de mon travail.
