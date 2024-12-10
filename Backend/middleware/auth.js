// // In middleware/auth.js
// import jwt from 'jsonwebtoken';
// import Patient from '../models/patientModels.js';

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decoded = jwt.verify(token, 'suraj');
//     const patient = await Patient.findOne({ _id: decoded._id, 'tokens.token': token });

//     if (!patient) {
//       throw new Error();
//     }

//     req.token = token;
//     req.patient = patient;
//     req.patientId = patient._id; // Attach the patientId to the request
//     next();
//   } catch (error) {
//     res.status(401).send({ error: 'Please authenticate.' });
//   }
// };

// export default auth;

import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'suraj');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};

export default auth;
