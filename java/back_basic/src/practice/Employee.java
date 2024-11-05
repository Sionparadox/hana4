package practice;

public class Employee {
	private int id;
	private String name;
	private int salary;

	Employee(int id, String name, int salary) {
		this.id = id;
		this.name = name;
		this.salary = salary;
	}

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary(int salary) {
		this.salary = salary;
	}

	public int getAnnualSalary() {
		return salary * 12;
	}

	public int raiseSalary(int percent) {
		int raising = salary * percent / 100;
		salary += raising;
		return raising;

	}

	@Override
	public String toString() {
		return "Employee{id=%d, name='%s', salary=%d}의 연봉은 %d 월급 인상분은 %d".formatted(id, name, salary, getAnnualSalary(),
			raiseSalary(this.id * 10));
	}
}
