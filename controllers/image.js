const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ab68b122587948ee94e8eab332b70f44'
});


    
const handleApiCall = (req, res) => {

    app.models
    	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    	.then(data => {
    		res.json(data);
    	})
    	.catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1) /*incrementa en 1 a entries*/
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};