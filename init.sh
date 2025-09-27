#!/bin/bash

# ==========================================================
# Script per popolare le tabelle del database 'dvna'
# ==========================================================

# Percorso del file SQL con i dati
SQL_FILE="dati_dvna.sql"

echo "-> Inizio procedura di popolamento del database."

# 1. Carico le variabili di configurazione dal .bashrc dell'utente
echo "-> Caricamento variabili d'ambiente da ~/.bashrc..."
source ~/.bashrc

# 2. Verifico che le variabili necessarie siano state caricate
if [ -z "$MYSQL_USER" ] || [ -z "$MYSQL_PASSWORD" ] || [ -z "$MYSQL_DATABASE" ]; then
    echo "ERRORE: Le variabili MYSQL_USER, MYSQL_PASSWORD, o MYSQL_DATABASE non sono definite nel .bashrc!"
    exit 1
fi

# 3. Verifico che il file SQL esista
if [ ! -f "$SQL_FILE" ]; then
    echo "ERRORE: Il file dati '$SQL_FILE' non è stato trovato nella stessa cartella dello script."
    exit 1
fi

# 4. Eseguo il file SQL per popolare il database
# Uso le variabili corrette: MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT
# Nota la sintassi -p"$MYSQL_PASSWORD" senza spazio!
echo "-> Esecuzione script SQL per il popolamento di '$MYSQL_DATABASE'..."
mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" < "$SQL_FILE"

# 5. Controllo l'esito del comando
if [ $? -eq 0 ]; then
    echo "✅ Successo! Il database '$MYSQL_DATABASE' è stato popolato correttamente."
else
    echo "❌ ERRORE durante l'esecuzione dello script SQL. Controllare i log."
    exit 1
fi

exit 0