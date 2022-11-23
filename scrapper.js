const fs = require('fs');
const {executablePath} = require('puppeteer')
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const pageNumber = 129;
(async () => {
	const browser = await puppeteer.launch({headless:false,executablePath:executablePath()});
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
		await page.click(".info");
		//await new Promise(r => setTimeout(r, Math.random()*10000));
		await page.close();
	}
	await browser.close();
	console.log(tot)
	fs.writeFile("./mobs.json",JSON.stringify(tot),(err)=>{
		if (err){console.error(err)}else{
			console.log("wrote mobs.json without a problem");
		}
	})
})();