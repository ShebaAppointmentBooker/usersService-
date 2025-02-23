import express from 'express';
import { loginPatient, logoutPatient, registerPatient,refreshPatientToken } from '../controllers/patientController';

const router = express.Router();

router.post('/login', loginPatient);
router.post('/refreshtoken', refreshPatientToken);
router.post('/logout', logoutPatient);

// Patient registration route
router.post('/register', async (req, res) => {
  const { name, email, password, medicalHistory } = req.body;

  try {
    await registerPatient(name, email, password, medicalHistory);
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering patient' });
  }
});

export default router;
