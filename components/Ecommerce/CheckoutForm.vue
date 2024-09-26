<template>
  <div class="wrapper">
    <!-- prettier-ignore -->
    <div class="checkout-form">
      <div>
        <EcommerceCheckoutComponentsCheckoutContact
          @email-changed="updateUserEmail"
          @verify-email-changed="updateUserVerifyEmail"
          :invalid="invalidEmail"
        />
        <EcommerceCheckoutComponentsShipping
          @first-name-changed="updateFirstName"
          @last-name-changed="updateLastName"
          @address-changed="updateAddress"
          @billing-first-name-changed="updateBillingFirstName"
          @billing-last-name-changed="updateBillingLastName"
          @billing-address-changed="updateBillingAddress"
          :invalidAddress="invalidAddress"
          :invalidBillingAddress="invalidBillingAddress"
          :invalidFirstName="invalidFirstName"
          :invalidBillingFirstName="invalidBillingFirstName"
          :invalidLastName="invalidLastName"
          :invalidBillingLastName="invalidBillingLastName"
          :same-as-shipping="sameAsShipping"
          @update-same-as-shipping="updateSameAsShipping"
        />
        <EcommerceCheckoutComponentsSquarePaymentForm
          :formsValid="formsValid"
          :userLocation="shippingAddress"
          :isLoading="isLoading"
          @orderRequest="orderInfoIsValid()"
          @sendConfirmationEmail="sendConfirmationEmail()"
          @processOrder="processOrder()"
          @sendFailureEmail="sendFailureEmail()"
          @toggleLoadingTrue="toggleLoadingTrue()"
          @toggleLoadingFalse="toggleLoadingFalse()"
        />
      </div>
      <div>
        <EcommerceBasicCart :checkout="true" :userLocation="shippingAddress" />
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const store = useItemStore();
const env = "CAT";

// console.log("Tax id num: ", process.env.TAX_ID_NUM);

// Define reactive properties
const formsValid = ref(false);
const isLoading = ref(false);
const invalidEmail = ref("");
const invalidAddress = ref("");
const invalidBillingAddress = ref("");
const invalidFirstName = ref("");
const invalidBillingFirstName = ref("");
const invalidLastName = ref("");
const invalidBillingLastName = ref("");
const userEmail = ref("");
const userVerifyEmail = ref("");
const firstName = ref("");
const billingFirstName = ref("");
const lastName = ref("");
const billingLastName = ref("");
const shippingAddress = ref({
  streetAddress: "",
  secondaryAddress: "",
  city: "",
  state: "",
  urbanization: "",
  ZIPCode: "",
  ZIPPlus4: "",
});
const billingAddress = ref({
  streetAddress: "",
  secondaryAddress: "",
  city: "",
  state: "",
  urbanization: "",
  ZIPCode: "",
  ZIPPlus4: "",
});
const sameAsShipping = ref(true);
const pricingInfo = ref({
  originZIPCode: "84109",
  destinationZIPCode: "84097",
  weight: 1,
  length: 4,
  width: 4,
  height: 4,
  mailClass: "USPS_RETAIL_GROUND",
  priceType: "RETAIL",
});
const packageDescription = ref({
  weight: 1,
  length: 4,
  width: 4,
  height: 4,
  mailClass: "USPS_RETAIL_GROUND",
  rateIndicator: "SP",
  processingCategory: "MACHINABLE",
  destinationEntryFacilityType: "NONE",
  mailingData: "",
});
const labelFromAddress = ref({
  streetAddress: "1229 s 1100 e",
  city: "Orem",
  state: "UT",
  ZIPCode: "84097",
});
let accessToken;

