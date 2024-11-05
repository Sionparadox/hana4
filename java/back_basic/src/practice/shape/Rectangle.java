package practice.shape;

public class Rectangle extends Shape implements Resizeable {
	private double length;
	private double width;

	public Rectangle(double length, double width) {
		this.length = length;
		this.width = width;
	}

	public Rectangle() {
		this(1.0, 1.0);
	}

	public double getLength() {
		return length;
	}

	public void setLength(double length) {
		this.length = length;
	}

	public double getWidth() {
		return width;
	}

	public void setWidth(double width) {
		this.width = width;
	}

	@Override
	public void resize(int percent) {
		width *= (1 + percent / 100.0);
		length *= (1 + percent / 100.0);
	}

	@Override
	public double calArea() {
		return getArea();
	}

	public double getArea() {
		return width * length;
	}

	public double getPerimeter() {
		return 2 * (width + length);
	}

	@Override
	public String toString() {
		return "Rectangle{width=%s, length=%s}의 둘레는 %.2f, 면적은 %.2f".formatted(width, length, getPerimeter(), getArea());
	}
}
