export default function handler(req, response) {

  console.log({ query: req.query });
  console.log({ params: req.params });

  res.status(200).send(`This params ${JSON.stringify(req.params.item)} and this is query ${JSON.stringify(req.query)}`);
}
