export default function handler(req, response) {

  console.log({ query: req.query });
  console.log({ params: req.params });

  res.status(200).send("Test");
}
