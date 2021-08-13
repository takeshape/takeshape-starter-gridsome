require('dotenv').config();
const fetch = require('node-fetch');

module.exports = function(api) {
  
  api.loadSource(async actions => {

    const products = actions.addCollection('ProductList')
    
    const result = await fetch(`https://api.takeshape.io/project/6cdbcc52-5697-475b-872e-fcb6fd0e00d0/v3/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer da3a048ce00f40a3a0964b166c2b185f`,
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
