package practice;

import java.util.Scanner;

public class Account {
	private String id;
	private String name;
	private int balance;

	Account() {
		this.balance = 0;
	}

	Account(String id, String name) {
		this();
		this.id = id;
		this.name = name;
	}

	Account(String id, String name, int balance) {
		this(id, name);
		this.balance = balance;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getBalance() {
		return balance;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setBalance(int balance) {
		this.balance = balance;
	}

	public int deposit(int amount) {
		System.out.println(name + "님이 " + amount + "원을 입금하였음");
		balance += amount;
		return balance;
	}

	public int withdraw(int amount) {
		System.out.println(name + "님이 " + amount + "원을 출금하였음");
		if (amount <= balance) {
			balance -= amount;
		} else {
			System.out.println("출금액이 잔액 초과");
		}
		return balance;
	}

	public int tansferTo(Account another, int amount) {

		if (amount <= balance) {
			balance -= amount;
			another.balance += amount;
			System.out.println(name + "님이 " + another.getName() + "님께 " + amount + "원을 송금하였음");
		} else {
			System.out.println(name + "님이 " + another.getName() + "님께 " + amount + "원 송금 시도");
			System.out.println("송금액이 잔액 초과");
		}
		return balance;
	}

	@Override
	public String toString() {
		return "Account{id='%s', name='%s', balance=%d}".formatted(id, name, balance);
	}

	public void run() {
		Scanner scanner = new Scanner(System.in);
		System.out.print("무엇을 하시겠습니까? (+:입금, -:출금, =:송금, q:종료) : ");
		char key = 'x';
		int amount = 0;
		while (key != 'q') {
			key = scanner.next().charAt(0);
			switch (key) {
				case '+' -> {
					System.out.print("금액을 입력해 주세요. : ");
					amount = scanner.nextInt();
					this.deposit(amount);
				}
				case '-' -> {
					System.out.print("금액을 입력해 주세요. : ");
					amount = scanner.nextInt();
					this.withdraw(amount);
				}
				case '=' -> {
					System.out.print("금액을 입력해 주세요. : ");
					amount = scanner.nextInt();
					this.tansferTo(null, amount);
				}
				case 'q' -> {

					break;
				}
			}
		}
	}
}
