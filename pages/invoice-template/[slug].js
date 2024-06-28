import React, { useState, useEffect } from 'react';
import InvoiceTable from '../../components/invoice-table';
import { PDFViewer } from '@react-pdf/renderer';
import cssstyles from '../../styles/login.module.css';
import saveBuyerInfo from '../../components/save-buyer-info';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    margin: 10,
  },
  text: {
    margin: 10,
    fontSize: 14,
    textAlign: 'justify',
  },
  addressTable: {
    display: 'table',
    width: 'auto',
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  addressTableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  addressTableColHeader: {
    width: '50%',
    fontWeight: 'bold',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f3f3f3',
  },
  addressTableCol: {
    width: '50%',
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  addressTableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 14,
  },
  sectionleft: {
    width: '50%', // Explicit width
    padding: 10,
    paddingRight: 5, // Maintain the gap between the two sections
  },
  sectionright: {
    width: '50%', // Explicit width
    padding: 10,
    paddingLeft: 5, // Maintain the gap between the two sections
    marginLeft: '50%', // Position to the right of sectionleft
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    fontWeight: 'bold',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f3f3f3',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
  image: {
    margin: 10,
    width: 150,
    height: 150,
  },
  footer: {
    position: 'fixed',
    left: 0,
    top: 110,
    width: '100%',
    textAlign: 'center',
    padding: '10px 0',
    fontSize: 8,
  },
});

export async function getServerSideProps(context) {
  const { slug } = context.query;
  console.log('getting server side props', slug);
  return {
    props: {
      slug,
    },
  };
}

