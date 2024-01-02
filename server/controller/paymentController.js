import { instance } from "../index.js";


 export const checkout = async (req,res) => {
  var options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  const order = await instance.orders.create(options);
 
  res.status(200).json({
    success:true,
    order
  })
};

