export default async function handler(req, res) {
	const sleepTime = 3 * 60* 1000;
	setInterval(() => {
	console.log("Printing something every 10 seconds");
	}, 10_000);
  await sleep(sleepTime)
  console.log('Waited for 3 minutes!!!');
	res.status(200).send("sent!");
}


async function sleep(timeout) {
	return new Promise(resolve => {
			setTimeout(resolve, timeout)
	})
}
