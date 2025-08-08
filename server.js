const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const newEmployeesData = [
    {
      identifier: { id: 951, firstName: "Liam", lastName: "Anderson" },
      position: { title: "Frontend Developer", duration: 4 },
      team: 1,
      birthday: new Date("1991-01-20"),
      contact: { email: "liam.anderson@example.com", phone: "555-1478" },
      address: "111 Redwood St, Riverdale",
      status: "Full-time",
    },
    {
      identifier: { id: 762, firstName: "Mia", lastName: "Robinson" },
      position: { title: "Backend Developer", duration: 5 },
      team: 2,
      birthday: new Date("1989-04-11"),
      contact: { email: "mia.robinson@example.com", phone: "555-3692" },
      address: "222 Cypress Rd, Emerald City",
      status: "Full-time",
    },
    {
      identifier: { id: 385, firstName: "Noah", lastName: "Harris" },
      position: { title: "Project Manager", duration: 6 },
      team: 3,
      birthday: new Date("1985-09-03"),
      contact: { email: "noah.harris@example.com", phone: "555-8527" },
      address: "333 Magnolia Ln, Sunnydale",
      status: "Full-time",
    },
    {
      identifier: { id: 694, firstName: "Olivia", lastName: "Clark" },
      position: { title: "QA Specialist", duration: 3 },
      team: 1,
      birthday: new Date("1993-12-22"),
      contact: { email: "olivia.clark@example.com", phone: "555-7410" },
      address: "444 Elmwood Ave, Hill Valley",
      status: "Full-time",
    },
    {
      identifier: { id: 812, firstName: "Ethan", lastName: "Lewis" },
      position: { title: "UI Designer", duration: 2 },
      team: 2,
      birthday: new Date("1992-07-14"),
      contact: { email: "ethan.lewis@example.com", phone: "555-9631" },
      address: "555 Pinecrest Dr, Twin Peaks",
      status: "Full-time",
    },
    {
      identifier: { id: 479, firstName: "Sophia", lastName: "Walker" },
      position: { title: "Data Engineer", duration: 4 },
      team: 3,
      birthday: new Date("1988-10-29"),
      contact: { email: "sophia.walker@example.com", phone: "555-2584" },
      address: "666 Birchwood Ct, Gotham",
      status: "Full-time",
    },
    {
      identifier: { id: 523, firstName: "James", lastName: "Hall" },
      position: { title: "DevOps Specialist", duration: 5 },
      team: 4,
      birthday: new Date("1986-03-17"),
      contact: { email: "james.hall@example.com", phone: "555-6547" },
      address: "777 Maple Blvd, Central City",
      status: "Full-time",
    },
    {
      identifier: { id: 306, firstName: "Amelia", lastName: "Young" },
      position: { title: "Content Strategist", duration: 3 },
      team: 5,
      birthday: new Date("1990-11-08"),
      contact: { email: "amelia.young@example.com", phone: "555-7893" },
      address: "888 Oak St, Star City",
      status: "Full-time",
    },
    {
      identifier: { id: 687, firstName: "William", lastName: "King" },
      position: { title: "Technical Writer", duration: 2 },
      team: 4,
      birthday: new Date("1994-05-25"),
      contact: { email: "william.king@example.com", phone: "555-3210" },
      address: "999 Cedar Rd, Metropolis",
      status: "Full-time",
    },
    {
      identifier: { id: 801, firstName: "Isabella", lastName: "Scott" },
      position: { title: "Customer Support", duration: 1 },
      team: 5,
      birthday: new Date("1996-08-12"),
      contact: { email: "isabella.scott@example.com", phone: "555-4321" },
      address: "1010 Spruce Ln, Blüdhaven",
      status: "Full-time",
    },
  ];
  
  app.get('/api/add-employee', (req, res) => {
    if (newEmployeesData.length === 0) {
      return res.status(404).send({ success: false, message: 'No new employees' });
    }
  
    const newEmployee = newEmployeesData.pop();
    io.emit('new-employee', newEmployee);
    res.send({ success: true, employee: newEmployee });
  });

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
