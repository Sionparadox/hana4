package practice.school;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

public class Student {
	private String name = "";
	private int id = 0;
	private String phoneNo = "";
	private int score = 0;

	public Student(StringTokenizer tokenizer) {
		// String[] tokens = new String[tokenizer.countTokens()];
		List<String> tokens = new ArrayList<>();
		while (tokenizer.hasMoreTokens()) {
			tokens.add(tokenizer.nextToken());
		}

		try {
			this.id = Integer.parseInt(tokens.get(0));
			this.name = tokens.get(1);
			// this.phoneNo = tokens.get(2);
			this.score = Integer.parseInt(tokens.get(2));
		} catch (IndexOutOfBoundsException ioe) {
			System.out.println(ioe.getMessage());
		}
	}

	public Student(String name, int id, int score) {
		this.name = name;
		this.id = id;
		this.score = score;
	}

	public String getName() {
		return name;
	}

	@Override
	public String toString() {
		return "%s(%d) : %s".formatted(name, id, score);
	}

	public static void main(String[] args) {
		Map<String, Student> map = new HashMap<>();
		MyScanner scanner = new MyScanner();
		System.out.println("학번 이름 점수 순으로 입력하세요!\n");
		while (true) {
			StringTokenizer tokenizer = new StringTokenizer(scanner.scanLine(""), " ");
			if (tokenizer.countTokens() == 0) {
				break;
			}

			Student student = new Student(tokenizer);
			map.put(student.getName(), student);

		}

		System.out.println("등록된 학생 수 = " + map.size());
		for (String name : map.keySet()) {
			System.out.println(map.get(name).toString());
		}
	}
}
