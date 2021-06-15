export interface Order {
  orderDate:           Date;
  consumer:            Consumer;
  tenantOrderId:       string;
  status:              string;
  orderLineItems:      OrderLineItem[];
  deliveryPreferences: DeliveryPreferences;
  customAttributes:    CustomAttributes;
}

export interface Consumer {
  email:            string;
  addresses:        Address[];
  customAttributes: CustomAttributes;
}

export interface Address {
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

export interface CustomAttributes {
}

export interface PhoneNumber {
  value:            string;
  label:            string;
  type:             string;
  customAttributes: CustomAttributes;
}

export interface DeliveryPreferences {
  targetTime: Date;
  collect:    Collect[];
  shipping:   Shipping;
}

export interface Collect {
  facilityRef: string;
}

export interface Shipping {
  servicetype:       string;
  preferredCarriers: string[];
}

export interface OrderLineItem {
  article:          Article;
  quantity:         number;
  scannableCodes:   string[];
  shopPrice:        number;
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
