const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("plays.js", "utf8") +
  "\n;globalThis.catalog={PLAYS,CATS};";
const context = {};
vm.runInNewContext(source, context, {filename: "plays.js"});

const {PLAYS, CATS} = context.catalog;
const ids = new Set();
const errors = [];
const colorPattern = /^var\(--cat-(scoring|blocking|penalty|power|pack)\)$/;

for (const [index, play] of PLAYS.entries()) {
  const label = play.id || `play ${index + 1}`;
  for (const field of ["id", "title", "cat", "steps", "durations", "bA", "bB", "jA", "jB"]) {
    if (play[field] == null) errors.push(`${label}: missing ${field}`);
  }
  if (ids.has(play.id)) errors.push(`${label}: duplicate id`);
  ids.add(play.id);
  if (!CATS.includes(play.cat) || play.cat === "All") errors.push(`${label}: invalid category ${play.cat}`);
  if (!colorPattern.test(play.catColor)) errors.push(`${label}: invalid category color ${play.catColor}`);
  if (play.steps?.length !== play.durations?.length) errors.push(`${label}: steps and durations differ in length`);
  const points = [...(play.bA || []), ...(play.bB || []), play.jA, play.jB].filter(Boolean);
  for (const point of points) {
    if (!Array.isArray(point) || point.length !== 2 || point.some(value => typeof value !== "number" || value < 0 || value > 100)) {
      errors.push(`${label}: invalid track coordinate ${JSON.stringify(point)}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${PLAYS.length} plays.`);
}
