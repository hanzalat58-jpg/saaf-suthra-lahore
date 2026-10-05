const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'complaints.json');

app.use(cors());
app.use(express.json({ limit: '1mb' }));

function readComplaints() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeComplaints(items) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf8');
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Saaf Suthra Lahore API' });
});

app.get('/api/complaints', (_req, res) => {
  const complaints = readComplaints();
  res.json({ count: complaints.length, complaints });
});

app.post('/api/complaints', (req, res) => {
  const { name, phone, area, issueType, description } = req.body || {};

  if (!name || !phone || !area || !issueType || !description) {
    return res.status(400).json({ message: 'All complaint fields are required.' });
  }

  const complaints = readComplaints();
  const complaint = {
    id: Date.now(),
    reference: `SSL-${Date.now().toString().slice(-8)}`,
    name: String(name).trim().slice(0, 100),
    phone: String(phone).trim().slice(0, 30),
    area: String(area).trim().slice(0, 100),
    issueType: String(issueType).trim().slice(0, 100),
    description: String(description).trim().slice(0, 1000),
    createdAt: new Date().toISOString()
  };

  complaints.push(complaint);
  writeComplaints(complaints);

  res.status(201).json({
    message: 'Complaint submitted successfully.',
    reference: complaint.reference,
    complaint
  });
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(PORT, () => {
  console.log(`Saaf Suthra Lahore server running on http://localhost:${PORT}`);
});
