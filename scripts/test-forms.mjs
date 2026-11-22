import { readFile } from "fs/promises";
import path from "path";

const base = process.env.BASE_URL || "http://127.0.0.1:3000";
const forwardMode = process.env.FORWARD_TEST === "1";

const samples = [
  {
    form: "interest",
    home: "426-north-st-murphysboro",
    homeAddress: "426 North St, Murphysboro, IL 62966",
    name: "Test Buyer",
    phone: "(307) 555-0101",
    email: "buyer@example.com",
    downPayment: "not sure yet",
    monthlyBudget: "a comfortable amount",
    moveTimeline: "Just looking for now",
    notes: "Automated form test",
  },
  {
    form: "waitlist",
    name: "Test Waitlist",
    phone: "307-555-0102",
    email: "waitlist@example.com",
    note: "Hoping to hear about the next house.",
  },
  {
    form: "investor",
    name: "Test Investor",
    phone: "3075550103",
    email: "investor@example.com",
    role: "Both",
    note: "Handy, and I look at as-is houses.",
  },
  {
    form: "seller",
    propertyAddress: "100 Example Ave, Murphysboro, IL 62966",
    name: "Test Seller",
    phone: "1-307-555-0104",
    email: "seller@example.com",
    condition: "Needs a lot of work",
    timeline: "Within a month",
    askingPrice: "",
    notes: "Roof leaks. Automated test.",
  },
  {
    form: "contact",
    name: "Test Neighbor",
    phone: "307.555.0105",
    email: "neighbor@example.com",
    topic: "Something else",
    message: "This is an automated test of the contact form.",
  },
  {
    form: "tour",
    home: "426 North St, Murphysboro, IL 62966",
    days: ["Tuesday", "Thursday"],
    times: ["Afternoon"],
    name: "Test Tour",
    phone: "307-555-0106",
    email: "tour@example.com",
    notes: "Automated tour request.",
  },
];

async function post(body) {
  const response = await fetch(`${base}/api/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => null);
  return { status: response.status, payload };
}

let failed = 0;

function check(condition, message) {
  if (!condition) {
    failed += 1;
    console.error("FAIL", message);
  } else {
    console.log("ok", message);
  }
}

for (const sample of samples) {
  const { status, payload } = await post(sample);
  check(status === 200 && payload?.ok === true, `${sample.form} accepted (${status})`);
  if (forwardMode) {
    check(payload?.delivery === "web3forms", `${sample.form} asked the browser to forward`);
    const forwards = payload?.forwards;
    check(Array.isArray(forwards) && forwards.length === 2, `${sample.form} sends to both inboxes`);
    const keys = new Set();
    for (const item of forwards || []) {
      const sent = await fetch(item.url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(item.body),
      });
      const provider = await sent.json().catch(() => null);
      check(sent.ok && provider?.success === true, `${sample.form} reached the form service`);
      check(!JSON.stringify(item.body).includes("WEB3FORMS"), `${sample.form} body has no secret name leak`);
      check(typeof item.body.access_key === "string" && item.body.access_key.length > 0, `${sample.form} forward includes an access key`);
      check(item.body.message.includes(sample.name), `${sample.form} message includes the name`);
      keys.add(item.body.access_key);
    }
    check(keys.size === 2, `${sample.form} uses a different key for each person`);
  } else {
    check(payload?.delivery === "local", `${sample.form} saved locally`);
  }
}

const bad = await post({
  form: "seller",
  name: "A",
  phone: "123",
  email: "not-an-email",
  propertyAddress: "12",
});
check(bad.status === 400 && bad.payload?.fieldErrors?.email, "invalid seller form is rejected");
check(bad.payload?.fieldErrors?.phone, "short phone is rejected");

const spam = await post({
  form: "contact",
  company_website: "https://spam.example",
  name: "Spam Bot",
  phone: "307-555-0199",
  email: "spam@example.com",
  topic: "Something else",
  message: "buy followers now",
});
check(spam.status === 200 && spam.payload?.delivery === "ignored", "honeypot is ignored");

if (!forwardMode) {
  const file = await readFile(path.join(process.cwd(), ".data", "submissions.jsonl"), "utf8");
  check(file.includes("buyer@example.com"), "interest submission is on disk");
  check(file.includes("seller@example.com"), "seller submission is on disk");
  check(!file.includes("spam@example.com"), "honeypot submission was not stored");
  check(file.includes("Tuesday, Thursday"), "tour days were saved");
}

if (failed) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}

console.log("All form checks passed.");
