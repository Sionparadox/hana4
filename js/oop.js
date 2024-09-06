class Animal {
  static ID = 5;
  static isDog(ani) {
    return ani.name === 'Dog';
  }
}
const dog = new Animal('Dog');
//dog.isDog(dog); // TypeError: dog.isDog is not a function
Animal.isDog(dog); // OK

console.log(dog.ID); // undefined
console.log(dog.constructor.ID); // 1
console.log(Animal.ID); // 1

class Cat extends Animal {
  static IDD = 2;
  kukuki() {
    console.log('KOOKKKKKKKKKKKKKKKKKKK');
  }
}

const cat = new Cat('Happy');
console.log(Cat.ID);
