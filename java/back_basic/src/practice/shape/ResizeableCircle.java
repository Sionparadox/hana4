package practice.shape;

public class ResizeableCircle extends Circle implements Resizeable {
	public ResizeableCircle(int radius) {
		super(radius);
	}

	public void resize(int percent) {
		setRadius(getRadius() * (1 + percent / 100.0));
	}

	@Override
	public String toString() {

		return "Resizeable" + super.toString();
	}
}
