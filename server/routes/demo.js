const router = require('express').Router();
const prisma = require('../db');
const logger = require('../utils/logger');

// POST /api/demo/reading  — one-button write (no auth required)
router.post('/reading', async (req, res, next) => {
  try {
    const value = Math.round(60 + Math.random() * 40);   // simulated bpm 60-100
    const reading = await prisma.sensorReading.create({
      data: { type: 'heartRate', value, unit: 'bpm', label: 'Button press demo' },
    });
    logger.info('Demo reading recorded', { id: reading.id, value, correlationId: req.correlationId });
    res.status(201).json({ success: true, reading });
  } catch (err) {
    next(err);
  }
});

// GET /api/demo/readings  — last 10 readings
router.get('/readings', async (req, res, next) => {
  try {
    const readings = await prisma.sensorReading.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    res.json({ readings });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
