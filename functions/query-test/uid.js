export default function handler(req, res) {
  console.log({ query: req.query });
  console.log({ params: req.params });

  res.status(200).send(`This params ${JSON.stringify(req.params.uid)} and this is query ${JSON.stringify(req.query)}`);
}
