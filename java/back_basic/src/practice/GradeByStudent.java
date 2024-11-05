package practice;

import java.util.Scanner;

public class GradeByStudent {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("학생 수를 입력하세요.");
		int studentCnt = sc.nextInt();
		int[] scores = new int[studentCnt];
		for (int i = 0; i < studentCnt; i++) {
			System.out.printf("%d번 학생의 점수를 입력하세요.\n", i);
			scores[i] = sc.nextInt();
		}
		System.out.printf("학생 %d명의 성적은 다음과 같습니다.\n", studentCnt);
		for (int i : scores) {
			System.out.print(i + " ");
		}
		System.out.println();
		for (int i = 0; i < studentCnt; i++) {
			System.out.printf("%d번 학생의 등급은 %c입니다.\n", i, scoreSwitch(scores[i]));
		}

	}

	private static char scoreSwitch(int score) {

		switch (score / 10) {
			case 9, 10 -> {
				return 'A';
			}
			case 8 -> {
				return 'B';
			}
			case 7 -> {
				return 'C';
			}
			case 6 -> {
				return 'D';
			}
			default -> {
				return 'F';
			}
		}
	}
}
