export interface Pickjob {
  orderRef:            string;
  orderDate:           Date;
  tenantOrderId:       string;
  facilityRef:         string;
  status:              string;
  pickLineItems:       PickLineItem[];
  deliveryinformation: Deliveryinformation;
  customAttributes:    CustomAttributes;
}

export interface CustomAttributes {
}

export interface Deliveryinformation {
  targetTime: Date;
  channel:    string;
  details:    Details;
}

export interface Details {
  collect:  Collect;
  shipping: Shipping;
}

export interface Collect {
  identifier: string;
}

export interface Shipping {
  recipientaddress: Recipientaddress;
}

export interface Recipientaddress {
  street:                string;
  houseNumber:           string;
  postalCode:            string;
  city:                  string;
  country:               string;
  phoneNumbers:          PhoneNumber[];
  additionalAddressInfo: string;
  customAttributes:      CustomAttributes;
  salutation:            string;
  firstName:             string;
  lastName:              string;
  companyName:           string;
}

export interface PhoneNumber {
  value:            string;
  label:            string;
  type:             string;
  customAttributes: CustomAttributes;
}

export interface PickLineItem {
  article:          Article;
  quantity:         number;
  scannableCodes:   string[];
  customAttributes: CustomAttributes;
}

export interface Article {
  tenantArticleId:  string;
  title:            string;
  imageUrl:         string;
  customAttributes: CustomAttributes;
  attributes:       Attribute[];
}

export interface Attribute {
  category: string;
  priority: number;
  key:      string;
  value:    string;
}
