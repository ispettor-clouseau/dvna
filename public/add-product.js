document.addEventListener('DOMContentLoaded', () => {

    const addProductForm = document.getElementById('addProductForm');
    const messagesContainer = document.getElementById('messages-container');

    // <-- INSERITA QUI: La nostra funzione di sanificazione
    function sanitizeInput(input) {
        if (input === null || input === undefined) {
            return input;
        }
        const strInput = String(input);
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return strInput.replace(reg, (match) => (map[match]));
    }

    /**
     * Funzione sicura per mostrare messaggi all'utente.
     * @param {string} message Il messaggio da mostrare.
     * @param {string} type Il tipo di messaggio (success, danger, warning).
     */
    function showMessage(message, type = 'info') {
        // <-- CORREZIONE CRUCIALE: Sanifichiamo il messaggio prima di inserirlo nell'HTML.
        const cleanMessage = sanitizeInput(message);
        const messageElement = `<div class="alert alert-${type}">${cleanMessage}</div>`;
        messagesContainer.innerHTML = messageElement;
    }

    // Aggiungiamo l'evento al form
    addProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // 1. Raccogli i dati dal form
        const productData = {
            name: document.getElementById('productName').value,
            code: document.getElementById('productCode').value,
            tags: document.getElementById('productTags').value,
            description: document.getElementById('productDescription').value,
        };
        
        // 2. (Buona pratica) Sanifica i dati anche prima di inviarli
        const cleanProductData = {
            name: sanitizeInput(productData.name),
            code: sanitizeInput(productData.code),
            tags: sanitizeInput(productData.tags),
            description: sanitizeInput(productData.description)
        };

        // 3. Invia i dati sanificati all'API
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cleanProductData) // <-- Usiamo i dati puliti
            });

            const result = await response.json();

            if (!response.ok) {
                // L'errore che arriva dal server viene gestito in modo sicuro da showMessage
                throw new Error(result.error || 'Si è verificato un errore.');
            }
            
            // 4. Gestisci la risposta di successo
            showMessage('Prodotto aggiunto con successo! Sarai reindirizzato alla lista.', 'success');

            setTimeout(() => {
                // NOTA: Se l'URL di reindirizzamento dipendesse da un input,
                // anche quello andrebbe validato/sanificato! In questo caso è sicuro.
                window.location.href = '/app/products'; 
            }, 2000);


        } catch (error) {
            // 5. Gestisci la risposta di errore
            console.error('Errore durante l\'invio del prodotto:', error);
            // La nostra funzione showMessage ora è sicura e sanificherà il messaggio d'errore.
            showMessage(error.message, 'danger');
        }
    });
});