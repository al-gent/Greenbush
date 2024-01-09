const fs = require('fs');
const path = require('path');
const data = require('/home/adam/react/nextjs-blog/lib/product_list.json');

const transformedData = data.reduce((acc, item) => {
  const existingItem = acc.find((i) => i.Description === item.Description);

  const price = parseFloat(item['Price per Unit'].replace('$', ''));

  if (existingItem) {
    existingItem['Price per Unit'].push(price);
    existingItem.Unit.push(item.Unit);
  } else {
    acc.push({
      ...item,
      'Price per Unit': [price],
      Unit: [item.Unit],
    });
  }

  return acc;
}, []);

fs.writeFile(
  path.join(__dirname, 'transformedData2.json'),
  JSON.stringify(transformedData, null, 2),
  (err) => {
    if (err) throw err;
    console.log('Data written to file');
  },
);
