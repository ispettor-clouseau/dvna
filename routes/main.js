var router = require('express').Router()
var vulnDict = require('../config/vulns')
var authHandler = require('../core/authHandler')
var db = require('../models')
const Op = db.Sequelize.Op;

module.exports = function (passport) {

	function sanitizeInput(input) {
		if (!input) {
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
	router.get('/', authHandler.isAuthenticated, function (req, res) {
		res.redirect('/learn')
	})

	router.get('/login', authHandler.isNotAuthenticated, function (req, res) {
		res.render('login')
	})

	router.post('/api/products', authHandler.isAuthenticated, (req, res) => {
		// 1. ESTRAI I DATI "SPORCHI" DALLA RICHIESTA
		const { id, name, code, description, tags } = req.body;

		// Validazione base
		if (!name || !code) {
			return res.status(400).json({ error: 'Nome e codice sono obbligatori.' });
		}

		// 2. SANIFICA OGNI SINGOLO DATO PRIMA DI USARLO
		const cleanId = id; // L'ID numerico non ha bisogno di sanificazione
		const cleanName = sanitizeInput(name);
		const cleanCode = sanitizeInput(code);
		const cleanDescription = sanitizeInput(description);
		const cleanTags = sanitizeInput(tags);

		console.log(`Dato 'name' originale: "${name}" | Sanificato: "${cleanName}"`);

		// 3. USA I DATI SANIFICATI PER L'OPERAZIONE DI DATABASE ("UPSERT")
		db.Product.findByPk(cleanId || null)
			.then(product => {
				const isNew = !product;
				if (isNew) {
					product = new db.Product();
				}

				// Assegna SEMPRE e SOLO i dati puliti (clean*)
				product.code = cleanCode;
				product.name = cleanName;
				product.description = cleanDescription;
				product.tags = cleanTags;

				return product.save()
					.then(savedProduct => {
						const statusCode = isNew ? 201 : 200;
						res.status(statusCode).json({
							success: true,
							message: `Prodotto ${isNew ? 'creato' : 'aggiornato'} con successo!`,
							product: savedProduct
						});
					});
			})
			.catch(err => {
				console.error("Errore durante il salvaggio del prodotto:", err);
				res.status(500).json({
					success: false,
					error: "Errore durante il salvaggio del prodotto nel database."
				});
			});
	});

	// GET /api/products - Recupera tutti i prodotti o esegue una ricerca
	router.get('/api/products', authHandler.isAuthenticated, (req, res) => {
		console.log("Richiesta ricevuta per la lista di prodotti");

		const searchTerm = req.query.search;

		// 1. Prepara un oggetto di opzioni per la query
		const options = {};

		// 2. Se è presente un termine di ricerca, aggiungi la clausola 'where' all'oggetto options
		if (searchTerm) {
			options.where = {
				// Cerca il 'searchTerm' nel campo 'name' del modello Product
				name: {
					[Op.like]: '%' + searchTerm + '%'
				}
			};
		}

		// 3. Esegui la query passando l'oggetto options.
		// Se searchTerm è nullo, options sarà vuoto e verranno restituiti tutti i prodotti.
		// Se searchTerm è presente, verranno restituiti solo i prodotti filtrati.
		db.Product.findAll(options).then(products => {
			const output = {
				products: products
			};
			res.json(output);
		}).catch(err => {
			// Aggiungi sempre un blocco .catch per gestire eventuali errori della query
			console.error("Errore durante la ricerca dei prodotti:", err);
			res.status(500).json({ error: "Errore interno del server" });
		});
	});

	router.get('/learn/vulnerability/:vuln', authHandler.isAuthenticated, function (req, res) {
		res.render('vulnerabilities/layout', {
			vuln: req.params.vuln,
			vuln_title: vulnDict[req.params.vuln],
			vuln_scenario: req.params.vuln + '/scenario',
			vuln_description: req.params.vuln + '/description',
			vuln_reference: req.params.vuln + '/reference',
			vulnerabilities: vulnDict
		}, function (err, html) {
			if (err) {
				console.log(err)
				res.status(404).send('404')
			} else {
				res.send(html)
			}
		})
	})

	router.get('/learn', authHandler.isAuthenticated, function (req, res) {
		res.render('learn', { vulnerabilities: vulnDict })
	})

	router.get('/register', authHandler.isNotAuthenticated, function (req, res) {
		res.render('register')
	})

	router.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	})

	router.get('/forgotpw', function (req, res) {
		res.render('forgotpw')
	})

	router.get('/resetpw', authHandler.resetPw)

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/learn',
		failureRedirect: '/login',
		failureFlash: true
	}))

	router.post('/register', passport.authenticate('signup', {
		successRedirect: '/learn',
		failureRedirect: '/register',
		failureFlash: true
	}))

	router.post('/forgotpw', authHandler.forgotPw)

	router.post('/resetpw', authHandler.resetPwSubmit)

	return router
}