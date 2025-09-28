document.addEventListener('DOMContentLoaded', () => {

    const addProductForm = document.getElementById('addProductForm');
    const messagesContainer = document.getElementById('messages-container');

    /**
     * Helper function to display messages to the user.
     * @param {string} message The message to display.
     * @param {string} type The type of message (success, danger, warning).
     */
    function showMessage(message, type = 'info') {
        const messageElement = `<div class="alert alert-${type}">${message}</div>`;
        messagesContainer.innerHTML = messageElement;
    }

    // Add a listener for the form's submit event
    addProductForm.addEventListener('submit', async (event) => {
        // Prevent the default browser action of reloading the page
        event.preventDefault();

        // 1. Gather the data from the form fields
        const productData = {
            name: document.getElementById('productName').value,
            code: document.getElementById('productCode').value,
            tags: document.getElementById('productTags').value,
            description: document.getElementById('productDescription').value,
        };

        // 2. Send the data to the API endpoint
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            const result = await response.json();

            if (!response.ok) {
                // If the server returns an error, display it
                throw new Error(result.error || 'Si è verificato un errore.');
            }
            
            // 3. Handle a successful response
            // Show a success message
            showMessage('Prodotto aggiunto con successo! Sarai reindirizzato alla lista.', 'success');

            // Redirect to the product list page after 2 seconds
            setTimeout(() => {
                window.location.href = '/products.html'; // Redirects to index.html
            }, 2000);


        } catch (error) {
            // 4. Handle a failed response
            console.error('Errore durante l\'invio del prodotto:', error);
            showMessage(error.message, 'danger');
        }
    });
});