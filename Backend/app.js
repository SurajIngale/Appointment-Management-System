
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import cors from "cors"; // Import cors module

const app = express();
const port = 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

connectDB();

app.get("/", (req, res) => res.send("Hello world"));
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));

// import express from "express";
// import bodyParser from "body-parser";
// import connectDB from "./config/db.js";
// import patientRoutes from "./routes/patientRoutes.js";
// import doctorRoutes from "./routes/doctorRoutes.js";
// import appointmentRoutes from "./routes/appointmentRoutes.js"

// const app = express();
// const port = 5000;


// app.use(express.json());
// app.use(bodyParser.json());
// // app.use(cors());

// connectDB();

// app.get('/', (req, res) => res.send('Hello world'));
// app.use("/api/patients", patientRoutes);
// app.use("/api/doctors", doctorRoutes)
// app.use('/api/appointments', appointmentRoutes);

// app.listen(port, () => console.log(`Server is running on port ${port}`));

