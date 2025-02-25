export default function async handler(req, res) {
	const sleepTime = 11 * 60* 1000;
  await sleep(sleepTime)
  console.log('Waited for 11 minutes!!!');
	res.status(200).send("sent!");
}


async function sleep(timeout) {
	return new Promise(resolve => {
			setTimeout(resolve, timeout)
	})
}
