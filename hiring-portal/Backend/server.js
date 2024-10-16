const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const compilex = require("compilex");
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoute');
const companyRoutes = require('./routes/companyRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const otherApiRoutes = require('./routes/otherApiRoutes');
const directRoutes = require('./routes/directRoutes');

const contactRoutes = require('./routes/contactRoutes');
const bookmarksRoutes = require('./routes/bookmarksRoute');

const blogRoutes = require('./routes/blogRoutes')


const http = require("http");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api', userRoutes);
app.use('/api', jobRoutes);
app.use('/api', applicationRoutes);
app.use('/api', companyRoutes);
app.use('/api', assessmentRoutes);

app.use('/api', otherApiRoutes);
app.use('/api', contactRoutes);

app.use('/api', blogRoutes);
app.use('/api', otherApiRoutes);
app.use('/api', bookmarksRoutes);
app.use('/', directRoutes);

app.use(bodyParser.json());
const options = { stats: true };
compilex.init(options);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
