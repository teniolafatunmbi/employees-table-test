export type Employee = {
  identifier: { id: number; firstName: string; lastName: string };
  position: { title: string; duration: number };
  team: number;
  birthday: Date;
  contact: { email: string; phone: string };
  address: string;
  status: string;
};

export const employeesData: Employee[] = [
  {
    identifier: { id: 900, firstName: "Alice", lastName: "Johnson" },
    position: { title: "Software Engineer", duration: 3 },
    team: 1,
    birthday: new Date("1990-05-15"),
    contact: { email: "alice.johnson@example.com", phone: "555-1234" },
    address: "123 Maple St, Springfield",
    status: "Full-time",
  },
  {
    identifier: { id: 163, firstName: "Bob", lastName: "Smith" },
    position: { title: "Product Manager", duration: 5 },
    team: 2,
    birthday: new Date("1985-11-22"),
    contact: { email: "bob.smith@example.com", phone: "555-5678" },
    address: "456 Oak Ave, Metropolis",
    status: "Full-time",
  },
  {
    identifier: { id: 567, firstName: "Catherine", lastName: "Lee" },
    position: { title: "UX Designer", duration: 2 },
    team: 1,
    birthday: new Date("1992-07-30"),
    contact: { email: "catherine.lee@example.com", phone: "555-9012" },
    address: "789 Pine Rd, Gotham",
    status: "Full-time",
  },
  {
    identifier: { id: 234, firstName: "David", lastName: "Martinez" },
    position: { title: "QA Engineer", duration: 4 },
    team: 3,
    birthday: new Date("1988-02-14"),
    contact: { email: "david.martinez@example.com", phone: "555-3456" },
    address: "101 Birch Blvd, Star City",
    status: "Full-time",
  },
  {
    identifier: { id: 789, firstName: "Emma", lastName: "Wilson" },
    position: { title: "Data Scientist", duration: 3 },
    team: 2,
    birthday: new Date("1991-09-10"),
    contact: { email: "emma.wilson@example.com", phone: "555-7890" },
    address: "202 Cedar Ln, Central City",
    status: "Full-time",
  },
  {
    identifier: { id: 890, firstName: "Frank", lastName: "Zhao" },
    position: { title: "DevOps Engineer", duration: 6 },
    team: 3,
    birthday: new Date("1983-12-01"),
    contact: { email: "frank.zhao@example.com", phone: "555-2345" },
    address: "303 Elm St, Coast City",
    status: "Full-time",
  },
  {
    identifier: { id: 234, firstName: "Grace", lastName: "Kim" },
    position: { title: "HR Specialist", duration: 2 },
    team: 4,
    birthday: new Date("1994-03-19"),
    contact: { email: "grace.kim@example.com", phone: "555-6789" },
    address: "404 Spruce Ct, Blüdhaven",
    status: "Full-time",
  },
  {
    identifier: { id: 345, firstName: "Henry", lastName: "Brown" },
    position: { title: "Marketing Lead", duration: 7 },
    team: 5,
    birthday: new Date("1980-08-25"),
    contact: { email: "henry.brown@example.com", phone: "555-0123" },
    address: "505 Willow Dr, Smallville",
    status: "Full-time",
  },
  {
    identifier: { id: 892, firstName: "Isabella", lastName: "Davis" },
    position: { title: "Business Analyst", duration: 1 },
    team: 2,
    birthday: new Date("1995-06-05"),
    contact: { email: "isabella.davis@example.com", phone: "555-4567" },
    address: "606 Aspen Way, Keystone City",
    status: "Full-time",
  },
  {
    identifier: { id: 423, firstName: "Jack", lastName: "Wilson" },
    position: { title: "Support Engineer", duration: 4 },
    team: 3,
    birthday: new Date("1987-10-12"),
    contact: { email: "jack.wilson@example.com", phone: "555-8901" },
    address: "707 Chestnut St, Hub City",
    status: "Full-time",
  },
];

export const employeePositionTitles = [
  "Software Engineer",
  "Product Manager",
  "UX Designer",
  "QA Engineer",
  "Data Scientist",
  "DevOps Engineer",
  "HR Specialist",
  "Marketing Lead",
  "Business Analyst",
  "Support Engineer",
];

export const employeeStatuses = ["Full-time", "Part-time", "Contract"];
