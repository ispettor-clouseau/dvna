// Esegui il codice quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', () => {

    const productsTableBody = document.getElementById('products-table-body');
    const messagesContainer = document.getElementById('messages-container');
    const searchForm = document.getElementById('searchProductForm');
    const searchInput = document.getElementById('searchQuery');

    /**
     * Funzione per renderizzare la tabella dei prodotti
     * @param {Array} products - Un array di oggetti prodotto
     */
    function renderProducts(products) {
        // Pulisce la tabella prima di inserire nuovi dati
        productsTableBody.innerHTML = '';

        if (!products || products.length === 0) {
            productsTableBody.innerHTML = '<tr><td colspan="6" class="text-center">Nessun prodotto trovato.</td></tr>';
            return;
        }

        // Crea una riga per ogni prodotto
        products.forEach(product => {
            const row = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.code}</td>
                    <td>${product.tags}</td>
                    <td>${product.description}</td>
                </tr>
            `;
            // <td>
            //     <a href='/pagina_modifica_prodotto.html?id=${product.id}'>Modifica</a>
            // </td>
            productsTableBody.innerHTML += row;
        });
    }

    /**
     * Funzione per mostrare messaggi (es. successo, errore)
     * @param {string} message - Il testo del messaggio
     * @param {string} type - Il tipo di messaggio (success, danger, warning, info)
     */
    function showMessage(message, type = 'info') {
        const messageElement = `
            <div class="alert alert-${type}">${message}</div>
        `;
        messagesContainer.innerHTML = messageElement;
    }
    
    /**
     * Funzione per mostrare il termine di ricerca usato
     * @param {string} searchTerm - Il termine cercato
     */
    function showSearchTerm(searchTerm) {
        const searchElement = `
            <p class="bg-success">
                Elenco prodotti per la ricerca: <strong>${searchTerm}</strong>
                &nbsp; &nbsp;
                <small><a href="#" id="clear-search-link">
                    <i class="fa fa-remove"></i> Pulisci
                </a></small>
            </p>
        `;
        messagesContainer.innerHTML = searchElement;

        // Aggiungi un listener per il link "Pulisci"
        document.getElementById('clear-search-link').addEventListener('click', (e) => {
            e.preventDefault();
            messagesContainer.innerHTML = ''; // Pulisce i messaggi
            searchInput.value = ''; // Pulisce l'input di ricerca
            fetchProducts(); // Ricarica tutti i prodotti
        });
    }


    /**
     * Funzione per recuperare i prodotti dall'API
     * @param {string} [query=null] - Un termine di ricerca opzionale
     */
    async function fetchProducts(query = null) {
        // L'URL dell'API. Se c'è una query, la aggiungiamo all'URL.
        let apiUrl = '/api/products';
        if (query) {
            apiUrl += `?search=${encodeURIComponent(query)}`;
        }

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Errore di rete nella richiesta dei prodotti.');
            }
            const data = await response.json(); // L'API dovrebbe restituire JSON
            
            // Nel tuo template EJS, i dati erano in 'output.products'
            // Assumiamo che la nostra API restituisca direttamente un array di prodotti
            renderProducts(data.products);
            
        } catch (error) {
            console.error('Errore:', error);
            showMessage('Impossibile caricare i prodotti.', 'danger');
        }
    }

    // Gestione dell'invio del modulo di ricerca
    searchForm.addEventListener('submit', (event) => {
        // Impedisce il ricaricamento della pagina
        event.preventDefault();
        
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            fetchProducts(searchTerm);
            showSearchTerm(searchTerm);
            // Chiudi il modal di Bootstrap (se stai usando jQuery)
            $('#searchModal').modal('hide');
        }
    });

    // Carica tutti i prodotti all'avvio della pagina
    fetchProducts();
});