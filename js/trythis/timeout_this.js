const dog = {
  name: 'Maxx',
  showMyName() {
    console.log(`My name is ${this.name}.`);
  },
  whatsYourName() {
    setTimeout(this.showMyName.bind(this), 1000);
  },
};

// const dog = {
//   name: "Maxx",
//   showMyName() {
//     console.log(`My name is ${this.name}.`);
//   },
//   whatsYourName() {
//     //setTimeout(() => this.showMyName(), 1000);
//     const self = this;
//     setTimeout(function () {
//       self.showMyName();
//     }, 1000);
//   },
// };

dog.whatsYourName();

globalThis.id = 'Global_ID';
this.id = 'Module.ID';
const obj = {
  id: 123,
  f: function () {
    console.log('obj > f =', this.id);
  },
  af: () => console.log('obj > af =', this.id),
  subObj: {
    id: 999,
    f: function () {
      console.log('obj > subObj > f = ', this.id);
    },
    af: () => console.log('obj > subObj > af = ', this.id),
  },
};

obj.f();
obj.af();
obj.subObj.f();
obj.subObj.af();
