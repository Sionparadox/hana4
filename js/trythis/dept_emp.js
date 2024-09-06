assert = require('assert');

const hrTeam = { id: 1, dname: '인사팀' }; // 홍길동 (인사팀)
const devTeam = { id: 2, dname: '개발팀' };
const depts = [hrTeam, devTeam];
const deptMap = new Map(depts.map((dept) => [dept.id, dept]));

const hong = { id: 1, name: 'Hong', dept: 1 };
const kim = { id: 2, name: 'Kim', dept: 2 };
const emps = [
  hong,
  kim,
  { id: 3, name: 'Park', dept: 2 },
  { id: 4, name: 'Choi', dept: 2 },
];
const empMap = new Map(emps.map((emp) => [emp.id, emp]));

const empDept = new Map(
  [...empMap.values()].map((emp) => {
    const { dept } = emp;
    delete emp.dept;
    return [emp, deptMap.get(dept)];
  })
);
// for (const [k, v] of empMap) {
//   empDept.set(
//     Object.fromEntries(Object.entries(v).filter(([i, _]) => i != 'dept')),
//     deptMap.get(v.dept)
//   );
// }
function getEmp(empId) {
  const emp = empMap.get(empId);
  return { ...emp, dept: empDept.get(emp) };
}

assert.deepStrictEqual(
  [...empDept.keys()],
  emps.map(({ id, name }) => ({ id, name }))
);
assert.strictEqual(empDept.get(kim)?.dname, devTeam.dname);
console.log(empDept);

const r = [...empDept]
  .filter(([emp, dept]) => dept.id === devTeam.id)
  .map(([emp]) => emp.name);
console.log(r);

assert.deepStrictEqual(getEmp(1), {
  id: 1,
  name: 'Hong',
  dept: { id: 1, dname: '인사팀' },
});
