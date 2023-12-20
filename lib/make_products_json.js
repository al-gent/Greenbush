const fs = require('fs');
const csv = require('csv-parser');

const results = [];

fs.createReadStream('/home/adam/react/nextjs-blog/lib/products.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    fs.writeFile('product_list.json', JSON.stringify(results, null, 2), (err) => {
      if (err) {
        console.error('Error writing file', err);
      } else {
        console.log('Successfully wrote file');
      }
    });
  });