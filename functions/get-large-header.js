function generateHeader(sizeInKB) {
	const sizeInBytes = sizeInKB * 1024;
	let header = "";
	while (header.length < sizeInBytes) {
		header += "a".repeat(Math.min(sizeInBytes - header.length, 1000));
	}
	return header;
}

export default function handler(req, res) {
	console.log({ query: req.query });
	const headerValue = generateHeader(req.query.size);

	res.setHeader("X-Custom-Header", headerValue);

	res.status(200).send("sent!");
}
