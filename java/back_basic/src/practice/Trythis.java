package practice;

import practice.shape.Circle;
import practice.shape.Rectangle;
import practice.shape.Shape;

public class Trythis {
	public static void main(String[] args) {
		// Circle circle1 = new Circle();
		// Circle circle2 = new Circle(2.0);
		// System.out.println(circle1.toString());
		// System.out.println(circle2.toString());
		// Rectangle rectangle1 = new Rectangle();
		// Rectangle rectangle2 = new Rectangle(3.0, 4.0);
		// System.out.println(rectangle1.toString());
		// System.out.println(rectangle2.toString());
		// Employee employee1 = new Employee(1, "코난", 25000000);
		// Employee employee2 = new Employee(2, "장미", 30000000);
		// Employee employee3 = new Employee(3, "미란", 40000000);
		// System.out.println(employee1.toString());
		// System.out.println(employee2.toString());
		// System.out.println(employee3.toString());
		// Account account1 = new Account("11-111-111", "코난", 20000);
		// Account account2 = new Account("22-222-222", "장미", 100000);
		// Account account3 = new Account("33-333-333", "미란", 50000);
		// System.out.println(account1.toString());
		// System.out.println(account2.toString());
		// System.out.println(account3.toString());
		// System.out.println("----------------------------------");
		// account1.run();
		// System.out.println("----------------------------------");
		// System.out.println(account1.toString());
		// System.out.println(account2.toString());
		// System.out.println(account3.toString());
		// Circle circle = new Circle(2);
		// System.out.println(circle.toString());
		// ResizeableCircle resCircle = new ResizeableCircle(3);
		// System.out.println(resCircle.toString());
		// resCircle.resize(10);
		// System.out.println("크기를 10퍼센트 크게 변경 후 ");
		// System.out.println(resCircle.toString());
		Shape[] shapes = {new Circle(5), new Rectangle(3, 4), new Circle(1)};
		double sumArea = 0;
		for (Shape shape : shapes) {
			sumArea += shape.calArea();
		}
		System.out.printf("면적의 합 : %.2f", sumArea);

	}
}