if (env == "CAT") {
  accessToken = await $fetch("/api/shipping/cat/cat-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
} else {
  accessToken = await $fetch("/api/shipping/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Full order processing
const processOrder = async () => {
  // console.log("Order Processing");

  billingAddress.value.firstName = billingFirstName.value; // The code is somehow setting shippingAddress first and last names only when it is needed. Opposite for
  billingAddress.value.lastName = billingLastName.value; // billing address. I'm real confused.
  let labelToAddress = shippingAddress.value; // This is the issue. Altering labelToAddress also alters the value it is set to. Not sure how the console log statements
  labelToAddress.firstName = firstName.value; // are seeing this change even when they're set before these changes should take place. Probably cause emits are not async.
  labelToAddress.lastName = lastName.value;
  labelToAddress.email = userEmail.value;

  try {
    const labelResponse = await $fetch("/api/shipping/label", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toAddress: labelToAddress,
        fromAddress: labelFromAddress.value,
        packageDescription: packageDescription.value,
      }),
    });
    // console.log("Post label info response: ", labelResponse);
  } catch (error) {
    console.log("Error posting label info: ", error);
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  let taxInfo = {
    invoiceNumber: "", // Calculated in API
    date: formattedDate,
    totalCost: 0, // Calculated in API
    itemizedList: store.cart,
    salesTax: 0, // Calculated in API
    salesTaxRate: 0, // Calculated in API
    buyersBillingAddress: billingAddress.value,
    buyersShippingAddress: shippingAddress.value,
    sellersBusinessInformation: {
      businessName: "National Auto Hub",
      address: labelFromAddress.value,
      taxIDNum: 0, // Calculated in API
    },
    paymentMethod: "CARD",
  };

  try {
    const taxResponse = await $fetch("/api/tax", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: taxInfo,
    });
    // console.log("Post tax info response: ", taxResponse);
    let substring = "INV-";
    store.setOrderDetails({
      id: taxResponse.invoiceNumber.replace(substring, ""), // Replace with actual order ID if available
      customerName: `${firstName.value} ${lastName.value}`,
      customerEmail: userEmail.value,
      customerAddress: `${shippingAddress.value.streetAddress}, ${shippingAddress.value.city}, ${shippingAddress.value.state}, ${shippingAddress.value.ZIPCode}`,
      items: store.cart,
      total: taxResponse.totalCost,
    });

    // Navigate to the Order Confirmation page
    router.push({ name: "OrderConfirmation" });
  } catch (error) {
    console.log("Error posting label info: ", error);
  }
};

// Order Confirmation Email (Probably to be implemented on portal site instead)
const sendOrderConfirmationEmail = async () => {
  let orderDetails = [];
  let totalCost = 0;

  store.cart.forEach((item) => {
    let itemCost = item.price * item.quantity;
    orderDetails.push(`${item.name} x ${item.quantity} = $${itemCost}`);
    totalCost += itemCost;
  });

  let orderString = orderDetails.join("<br>") + `<br>Total: $${totalCost}`;

  // console.log(orderString);
  try {
    const response = await fetch(
      "https://jf32m0961a.execute-api.us-east-2.amazonaws.com/first/send-custom-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: userEmail.value,
          from: "thomas@hartecho.com",
          message:
            "Your order has been placed! Order details will be sent after your order is processed.",
          company: "National Auto Hub",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log("was error in checkout form sendConfirmationEmail()");
  }
};

// FAILURE EMAIL (SHOULD BE FOR ORDER PROCESSING WHEN INPUTS ARE CORRECT, NOT INCORRECT INPUTS) (DONE)
const sendFailureEmail = async () => {
  try {
    const response = await fetch(
      "https://jf32m0961a.execute-api.us-east-2.amazonaws.com/first/send-custom-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: userEmail.value,
          from: "thomas@hartecho.com",
          message:
            "There was a problem processing your order. Please try again. If this continues, please contact us through the contact page on our website.",
          company: "National Auto Hub",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log("was error in checkout form sendConfirmationEmail()");
  }
};

// CONFIRMATION EMAIL THAT THEIR INFORMATION WAS CORRECT AND THEIR ORDER IS BEING PROCESSED (DONE)
const sendConfirmationEmail = async () => {
  try {
    const response = await fetch(
      "https://jf32m0961a.execute-api.us-east-2.amazonaws.com/first/send-custom-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: userEmail.value,
          from: "thomas@hartecho.com",
          message:
            "Your order has been placed! Order details will be sent after your order is processed.",
          company: "National Auto Hub",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      // console.log("Confirmation email sent successfully");
    }
  } catch (error) {
    console.log("was error in checkout form sendConfirmationEmail()");
  }
};

// ORDER INFO CHECK ON SUBMIT (DONE)
const orderInfoIsValid = async () => {
  let invalidField = false;
  formsValid.value = false;

  if (!verifyEmail()) {
    invalidEmail.value = "Email format is not valid";
    invalidField = true;
  }

  if (userEmail.value != userVerifyEmail.value) {
    invalidEmail.value = "Emails do not match";
    invalidField = true;
  }

  if (!firstName.value) {
    invalidFirstName.value = "Missing first name";
    invalidField = true;
  }

  if (!lastName.value) {
    invalidLastName.value = "Missing last name";
    invalidField = true;
  }

  if (!billingFirstName.value) {
    invalidBillingFirstName.value = "Missing first name";
    invalidField = true;
  }

  if (!billingLastName.value) {
    invalidBillingLastName.value = "Missing last name";
    invalidField = true;
  }

  if (!lastName.value) {
    invalidLastName.value = "Missing last name";
    invalidField = true;
  }

  if (!(await verifyAddress("shipping"))) {
    invalidAddress.value = "Invalid shipping address";
    invalidField = true;
  }

  if (!sameAsShipping.value && !(await verifyAddress("billing"))) {
    invalidBillingAddress.value = "Please enter a valid billing address";
    invalidField = true;
  }

  if (invalidField) {
    isLoading.value = false;
  }

  formsValid.value = !invalidField;
  return !invalidField;
};

// SUB-VERIFICATIONS (DONE)
const verifyEmail = () => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(userEmail.value);
};

const verifyAddress = async (addressType) => {
  let address;
  if (addressType == "shipping") {
    address = shippingAddress.value;
  } else {
    address = billingAddress.value;
  }

  if (!address.streetAddress) {
    return false;
  }
  pricingInfo.value.destinationZIPCode = address.ZIPCode;
  const filteredAddress = Object.fromEntries(
    Object.entries(address).filter(([key, value]) => value)
  );
  try {
    let fetchURL;
    if (env == "CAT") {
      fetchURL = "/api/shipping/cat/cat-verify-address";
    } else {
      fetchURL = "/api/shipping/verify-address";
    }
    const response = await $fetch(fetchURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        address: filteredAddress,
        accessToken: accessToken,
      },
    });
    if (response.additionalInfo.DPVConfirmation === "Y") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error verifying address:", error);
    return false;
  }
};

