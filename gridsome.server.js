require('dotenv').config();
const fetch = require('node-fetch');

module.exports = function(api) {
  
  api.loadSource(async actions => {

    const products = actions.addCollection('ProductList')
    
    const result = await fetch(process.env.TAKESHAPE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TAKESHAPE_API_KEY}`,
        accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
              getProductList {
                items {
                  _id
                  name
                  price
                }
              }
            }`,
      }),
    });
    
    const resultJSON = await result.json();
    
    for (const item of resultJSON.data.getProductList.items){
      products.addNode({
        _id: item._id,
        name: item.name,
        price: item.price,
      })
    }
  })
};
