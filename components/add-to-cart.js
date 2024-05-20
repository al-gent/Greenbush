function addToCart({
    product,
    quantityDesired,
    setQuantityDesired,
    unitSelected,
    quantity,
    setInvalidQuant,
    setCart})

    const productToUpdateList = {
        ...product,
        cart: baseUnitQuantityDesired,
        unitSelected: unitSelected,
        quantity: newQuantity,
      };

    const productToAddToCart {
        name: product.name,
        unit: product.unit[unitSelected],
        price: product.price[unitSelected],
        
    }
  
      if (
        isNaN(baseUnitQuantityDesired) ||
        baseUnitQuantityDesired < 0 ||
        parseFloat(qAvailable) < baseUnitQuantityDesired * productMultiplier
      ) {
        setInvalidQuant(true);
        return;
      } else {
        const nextProducts = products.map((p) => {
          if (p.id === product.id) {
            return productToUpdateList;
          } else {
            return p;
          }
        });
        setProducts(nextProducts);
        setCart({})
        setQuantityDesired('');
      }
    }