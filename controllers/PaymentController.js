const Payment = require("../models/PaymentModel");
const Joi = require("joi");

const createPayment = async (req, res) => {
  const schema = Joi.object({
    orderId: Joi.string().required(),
    amount: Joi.number().required(),
    paymentMethod: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { orderId, amount, paymentMethod } = value;

    const payment = new Payment({
      orderId,
      amount,
      paymentMethod,
    });

    const savedPayment = await payment.save();

    res.status(201).json({ payment: savedPayment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create payment" });
  }
};
const getAll = async (req, res) => {
  try {
    const data = await Payment.find({isDeleted:false});
    return res.json(data);
  } catch (error) {
    return res.json({ message: "Co loi" });
  }
};
const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;
    const { status } = req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json({ payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ error: "Failed to update payment" });
  }
};
const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.paymentId;

    const deletedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete payment" });
  }
};

const getDetailPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (payment) {
      return res.json(payment);
    } else {
      return res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  createPayment,
  getAll,
  updatePayment,
  deletePayment,
  getDetailPayment,
};
