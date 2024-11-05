package oop;

public class Dog extends Animal implements Flyable {
	@Override
	void walk() {
		System.out.println("WALK!");
	}

	@Override
	public void fly() {
		System.out.println("Dog Fly!");
	}

	@Override
	public void landing() {
		Flyable.super.landing();
	}

	public static void main(String[] args) {
		Dog d = new Dog();
		d.fly();
		d.walk();
		d.bark();
		d.landing();
	}
}
