import express from 'express';
import { loginDoctor, logoutDoctor, registerDoctor,refreshDoctorToken } from '../controllers/doctorController';

const router = express.Router();

router.post('/login', loginDoctor);
router.post('/refreshtoken', refreshDoctorToken);
router.post('/logout', logoutDoctor);

// Doctor registration route
router.post('/register', async (req, res) => {
  const { name, email, password, specialization } = req.body;

  try {
    await registerDoctor(name, email, password, specialization);
    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering doctor' });
  }
});

export default router;