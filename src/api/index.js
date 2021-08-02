import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';


export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/token/:id', (req, res) => {
		const token = req.params.id
		const json = require(`./token/${token}.json`)
		res.json(json);
	})

	return api;
}
