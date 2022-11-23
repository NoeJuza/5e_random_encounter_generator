const fs = require('fs');
const puppeteer = require('puppeteer');
const pageNumber = 2;
(async () => {
	const browser = await puppeteer.launch({product:"chrome",headless:false});
	let tot = []
	for (let i = 1; i <= pageNumber; i++) {
		const page = await browser.newPage();
		await page.goto('https://www.dndbeyond.com/monsters?page=' + i);
    	await page.waitForSelector("div.info");
		let a = await page.$$eval("div .info",els=>{
			let res = [];
			console.log(els);
			els.forEach(el => {
				let m = {}
				m.cr = el.children[1]?.children[0]?.textContent;
				m.name = el.children[2].children[0].textContent.replaceAll("\n","").replaceAll("\"","").split(" ").filter(x => x!= '').join(" ")
				res.push(m)
			});
			return res;
		});
		tot.push(...a)
	}
	await browser.close();
	console.log(tot)
})();