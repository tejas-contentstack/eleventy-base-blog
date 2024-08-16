export default function handler(request, response) {
  console.log("🚀 ~ handler ~ request:", request.body)

    console.log({ query: req.query });
  console.log({ params: req.params });

  res.status(200).send(`This params ${JSON.stringify(req.params.item)} and this is query ${JSON.stringify(req.query)}`);
}
