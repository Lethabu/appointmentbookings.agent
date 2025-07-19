-- scripts/backup.sql
-- Nightly backup script for Supabase/Postgres
-- Usage: psql -h <host> -U <user> -d <db> -f scripts/backup.sql

\! mkdir -p backups
\! pg_dump --no-owner --no-privileges -Fc -f backups/backup_$(date +%Y%m%d).dump $PGDATABASE
