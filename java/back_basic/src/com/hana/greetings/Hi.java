package com.hana.greetings;

public class Hi {
	public static void main(String[] args) {
		System.out.println("Hi~");
		playSwitch();
	}

	private static void playSwitch() {
		final String grade = "B";
		switch (grade) {
			case "A":
				System.out.println("1");
				break;
			case "B":
				System.out.println("2");
				break;
			case "C":
				System.out.println("3");
				break;
			default:
				System.out.println("default");
				break;
		}
	}
}
