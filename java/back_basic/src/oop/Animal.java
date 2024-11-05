package oop;

abstract class Animal {
	private int age;
	private String name;

	public void bark() {
		System.out.println("BARK!!");
	}

	abstract void walk();

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Animal{age=%d, name='%s'}".formatted(age, name);
	}
}
