export default function handler(req, res) {
	res.status(200).send({ message: "All products", params: req.params });
}
