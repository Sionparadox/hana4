package practice;

import java.util.Scanner;

public class MyScan {
	public static void main(String[] args) {
		//scanUserInfo();
		// scanTemp();

	}

	private static void scanTemp() {
		final double SURFACE_TEMP = 20.0;
		final double DECREASE_TEMP = 0.7;
		Scanner sc = new Scanner(System.in);
		System.out.print("수심: ");
		double height = sc.nextDouble();
		double temp = (SURFACE_TEMP - DECREASE_TEMP * Math.floor(height / 10));
		System.out.println("수온: " + temp);
	}

	private static void scanUserInfo() {
		Scanner sc = new Scanner(System.in);
		String name, address;
		int age;
		double height;
		System.out.print("이름을 입력하세요: ");
		name = sc.nextLine();
		System.out.print("주소를 입력하세요: ");
		address = sc.nextLine();
		System.out.print("나이를 입력하세요: ");
		age = sc.nextInt();
		System.out.print("키를 입력하세요: ");
		height = sc.nextDouble();
		sc.close();
		System.out.printf("이름: %s\n주소: %s\n나이: %d\n키: %4.1f\n", name, address, age, height);
	}

}
