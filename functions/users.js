export default function handler(req, res) {
	console.log({ params: req.params });
	console.log({ query: req.query });
	console.log({ body: req.body });
	res.status(200).send({ message: "This is users", query: req.query });
}
