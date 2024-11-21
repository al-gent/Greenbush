import CartRow from './cart-row-orderSummary';

export default function CartTable({
  products,
  removeFromCart,
  onSubmit,
  custname,
  email,
  notes,
  setCustname,
  setEmail,
  setNotes,
  address,
  setAddress,
  homedel,
  setHomedel

}) {
  if (typeof products[0] == 'string') {
    products = products.map((product) => JSON.parse(product));
  }

  function productMultiplier(product) {
    return product.unitSelected ? product.unitratio : 1;
  }

  let total = products
    .filter((product) => product.cart)
    .reduce((total, product) => {
      return (
        total +
        product.cart *
          productMultiplier(product) *
          product.price[product.unitSelected]
      );
    }, 0)
    .toFixed(2);

  const rows = products
    .filter((product) => product.cart > 0)
    .map((product) => (
      <CartRow
        key={product.id}
        product={product}
        removeFromCart={removeFromCart}
      />
    ));
  return (
    <div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Quantity Selected</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
            <>{rows}</>
          </tbody>
        </table>
      </div>
      <hr></hr>
      <p style={{ fontWeight: 'bold' }}>Checkout total: ${total}</p>
      {setCustname && (
        <div>
          <div>
            <input
              type="text"
              value={custname}
              onChange={(e) => setCustname(e.target.value)}
              required
              placeholder="Name / Organization"
            />
          </div>
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="textarea"
              value={notes}
              placeholder="Notes"
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <p style={{ margin: 0 }}>Would you like home delivery?</p>
            <input
              type="checkbox"
              checked={homedel}
              onChange={(e) => setHomedel(e.target.checked)}
            />
          </div>
        {homedel && 
        <div>
          <div>
            <input
              type="textarea"
              value={address.streetAddress}
              placeholder="Street Address"
              onChange={(e) => setAddress({streetAddress: e.target.value})}
            />
          </div>
          <div>
          <input
            type="textarea"
            value={address.cityStateZip}
            placeholder="City State Zip"
            onChange={(e) => setAddress({cityStateZip: e.target.value})}
          />
        </div>
        </div>
          }
          <button
            onClick={(e) => {
              e.preventDefault();
              onSubmit(e);
            }}
          >
            Submit Order
          </button>{' '}
        </div>
      )}
    </div>
  );
}