// UPDATES ON USER INPUT (DONE)
const updateUserEmail = (newEmail) => {
  invalidEmail.value = "";
  userEmail.value = newEmail;
};

const updateUserVerifyEmail = (newVerifyEmail) => {
  invalidEmail.value = "";
  userVerifyEmail.value = newVerifyEmail;
};

const updateFirstName = (newFirstName) => {
  invalidFirstName.value = "";
  firstName.value = newFirstName;
  shippingAddress.value.firstName = newFirstName; // Explicit update
  if (sameAsShipping.value) {
    billingAddress.value.firstName = newFirstName;
  }
};

const updateLastName = (newLastName) => {
  invalidLastName.value = "";
  lastName.value = newLastName;
  shippingAddress.value.lastName = newLastName; // Explicit update
  if (sameAsShipping.value) {
    billingAddress.value.lastName = newLastName;
  }
};

const updateAddress = (newAddress) => {
  invalidAddress.value = "";
  shippingAddress.value = newAddress;
  if (sameAsShipping.value) {
    billingAddress.value = { ...newAddress };
  }
};

const updateBillingFirstName = (newFirstName) => {
  invalidFirstName.value = "";
  billingFirstName.value = newFirstName;
  // billingAddress.value.firstName = newFirstName;
};

const updateBillingLastName = (newLastName) => {
  invalidLastName.value = "";
  billingLastName.value = newLastName;
  // billingAddress.value.lastName = newLastName;
};

const updateBillingAddress = (newAddress) => {
  invalidAddress.value = "";
  billingAddress.value = newAddress;
};

const updateSameAsShipping = (value) => {
  sameAsShipping.value = value;
  if (value) {
    billingAddress.value = { ...shippingAddress.value };
  }
};

const toggleLoadingTrue = () => {
  isLoading.value = true;
};

const toggleLoadingFalse = () => {
  isLoading.value = false;
};

// OPTIONAL FUNCTION IF WE WANT TO KNOW THE SHIPPING COSTS DEPENDING ON THE ADDRESS (DONE)
const getShippingPrice = async () => {
  const filteredPricingInfo = Object.fromEntries(
    Object.entries(pricingInfo.value).filter(([key, value]) => value !== "")
  );
  try {
    const response = await $fetch("/api/shipping/get-price", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        pricingInfo: filteredPricingInfo,
        accessToken: accessToken,
      },
    });

    console.log("totalPrice: ", response);
    const shippingPriceResponse = response.rateOptions[0].totalBasePrice;
  } catch (error) {
    console.error("Error verifying address:", error);
    return null;
  }
};
</script>

<style scoped>
.wrapper {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem;
}

.checkout-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  padding: 3rem;
  color: white;
  height: auto;
  background: rgba(58, 58, 59, 0.95);
  border-radius: 0px;
  box-shadow: 0px 0px 2px rgba(255, 255, 255, 1);
}

@media (max-width: 768px) {
  .wrapper {
    padding: 0;
  }

  .checkout-form {
    display: flex;
    flex-direction: column-reverse;
    padding: 1rem;
    border-radius: 0;
    height: 100%;
    box-shadow: none;
    margin-bottom: 5rem;
  }

  .checkout-form > div:first-child {
    flex: 1 1 auto;
  }

  .checkout-form > div:last-child {
    flex: 0 0 auto;
  }
}
</style>
