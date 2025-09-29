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

        // Crea una riga per ogni prodotto in modo sicuro
        products.forEach(product => {
            // 1. Crea l'elemento <tr>
            const row = document.createElement('tr');

            // 2. Crea e aggiungi ogni <td> usando textContent per prevenire XSS
            const idCell = document.createElement('td');
            idCell.textContent = product.id;
            row.appendChild(idCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = product.name;
            row.appendChild(nameCell);

            const codeCell = document.createElement('td');
            codeCell.textContent = product.code;
            row.appendChild(codeCell);

            const tagsCell = document.createElement('td');
            tagsCell.textContent = product.tags;
            row.appendChild(tagsCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = product.description;
            row.appendChild(descriptionCell);

            // Esempio per il link di modifica (se necessario)
            // const actionsCell = document.createElement('td');
            // const editLink = document.createElement('a');
            // editLink.href = `/pagina_modifica_prodotto.html?id=${product.id}`;
            // editLink.textContent = 'Modifica';
            // actionsCell.appendChild(editLink);
            // row.appendChild(actionsCell);

            // 3. Aggiungi la riga completa al corpo della tabella
            productsTableBody.appendChild(row);
        });
    }

    /**
     * Funzione per mostrare messaggi (es. successo, errore)
     * @param {string} message - Il testo del messaggio
     * @param {string} type - Il tipo di messaggio (success, danger, warning, info)
     */
    // function showMessage(message, type = 'info') {
    //     const messageElement = `
    //         <div class="alert alert-${type}">${message}</div>
    //     `;
    //     messagesContainer.innerText = messageElement;
    // }
    function showMessage(message, type = 'info') {
        messagesContainer.innerHTML = ''; // Pulisci i messaggi precedenti

        const messageElement = document.createElement('div');
        messageElement.className = `alert alert-${type}`;

        // Usa textContent per inserire il messaggio in modo sicuro
        messageElement.textContent = message;

        messagesContainer.appendChild(messageElement);
    }

    /**
     * Funzione per mostrare il termine di ricerca usato
     * @param {string} searchTerm - Il termine cercato
     */
    function showSearchTerm(searchTerm) {
        // Pulisci i messaggi precedenti in modo sicuro
        messagesContainer.innerHTML = '';

        // 1. Crea gli elementi del DOM programmaticamente
        const searchElement = document.createElement('p');
        searchElement.className = 'bg-success p-2'; // Aggiungo un po' di padding per stile

        const strongElement = document.createElement('strong');

        // 2. Usa textContent per inserire il dato variabile (searchTerm)
        strongElement.textContent = searchTerm;

        const clearLink = document.createElement('a');
        clearLink.href = '#';
        clearLink.id = 'clear-search-link';
        // innerHTML qui è sicuro perché il contenuto è statico e controllato da te
        clearLink.innerHTML = ' <small><i class="fa fa-remove"></i> Pulisci</small>';

        // 3. Componi l'elemento finale
        searchElement.append('Elenco prodotti per la ricerca: ');
        searchElement.appendChild(strongElement);
        searchElement.appendChild(clearLink);

        // 4. Aggiungi l'elemento sicuro al contenitore
        messagesContainer.appendChild(searchElement);

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