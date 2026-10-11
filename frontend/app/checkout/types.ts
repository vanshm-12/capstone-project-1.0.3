export interface CheckoutFormValues {
  first_name: string;
  last_name: string;
  address_line: string;
  email: string;
  city: string;
  pin: string;
  phone: string;
  country: string;
  coupon: string;
}

export const defaultCheckoutValues: CheckoutFormValues = {
  first_name: "Daniel",
  last_name: "Reed",
  address_line: "Flat 402, High Street Heights, Silicon Park",
  email: "daniel.reed@example.com",
  city: "Mumbai",
  pin: "400001",
  country: "India",
  phone: "9876543210",
  coupon: "",
};

