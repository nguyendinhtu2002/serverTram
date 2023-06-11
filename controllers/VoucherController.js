const Voucher = require("../models/Voucher");
const Joi = require("joi");

const createVoucher = async (req, res) => {
  const schema = Joi.object({
    code: Joi.string().required(),
    discount: Joi.number().required(),
    expiryDays: Joi.date().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { code, discount, expiryDays } = value;

    const voucher = new Voucher({
      code,
      discount,
      expiryDays,
    });

    const savedVoucher = await voucher.save();

    res.status(201).json({ voucher: savedVoucher });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create voucher" });
  }
};
const getVoucher = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.json({ vouchers });
  } catch (error) {
    res.status(500).json({ error: "Failed to get vouchers" });
  }
};
const updateVoucher = async (req, res) => {
  try {
    const voucherId = req.params.id;

    const  updatedData  = req.body;
    
    const updatedVoucher = await Voucher.findByIdAndUpdate(
      voucherId,
      updatedData,
      { new: true }
    );

    if (!updatedVoucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }

    res.json({ voucher: updatedVoucher });
  } catch (error) {
    res.status(500).json({ error: "Failed to update voucher" });
  }
};
const deleteVoucher = async (req, res) => {
  try {
    const voucherId = req.params.id;

    const existingVoucher = await Voucher.findById(voucherId);
    if (!existingVoucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }

    await Voucher.findByIdAndDelete(voucherId);

    res.status(200).json({ message: "Voucher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete voucher" });
  }
};
module.exports = { createVoucher, getVoucher, updateVoucher, deleteVoucher };