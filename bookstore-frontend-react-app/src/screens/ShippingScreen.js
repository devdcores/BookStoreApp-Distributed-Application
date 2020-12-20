import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, ListGroup, InputGroup, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch } from 'react-redux';
import { saveShippingAddressIdToLocalStorage, saveBillingAddressIdToLocalStorage } from '../actions/orderActions';
import { getMyAddresesAction, saveAddressAction, deleteAddressAction } from '../actions/addressActions';
import Loader from '../components/Loader';

const ShippingScreen = ({ history }) => {
  const [shippingCheckbox, setShippingCheckbox] = useState(true);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [billingAddressId, setBillingAddressId] = useState('');
  const [shippingAddressId, setShippingAddressId] = useState('');

  const dispatch = useDispatch();

  const addressList = useSelector((state) => state.addressListMy);
  const { addresses, loading: addressListLoading, error: addressListError } = addressList;

  const addressSave = useSelector((state) => state.addressSave);
  const { success, loading: addressSaveLoading, error: addressSaveError } = addressSave;

  useEffect(() => {
    getShippingAddress();
    if (addresses?.length > 0) {
      setBillingAddressId(addresses[0].addressId);
      setShippingAddressId(addresses[0].addressId);
    }
  }, [dispatch]);

  const getShippingAddress = async () => {
    dispatch(getMyAddresesAction());
  };

  const saveAddressHandler = async (e) => {
    e.preventDefault();
    const addressRequestBody = {
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      phone
    };
    setAddressLine1('');
    setAddressLine2('');
    setCity('');
    setState('');
    setPostalCode('');
    setCountry(0);
    setPhone('');
    dispatch(saveAddressAction(addressRequestBody));
  };

  const proceedToPayment = () => {
    if (shippingAddressId === null || shippingAddressId === '') {
      setMessage('Shipping Address is required');
      return;
    }
    dispatch(saveShippingAddressIdToLocalStorage(shippingAddressId));
    dispatch(saveBillingAddressIdToLocalStorage(billingAddressId));
    history.push('/payment');
  };

  const deleteAddress = (addressId) => {
    if (addressId === billingAddressId) {
      setBillingAddressId(null);
    }
    if (addressId === shippingAddressId) {
      setShippingAddressId(null);
    }
    dispatch(deleteAddressAction(addressId));
  };

  return (
    <>
      <Row className='justify-content-md-center'>
        <CheckoutSteps step1 step2 />
      </Row>
      <Row className='mx-5 justify-content-md-center'>
        <h1 className='mx-5 justify-content-md-center'>Address</h1>
      </Row>
      <hr></hr>
      <>
        <Row>
          <Col xs={12} md={6}>
            {addressListLoading ? (
              <Loader></Loader>
            ) : (
              <>
                {addressListError && <Message variant='danger'>{JSON.stringify(addressListError)}</Message>}
                <h2>Select Billing Address</h2>
                {addresses.map((a) => (
                  <div key={a.addressId}>
                    <ListGroup.Item variant='flush'>
                      <InputGroup>
                        <Col md={1}>
                          <Form.Check
                            type='radio'
                            id={a.billingAddressId}
                            value={billingAddressId}
                            name='billingAddress'
                            checked={a.addressId === billingAddressId ? true : false}
                            onChange={() => {
                              if (shippingCheckbox) {
                                setShippingAddressId(a.addressId);
                              }
                              setBillingAddressId(a.addressId);
                            }}
                          ></Form.Check>
                        </Col>
                        <Col>
                          <div
                            className='p-2'
                            style={{
                              whiteSpace: 'pre-wrap',
                              backgroundColor: '#eeeeee'
                            }}
                            onClick={() => {
                              if (shippingCheckbox) {
                                setShippingAddressId(a.addressId);
                              }
                              setBillingAddressId(a.addressId);
                            }}
                          >
                            <p className='m-0'>{a.addressLine1} </p>
                            <p className='m-0'>{a.addressLine2}</p>
                            <p className='m-0'>
                              {a.city}, {a.state}, {a.country}
                            </p>
                            <p className='m-0'>{a.postalCode}</p>
                            <p className='m-0'>{a.phone}</p>
                          </div>
                        </Col>
                        <Col md={2} className='mr-0 pr-0'>
                          <Button type='button' variant='light' onClick={() => deleteAddress(a.addressId)}>
                            <i className='fas fa-trash'></i>
                          </Button>
                        </Col>
                      </InputGroup>
                    </ListGroup.Item>
                  </div>
                ))}
                <Form.Group className='m-5' controlId='shippingCheckbox'>
                  <Form.Check
                    type='checkbox'
                    label='Shipping Address is same as Billing Address'
                    checked={shippingCheckbox}
                    onChange={() => {
                      setShippingCheckbox(!shippingCheckbox);
                    }}
                  />
                </Form.Group>

                {!shippingCheckbox && (
                  <>
                    <h2>Select Shipping Address</h2>
                    {addresses.map((a) => (
                      <div key={a.addressId}>
                        <ListGroup.Item variant='flush'>
                          <InputGroup>
                            <Col md={1}>
                              <Form.Check
                                type='radio'
                                id={a.shippingAddressId}
                                value={shippingAddressId}
                                name='shippingAddress'
                                checked={a.addressId === shippingAddressId ? true : false}
                                onChange={(e) => {
                                  console.log(a.addressId);
                                  setShippingAddressId(a.addressId);
                                }}
                              ></Form.Check>
                            </Col>
                            <Col>
                              <div
                                className='p-2'
                                style={{
                                  whiteSpace: 'pre-wrap',
                                  backgroundColor: '#eeeeee'
                                }}
                                onClick={(e) => {
                                  console.log(a.addressId);
                                  setShippingAddressId(a.addressId);
                                }}
                              >
                                <p className='m-0'>{a.addressLine1} </p>
                                <p className='m-0'>{a.addressLine2}</p>
                                <p className='m-0'>{a.city}</p>
                                <p className='m-0'>{a.state}</p>
                                <p className='m-0'>{a.country}</p>
                                <p className='m-0'>{a.postalCode}</p>
                                <p className='m-0'>{a.phone}</p>
                              </div>
                            </Col>
                            <Col md={2} className='mr-0 pr-0'>
                              <Button type='button' variant='light' onClick={() => deleteAddress(a.addressId)}>
                                <i className='fas fa-trash'></i>
                              </Button>
                            </Col>
                          </InputGroup>
                        </ListGroup.Item>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </Col>
          <Col xs={12} md={6}>
            {addressSaveError && <Message variant='danger'>{JSON.stringify(addressSaveError)}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            <h2>
              <p>Add New Address</p>
            </h2>
            <Form onSubmit={saveAddressHandler}>
              <Row className='mx-5 justify-content-md-center'>
                <Col>
                  <Form.Group controlId='addressLine1'>
                    <Form.Label>Address Line 1</Form.Label>
                    <Form.Control
                      required
                      placeholder='Enter address line 1'
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='addressLine2'>
                    <Form.Label>Address Line 2</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter address line 2'
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter city'
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='state'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter State'
                      value={state}
                      required
                      onChange={(e) => setState(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='country'>
                    <Form.Label>Country Code</Form.Label>
                    <Form.Control as='select' value={country} required onChange={(e) => setCountry(e.target.value)}>
                      <option value='0'>Select Country</option>
                      <option value='AF'>Afghanistan</option>
                      <option value='AX'>Aland Islands</option>
                      <option value='AL'>Albania</option>
                      <option value='DZ'>Algeria</option>
                      <option value='AS'>American Samoa</option>
                      <option value='AD'>Andorra</option>
                      <option value='AO'>Angola</option>
                      <option value='AI'>Anguilla</option>
                      <option value='AQ'>Antarctica</option>
                      <option value='AG'>Antigua and Barbuda</option>
                      <option value='AR'>Argentina</option>
                      <option value='AM'>Armenia</option>
                      <option value='AW'>Aruba</option>
                      <option value='AU'>Australia</option>
                      <option value='AT'>Austria</option>
                      <option value='AZ'>Azerbaijan</option>
                      <option value='BS'>Bahamas</option>
                      <option value='BH'>Bahrain</option>
                      <option value='BD'>Bangladesh</option>
                      <option value='BB'>Barbados</option>
                      <option value='BY'>Belarus</option>
                      <option value='BE'>Belgium</option>
                      <option value='BZ'>Belize</option>
                      <option value='BJ'>Benin</option>
                      <option value='BM'>Bermuda</option>
                      <option value='BT'>Bhutan</option>
                      <option value='BO'>Bolivia</option>
                      <option value='BQ'>Bonaire, Sint Eustatius and Saba</option>
                      <option value='BA'>Bosnia and Herzegovina</option>
                      <option value='BW'>Botswana</option>
                      <option value='BV'>Bouvet Island</option>
                      <option value='BR'>Brazil</option>
                      <option value='IO'>British Indian Ocean Territory</option>
                      <option value='BN'>Brunei Darussalam</option>
                      <option value='BG'>Bulgaria</option>
                      <option value='BF'>Burkina Faso</option>
                      <option value='BI'>Burundi</option>
                      <option value='KH'>Cambodia</option>
                      <option value='CM'>Cameroon</option>
                      <option value='CA'>Canada</option>
                      <option value='CV'>Cape Verde</option>
                      <option value='KY'>Cayman Islands</option>
                      <option value='CF'>Central African Republic</option>
                      <option value='TD'>Chad</option>
                      <option value='CL'>Chile</option>
                      <option value='CN'>China</option>
                      <option value='CX'>Christmas Island</option>
                      <option value='CC'>Cocos (Keeling) Islands</option>
                      <option value='CO'>Colombia</option>
                      <option value='KM'>Comoros</option>
                      <option value='CG'>Congo</option>
                      <option value='CD'>Congo, the Democratic Republic of the</option>
                      <option value='CK'>Cook Islands</option>
                      <option value='CR'>Costa Rica</option>
                      <option value='CI'>Cote D'Ivoire</option>
                      <option value='HR'>Croatia</option>
                      <option value='CU'>Cuba</option>
                      <option value='CW'>Curacao</option>
                      <option value='CY'>Cyprus</option>
                      <option value='CZ'>Czech Republic</option>
                      <option value='DK'>Denmark</option>
                      <option value='DJ'>Djibouti</option>
                      <option value='DM'>Dominica</option>
                      <option value='DO'>Dominican Republic</option>
                      <option value='EC'>Ecuador</option>
                      <option value='EG'>Egypt</option>
                      <option value='SV'>El Salvador</option>
                      <option value='GQ'>Equatorial Guinea</option>
                      <option value='ER'>Eritrea</option>
                      <option value='EE'>Estonia</option>
                      <option value='ET'>Ethiopia</option>
                      <option value='FK'>Falkland Islands (Malvinas)</option>
                      <option value='FO'>Faroe Islands</option>
                      <option value='FJ'>Fiji</option>
                      <option value='FI'>Finland</option>
                      <option value='FR'>France</option>
                      <option value='GF'>French Guiana</option>
                      <option value='PF'>French Polynesia</option>
                      <option value='TF'>French Southern Territories</option>
                      <option value='GA'>Gabon</option>
                      <option value='GM'>Gambia</option>
                      <option value='GE'>Georgia</option>
                      <option value='DE'>Germany</option>
                      <option value='GH'>Ghana</option>
                      <option value='GI'>Gibraltar</option>
                      <option value='GR'>Greece</option>
                      <option value='GL'>Greenland</option>
                      <option value='GD'>Grenada</option>
                      <option value='GP'>Guadeloupe</option>
                      <option value='GU'>Guam</option>
                      <option value='GT'>Guatemala</option>
                      <option value='GG'>Guernsey</option>
                      <option value='GN'>Guinea</option>
                      <option value='GW'>Guinea-Bissau</option>
                      <option value='GY'>Guyana</option>
                      <option value='HT'>Haiti</option>
                      <option value='HM'>Heard Island and Mcdonald Islands</option>
                      <option value='VA'>Holy See (Vatican City State)</option>
                      <option value='HN'>Honduras</option>
                      <option value='HK'>Hong Kong</option>
                      <option value='HU'>Hungary</option>
                      <option value='IS'>Iceland</option>
                      <option value='IN'>India</option>
                      <option value='ID'>Indonesia</option>
                      <option value='IR'>Iran, Islamic Republic of</option>
                      <option value='IQ'>Iraq</option>
                      <option value='IE'>Ireland</option>
                      <option value='IM'>Isle of Man</option>
                      <option value='IL'>Israel</option>
                      <option value='IT'>Italy</option>
                      <option value='JM'>Jamaica</option>
                      <option value='JP'>Japan</option>
                      <option value='JE'>Jersey</option>
                      <option value='JO'>Jordan</option>
                      <option value='KZ'>Kazakhstan</option>
                      <option value='KE'>Kenya</option>
                      <option value='KI'>Kiribati</option>
                      <option value='KP'>Korea, Democratic People"s Republic of</option>
                      <option value='KR'>Korea, Republic of</option>
                      <option value='XK'>Kosovo</option>
                      <option value='KW'>Kuwait</option>
                      <option value='KG'>Kyrgyzstan</option>
                      <option value='LA'>Lao People's Democratic Republic</option>
                      <option value='LV'>Latvia</option>
                      <option value='LB'>Lebanon</option>
                      <option value='LS'>Lesotho</option>
                      <option value='LR'>Liberia</option>
                      <option value='LY'>Libyan Arab Jamahiriya</option>
                      <option value='LI'>Liechtenstein</option>
                      <option value='LT'>Lithuania</option>
                      <option value='LU'>Luxembourg</option>
                      <option value='MO'>Macao</option>
                      <option value='MK'>Macedonia, the Former Yugoslav Republic of</option>
                      <option value='MG'>Madagascar</option>
                      <option value='MW'>Malawi</option>
                      <option value='MY'>Malaysia</option>
                      <option value='MV'>Maldives</option>
                      <option value='ML'>Mali</option>
                      <option value='MT'>Malta</option>
                      <option value='MH'>Marshall Islands</option>
                      <option value='MQ'>Martinique</option>
                      <option value='MR'>Mauritania</option>
                      <option value='MU'>Mauritius</option>
                      <option value='YT'>Mayotte</option>
                      <option value='MX'>Mexico</option>
                      <option value='FM'>Micronesia, Federated States of</option>
                      <option value='MD'>Moldova, Republic of</option>
                      <option value='MC'>Monaco</option>
                      <option value='MN'>Mongolia</option>
                      <option value='ME'>Montenegro</option>
                      <option value='MS'>Montserrat</option>
                      <option value='MA'>Morocco</option>
                      <option value='MZ'>Mozambique</option>
                      <option value='MM'>Myanmar</option>
                      <option value='NA'>Namibia</option>
                      <option value='NR'>Nauru</option>
                      <option value='NP'>Nepal</option>
                      <option value='NL'>Netherlands</option>
                      <option value='AN'>Netherlands Antilles</option>
                      <option value='NC'>New Caledonia</option>
                      <option value='NZ'>New Zealand</option>
                      <option value='NI'>Nicaragua</option>
                      <option value='NE'>Niger</option>
                      <option value='NG'>Nigeria</option>
                      <option value='NU'>Niue</option>
                      <option value='NF'>Norfolk Island</option>
                      <option value='MP'>Northern Mariana Islands</option>
                      <option value='NO'>Norway</option>
                      <option value='OM'>Oman</option>
                      <option value='PK'>Pakistan</option>
                      <option value='PW'>Palau</option>
                      <option value='PS'>Palestinian Territory, Occupied</option>
                      <option value='PA'>Panama</option>
                      <option value='PG'>Papua New Guinea</option>
                      <option value='PY'>Paraguay</option>
                      <option value='PE'>Peru</option>
                      <option value='PH'>Philippines</option>
                      <option value='PN'>Pitcairn</option>
                      <option value='PL'>Poland</option>
                      <option value='PT'>Portugal</option>
                      <option value='PR'>Puerto Rico</option>
                      <option value='QA'>Qatar</option>
                      <option value='RE'>Reunion</option>
                      <option value='RO'>Romania</option>
                      <option value='RU'>Russian Federation</option>
                      <option value='RW'>Rwanda</option>
                      <option value='BL'>Saint Barthelemy</option>
                      <option value='SH'>Saint Helena</option>
                      <option value='KN'>Saint Kitts and Nevis</option>
                      <option value='LC'>Saint Lucia</option>
                      <option value='MF'>Saint Martin</option>
                      <option value='PM'>Saint Pierre and Miquelon</option>
                      <option value='VC'>Saint Vincent and the Grenadines</option>
                      <option value='WS'>Samoa</option>
                      <option value='SM'>San Marino</option>
                      <option value='ST'>Sao Tome and Principe</option>
                      <option value='SA'>Saudi Arabia</option>
                      <option value='SN'>Senegal</option>
                      <option value='RS'>Serbia</option>
                      <option value='CS'>Serbia and Montenegro</option>
                      <option value='SC'>Seychelles</option>
                      <option value='SL'>Sierra Leone</option>
                      <option value='SG'>Singapore</option>
                      <option value='SX'>Sint Maarten</option>
                      <option value='SK'>Slovakia</option>
                      <option value='SI'>Slovenia</option>
                      <option value='SB'>Solomon Islands</option>
                      <option value='SO'>Somalia</option>
                      <option value='ZA'>South Africa</option>
                      <option value='GS'>South Georgia and the South Sandwich Islands</option>
                      <option value='SS'>South Sudan</option>
                      <option value='ES'>Spain</option>
                      <option value='LK'>Sri Lanka</option>
                      <option value='SD'>Sudan</option>
                      <option value='SR'>Suriname</option>
                      <option value='SJ'>Svalbard and Jan Mayen</option>
                      <option value='SZ'>Swaziland</option>
                      <option value='SE'>Sweden</option>
                      <option value='CH'>Switzerland</option>
                      <option value='SY'>Syrian Arab Republic</option>
                      <option value='TW'>Taiwan, Province of China</option>
                      <option value='TJ'>Tajikistan</option>
                      <option value='TZ'>Tanzania, United Republic of</option>
                      <option value='TH'>Thailand</option>
                      <option value='TL'>Timor-Leste</option>
                      <option value='TG'>Togo</option>
                      <option value='TK'>Tokelau</option>
                      <option value='TO'>Tonga</option>
                      <option value='TT'>Trinidad and Tobago</option>
                      <option value='TN'>Tunisia</option>
                      <option value='TR'>Turkey</option>
                      <option value='TM'>Turkmenistan</option>
                      <option value='TC'>Turks and Caicos Islands</option>
                      <option value='TV'>Tuvalu</option>
                      <option value='UG'>Uganda</option>
                      <option value='UA'>Ukraine</option>
                      <option value='AE'>United Arab Emirates</option>
                      <option value='GB'>United Kingdom</option>
                      <option value='US'>United States</option>
                      <option value='UM'>United States Minor Outlying Islands</option>
                      <option value='UY'>Uruguay</option>
                      <option value='UZ'>Uzbekistan</option>
                      <option value='VU'>Vanuatu</option>
                      <option value='VE'>Venezuela</option>
                      <option value='VN'>Viet Nam</option>
                      <option value='VG'>Virgin Islands, British</option>
                      <option value='VI'>Virgin Islands, U.s.</option>
                      <option value='WF'>Wallis and Futuna</option>
                      <option value='EH'>Western Sahara</option>
                      <option value='YE'>Yemen</option>
                      <option value='ZM'>Zambia</option>
                      <option value='ZW'>Zimbabwe</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter postal code'
                      value={postalCode}
                      required
                      onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='phone'>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter Phone number'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className='mx-5 justify-content-md-center'>
                <Button type='submit' variant='primary' disabled={addressSaveLoading}>
                  {addressSaveLoading ? (
                    <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                  ) : (
                    <>Add New Address</>
                  )}
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>

        <hr></hr>
        <Row className='mx-5 justify-content-md-center'>
          <Button type='submit' variant='primary' onClick={proceedToPayment} className='mt-3' disabled={!shippingAddressId}>
            Proceed to Payment
          </Button>
        </Row>
      </>
    </>
  );
};

export default ShippingScreen;
