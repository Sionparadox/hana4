package practice.shape;

public class Circle extends Shape implements GeomericObject {
	private double radius;
	private String color;

	public Circle(double radius) {
		this.radius = radius;
		this.color = "red";
	}

	public Circle() {
		this(1.0);
	}

	@Override
	public double calArea() {
		return Math.PI * radius * radius;
	}

	public double getRadius() {
		return radius;
	}

	protected void setRadius(double radius) {
		this.radius = radius;
	}

	public double getArea() {
		return calArea();
	}

	public double getPerimeter() {
		return 2 * Math.PI * radius;
	}

	@Override
	public String toString() {
		return "Circle{radius=%.1f}의 둘레는 %.2f, 면적은 %.2f".formatted(radius, this.getPerimeter(), this.getArea());
	}
}
