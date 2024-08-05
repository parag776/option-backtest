import calculateTotalResult from "../services/calculationService.js";

export default async (req, res) => {
  try {
    const result = await calculateTotalResult(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error processing backtest', error: error.message });
  }
};