export default function InvoiceTemplate({ slug }) {
  const [order, setOrder] = useState({});
  const [farm, setFarm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [buyerInfoSaved, setBuyerInfoSaved] = useState(false);
  const [buyer, setBuyer] = useState({
    address: '',
    attn: '',
    city: '',
    compref: '',
    distancefromfarm: '',
    email: '',
    farmcode: '',
    firstname: '',
    lastname: '',
    organization: '',
    phone: '',
    state: '',
    zip: '',
  });
  const [subtotal, setSubtotal] = useState('');
  const [viewInvoice, setViewInvoice] = useState(false);

  const Invoice = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Invoice</Text>
        <View style={styles.addressTable}>
          <View style={styles.addressTableRow}>
            <View style={styles.addressTableColHeader}>
              <Text style={styles.addressTableCell}>FROM</Text>
            </View>
            <View style={styles.addressTableColHeader}>
              <Text style={styles.addressTableCell}>FOR</Text>
            </View>
          </View>
          <View style={styles.addressTableRow}>
            <View style={styles.addressTableCol}>
              <Text style={styles.addressTableCell}>{farm.farmname}</Text>
            </View>
            <View style={styles.addressTableCol}>
              <Text style={styles.addressTableCell}>{buyer.organization}</Text>
            </View>
          </View>

          <View style={styles.addressTableRow}>
            <View style={styles.addressTableCol}>
              <Text style={styles.addressTableCell}>{farm.email}</Text>
            </View>
            <View style={styles.addressTableCol}>
              <Text style={styles.addressTableCell}>attn: {buyer.attn}</Text>
            </View>
          </View>

          <View style={styles.addressTableRow}>
            <View style={styles.addressTableCol}>
              <Text style={styles.addressTableCell}>{farm.phone}</Text>
            </View>
            <View style={styles.addressTableCol}>
              <Text style={styles.addressTableCell}>{buyer.phone}</Text>
            </View>
          </View>

          <View style={styles.addressTableRow}>
            <View style={styles.addressTableCol}>
              <Text style={styles.addressTableCell}>{farm.address}</Text>
            </View>
            <View style={styles.addressTableCol}>
              <Text style={styles.addressTableCell}>{buyer.address}</Text>
            </View>
          </View>

          <View style={styles.addressTableRow}>
            <View style={styles.addressTableCol}>
              <Text style={styles.addressTableCell}>
                {' '}
                {farm.city}, {farm.state} {farm.zip}
              </Text>
            </View>
            <View style={styles.addressTableCol}>
              <Text style={styles.addressTableCell}>
                {buyer.city}, {buyer.state} {buyer.zip}
              </Text>
            </View>
          </View>

          <Text style={styles.text}>Order Number: {order.id}</Text>
          <Text style={styles.text}>Date: {date}</Text>
          <Text style={styles.text}>Due : {dueDate}</Text>

          <InvoiceTable
            products={order.items}
            View={View}
            Text={Text}
            styles={styles}
            subtotal={subtotal}
            setSubtotal={setSubtotal}
          />
          <Text style={styles.text}>Subtotal: ${subtotal}</Text>
          <Text style={styles.text}>Delivery Miles: {buyer.deliveryMiles}</Text>
          <Text style={styles.text}>Delivery Fee: ${farm.deliveryfee}</Text>
          <Text style={styles.title}>
            Balance Due: ${parseFloat(subtotal) + parseFloat(farm.deliveryfee)}
          </Text>
        </View>
        <Image
          src="https://images.squarespace-cdn.com/content/v1/6015fcea5d14073e2248cf49/1612840287358-EK8BZW1J8AT1T84CHSPD/Greenbush_logo_020421-3.png?format=1500w"
          style={styles.image}
        />
        <Text style={styles.text}>
          Thank you for supporting local farmers and local food!
        </Text>
        <Text style={styles.footer}>
          Automatically generated invoice courtesy of orderfrom.farm{' '}
        </Text>
      </Page>
    </Document>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First fetch call
        const orderResponse = await fetch(
          `/api/get-order?ordernum=${encodeURIComponent(slug)}`,
        );
        if (!orderResponse.ok) {
          throw new Error(`HTTP error! status: ${orderResponse.status}`);
        }
        const orderData = await orderResponse.json();
        setOrder(orderData);

        // Second fetch call depends on data from the first one
        const farmResponse = await fetch(
          `/api/get-farmer-info?client=${encodeURIComponent(orderData.client)}`,
        );
        if (!farmResponse.ok) {
          throw new Error(`HTTP error! status: ${farmResponse.status}`);
        }
        const farmData = await farmResponse.json();
        setFarm(farmData);

        try {
          console.log(orderData);
          const buyerResponse = await fetch(
            `/api/get-buyer-info?email=${encodeURIComponent(
              orderData.email.toLowerCase(),
            )}`,
          );
          if (!buyerResponse.ok) {
            throw new Error(`HTTP error! status: ${buyerResponse.status}`);
          }
          try {
            const buyerText = await buyerResponse.text(); // Get response as text first
            const buyerData = buyerText ? JSON.parse(buyerText) : {}; // Parse text as JSON if not empty
            console.log('buyer', buyerData);

            setBuyer(buyerData);
          } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
            // Handle JSON parsing error (e.g., set an error state, show a message to the user)
          }
        } catch (networkError) {
          console.error('Network error:', networkError);
          // Handle network error (e.g., set an error state, show a message to the user)
        }

        setDate(
          new Date().toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
          }),
        );
        {
          const newDate = new Date(orderData.date);
          newDate.setDate(newDate.getDate() + parseFloat(30)); // Add 30 days to the date
          const formattedDueDate = newDate.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
          });
          setDueDate(formattedDueDate); // Set the formatted due date
        }
        console.log(order);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div>
      <div className={cssstyles.signupDashContainer}>
        <h2>Invoice For:</h2>
        <div>
          <h2>{order.name}</h2>
          <label>
            Buyer
            <input
              type="text"
              value={buyer.organization}
              onBlur={(e) =>
                setBuyer({ ...buyer, organization: e.target.value })
              }
            />
          </label>
          <div>
            <label>
              attn:
              <input
                type="text"
                value={buyer.attn}
                onChange={(e) =>
                  setBuyer({
                    ...buyer,
                    attn: e.target.value,
                  })
                }
              />
            </label>
          </div>
        </div>
        <label>
          phone
          <input
            type="text"
            value={buyer.phone}
            onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
          />
        </label>
        <div>
          <label>
            email
            <input
              type="text"
              value={order.email}
              onChange={(e) => {
                setBuyer({ ...buyer, email: e.target.value });
                setOrder({ ...order, email: e.target.value });
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Address
            <input
              type="text"
              value={buyer.address}
              onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            City
            <input
              size={buyer.city ? buyer.city.length : 10}
              type="text"
              value={buyer.city}
              onChange={(e) =>
                setBuyer({
                  ...buyer,
                  city: e.target.value,
                })
              }
            />
          </label>
          <label>
            State
            <input
              size="2"
              type="text"
              value={buyer.state}
              onChange={(e) =>
                setBuyer({
                  ...buyer,
                  state: e.target.value,
                })
              }
            />
          </label>
          <label>
            Zip
            <input
              size="5"
              type="text"
              value={buyer.zip}
              onChange={(e) =>
                setBuyer({
                  ...buyer,
                  zip: e.target.value,
                })
              }
            />
          </label>
        </div>

        <label>
          Date:
          <input
            size="9"
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Due:
          <input
            size="9"
            type="text"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <div>
          <label>
            Delivery Miles:
            <input
              size="3"
              type="text"
              value={buyer.deliveryMiles}
              onChange={(e) =>
                setBuyer({
                  ...buyer,
                  deliveryMiles: e.target.value,
                })
              }
            />
          </label>
          <label>
            Fee: $
            <input
              size="2"
              type="text"
              value={farm.deliveryfee}
              onChange={(e) =>
                setFarm({
                  ...farm,
                  deliveryfee: e.target.value,
                })
              }
            />
          </label>
        </div>
        <div>
          <button>
            <PDFDownloadLink
              style={{ textDecoration: 'none', color: 'inherit' }}
              document={<Invoice />}
              fileName={`${order.id}_${buyer.organization}_${date}.pdf`}
            >
              Download PDF
            </PDFDownloadLink>
          </button>
        </div>
        <div>
          <button onClick={(e) => setViewInvoice(!viewInvoice)}>
            {viewInvoice ? 'Hide Invoice' : 'View Invoice'}
          </button>
        </div>
        <div>
          <button
            onClick={(e) =>
              saveBuyerInfo(buyer, order.email, setBuyerInfoSaved)
            }
          >
            Save Buyer Info
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {viewInvoice && (
          <PDFViewer
            style={{
              justifyContent: 'center',
              width: '100%',
              maxWidth: '800px',
              maxHeight: '1000px',
              aspectRatio: '4 / 6',
            }}
          >
            <Invoice />
          </PDFViewer>
        )}
      </div>
    </div>
  );
}
