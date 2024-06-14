// const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 10000;

// app.use(bodyParser.json());

// app.post('/player', (req, res) => {
//   const playerName = req.body.playerName; // Extract player name from request body
//   console.log(`Requested player: ${playerName}`);

//   // Construct the URL based on the player's name
//   const url = `https://www.espncricinfo.com/cricketers/${playerName.replace(/\s+/g, '-').toLowerCase()}-/bowling-batting-stats`;

//   axios.get(url)
//     .then(response => {
//       const html = response.data;
//       const $ = cheerio.load(html);

//       const table = $('table'); 

//       const headings = [];
//       table.find('th').each((i, th) => {
//         headings.push($(th).text().trim());
//       });

//       const tableData = [];
//       table.find('tr').each((i, row) => {
//         const rowData = [];
//         $(row).find('td, th').each((j, cell) => {
//           rowData.push($(cell).text().trim());
//         });
//         tableData.push(rowData);
//       });

//       res.json({ headings, tableData });
//     })
//     .catch(error => {
//       console.error('Error scraping table:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
