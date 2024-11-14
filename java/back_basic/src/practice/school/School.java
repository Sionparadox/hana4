package practice.school;

import java.util.ArrayList;
import java.util.List;

public class School {
	public static final int STUDENT_COUNT = 10;

	private static String getGrade(Integer score) {
		String grade = "F";
		switch (score / 10) {
			case 10, 9 -> grade = "A";
			case 8 -> grade = "B";
			case 7 -> grade = "C";
			case 6 -> grade = "D";
		}

		return grade;
	}

	public static void main(String[] args) {
		List<Integer> scores = new ArrayList<>(STUDENT_COUNT);
		List<Integer> min = new ArrayList<>();
		// min.add(Integer.MAX_VALUE);
		min.add(100);
		List<Integer> max = new ArrayList<>();
		// max.add(Integer.MIN_VALUE);
		max.add(0);

		// Scanner scanner = new Scanner(System.in);
		MyScanner scanner = new MyScanner();

		// QQQ
		// int[] scoresToTest = {30, 50, 40, 80, 90, 99, 99, 30, -1};
		while (true) {
			int score = scanner.scanInt("점수를 입력하세요(-1: 종료): ");
			if (score < 0) {
				break;
			}
			scores.add(score);

			if (score < min.get(0)) {
				min.clear();
				min.add(score);
			}
			if (score > max.get(0)) {
				max.clear();
				max.add(score);
			}
		}

		System.out.println("학생들의 성적" + scores);

		int maxScore = 0;
		for (int i = 0; i < scores.size(); i++) {
			int score = scores.get(i);
			if (score > maxScore) {
				maxScore = score;
			}

			System.out.printf("%d 학생의 성적은 %d이며 학점은 %s이다%n", (i + 1), score, getGrade(score));
		}

		scores.removeAll(min);
		scores.removeAll(max);

		int sum = 0;
		for (int score : scores) {
			sum += score;
		}

		System.out.printf("평균은 %.1f, 최고 점수는 %d 이다.%n", (sum / (double)scores.size()), maxScore);
	}
}
