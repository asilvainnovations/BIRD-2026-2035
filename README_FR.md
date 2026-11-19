# BIRD 2026–2035 — SQL complémentaires (v3.0.3)

Ce paquet ajoute les modèles SQL demandés au schéma BIRD v3.0.2. Il comprend les fonctions d'authentification Supabase, des modèles de vues et de tables, ainsi que des rapports de diagnostic PostgreSQL.

## Contenu

- `database/BIRD_Database_Schema_v3.0.2.sql` — schéma corrigé de base.
- `database/BIRD_Admin_User_Id_42703_Hotfix.sql` — correctif ciblé pour l'erreur `42703: column "user_id" does not exist`.
- `database/01_bird_optional_helpers.sql` — vue conditionnelle `countries_view`, exemples de table/colonne/commentaires, trigger `updated_at`, compteur atomique.
- `database/02_bird_auth_hooks.sql` — hooks de vérification du mot de passe (10 s), MFA (2 s), jeton d'accès personnalisé et squelette générique.
- `database/03_bird_database_diagnostics.sql` — version, extensions, connexions, statistiques SQL, hit rate, réplication, tailles des tables/index et objets volumineux.
- `database/04_dbdev_optional_prerequisites.sql` — prérequis facultatifs `http` et `pg_tle` pour dbdev/TLE.
- `netlify.toml` — configuration Netlify déjà préparée pour le déploiement Vite/React.

## Ordre d'exécution recommandé

1. Vérifier que le schéma BIRD v3.0.2 est installé et que ses tables existent.
2. Exécuter `01_bird_optional_helpers.sql` après avoir relu les objets optionnels créés.
3. Exécuter `02_bird_auth_hooks.sql` pour créer les fonctions et tables de limitation des tentatives.
4. Exécuter les requêtes de `03_bird_database_diagnostics.sql` individuellement. Les requêtes `pg_stat_statements` exigent que l'extension soit disponible.
5. Configurer explicitement les hooks dans **Supabase Dashboard → Authentication → Hooks**. La création SQL seule ne les active pas.
6. Tester les connexions, mots de passe, MFA, claims JWT et RLS en environnement de staging avant la production.

## Détails importants et compatibilité

### `countries_view`
Le schéma BIRD v3.0.2 fourni ne contient pas de table `public.countries`. Le script ne crée donc pas une vue invalide : il crée `public.countries_view` uniquement si `public.countries(id, continent)` existe déjà. Si la table n'existe pas, un message NOTICE indique que la vue a été ignorée. Créez/importez d'abord la vraie table de référence des pays si cette vue est nécessaire.

### Hooks de vérification du mot de passe et MFA
Les hooks appliquent une fenêtre glissante atomique :
- mot de passe incorrect : une tentative autorisée, puis attente de 10 secondes avant une nouvelle tentative incorrecte ;
- code MFA incorrect : une tentative autorisée par facteur, puis attente de 2 secondes.

Un code valide efface le dernier échec correspondant. Les réponses `429` sont renvoyées au format d'erreur attendu par les hooks Postgres Supabase. Ces hooks de vérification sont soumis aux exigences de plan Supabase (Teams/Enterprise actuellement selon la documentation officielle). Vérifiez l'éligibilité de votre projet avant de les activer.

### Hook de jeton d'accès personnalisé
Le hook lit les rôles depuis les tables BIRD `public.users` et `public.user_profiles`, et les ajoute dans `app_metadata` sous :
- `bird_system_role` (`user`, `admin`, `super_admin`)
- `bird_workspace_role` (`owner`, `admin`, `editor`, `viewer`)
- `bird_account_active`

N'utilisez pas `user_metadata` pour les décisions d'autorisation. Les claims sont intégrés au JWT au moment de sa création/actualisation ; un changement de rôle ne modifie pas les jetons déjà émis. Les politiques RLS doivent vérifier les claims et conserver leurs contrôles d'accès par ligne.

### Hook générique
`bird_general_auth_hook` est uniquement un squelette sans logique. Les hooks Supabase ont des contrats de réponse différents selon leur type. Ne le connectez pas à un événement réel avant d'avoir défini et testé le contrat correspondant.

### Sécurité des tables d'exemple
`bird_example_records` et `bird_counters` sont des exemples facultatifs, pas des tables métier BIRD. Aucune politique d'accès client n'est créée. Ne leur accordez pas d'accès `anon` ou `authenticated` sans politiques RLS adaptées.

### `pg_stat_statements`, dbdev et TLE
Vérifiez d'abord si `pg_stat_statements` est déjà installé. Les requêtes statistiques peuvent être limitées par les privilèges du rôle SQL utilisé. `dbdev` est un gestionnaire de paquets PostgreSQL ; le fichier `04_dbdev_optional_prerequisites.sql` n'installe que les prérequis `http` et `pg_tle`. L'installation du paquet `supabase-dbdev` reste une étape séparée, à effectuer uniquement en staging selon la documentation Supabase actuelle. Aucune clé de service ou clé de registre n'est intégrée au script. Ne l'installez pas sur la base de production sans vérifier la compatibilité et les extensions autorisées. BIRD n'en dépend pas.

## Références Supabase

- Auth Hooks : https://supabase.com/docs/guides/auth/auth-hooks
- Password Verification Hook : https://supabase.com/docs/guides/auth/auth-hooks/password-verification-hook
- MFA Verification Hook : https://supabase.com/docs/guides/auth/auth-hooks/mfa-verification-hook
- Custom Access Token Hook : https://supabase.com/docs/guides/auth/auth-hooks/custom-access-token-hook
- pg_stat_statements : https://supabase.com/docs/guides/database/extensions/pg_stat_statements
- Inspecter la base : https://supabase.com/docs/guides/observability/inspect

## Validation

Contrôles statiques effectués : fichiers présents, archive ZIP valide, fonctions/hooks et noms d'objets cohérents avec les tables du schéma fourni. Ces scripts n'ont pas été exécutés sur votre base Supabase réelle. Les hooks doivent être activés et testés sur staging avant toute mise en production.
