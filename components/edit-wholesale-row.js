import React, { useState, useEffect } from 'react';

export default function EditRow({
  productName,
  setProductName,
  quantity,
  setQuantity,
  unit,
  setUnit,
  unit2,
  setUnit2,
  price,
  setPrice,
  price2,
  setPrice2,
  unitRatio,
  setUnitRatio,
  invalidQuant,
}) {
  return (
    <>
      <tr>
        <td>
          <input
            size="10"
            type="text"
            value={productName}
            placeholder="Product Name"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
        </td>
        <td>
          <input
            size="4"
            type="text"
            value={quantity}
            placeholder="Quant"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </td>
        <td>
          <input
            size="4"
            type="text"
            placeholder="price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <input
            size="4"
            type="text"
            placeholder="unit"
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value);
            }}
          ></input>
        </td>
        <td>
          <input
            size="4"
            type="text"
            placeholder="price"
            value={price2}
            onChange={(e) => {
              setPrice2(e.target.value);
            }}
          ></input>
          <input
            size="4"
            type="text"
            placeholder="unit"
            value={unit2}
            onChange={(e) => {
              setUnit2(e.target.value);
            }}
          ></input>
        </td>
      </tr>
      {invalidQuant && <p>This quantity is invalid</p>}
      {unit2 && (
        <tr>
          <td colSpan={2}></td>
          <td colSpan={2}>
            <input
              style={{ width: '100%' }}
              type="text"
              placeholder="unit ratio"
              value={unitRatio}
              onChange={(e) => {
                setUnitRatio(e.target.value);
              }}
            ></input>
          </td>
        </tr>
      )}
    </>
  );
}
