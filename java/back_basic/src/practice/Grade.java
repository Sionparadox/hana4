package practice;

import java.util.Scanner;

public class Grade {
	public static void main(String[] args) {
		// gradeSwitch();
		scoreSwitch();
	}

	private static void scoreSwitch() {
		Scanner scanner = new Scanner(System.in);
		System.out.print("점수를 입력하세요: ");
		int score = scanner.nextInt();
		score /= 10;
		switch (score) {
			case 9, 10 -> System.out.println('A');
			case 8 -> System.out.println('B');
			case 7 -> System.out.println('C');
			case 6 -> System.out.println('D');
			default -> System.out.println('F');
		}
	}

	private static void gradeSwitch() {
		Scanner scanner = new Scanner(System.in);
		System.out.print("학점을 입력하세요: ");
		char grade = scanner.next().charAt(0);
		switch (grade) {
			case 'A', 'B' -> System.out.println("참 잘했음");
			case 'C', 'D' -> System.out.println("잘했음");
			case 'F' -> System.out.println("다음에 또 봐요");
		}
	}
}
