const cron = require('node-cron')
const scraping = require('../scraping')
const fs = require('node:fs/promises');
const path = require('node:path');


cron.schedule('*/10 * * * *', async () => {
    const processedData = await scraping()
    const pathDB = path.join(process.cwd(),'db', 'data.json');
    await fs.writeFile(pathDB, JSON.stringify([...processedData,{date: new Date().toUTCString()}], null, 2), 'utf-8');
}).now()