package oop;

import java.util.Scanner;

public class Account {
	private final int accountNo;
	private final String name;
	private double balance;
	private Scanner scan;

	public Account(int accountNo, String name, double balance) {
		this.accountNo = accountNo;
		this.name = name;
		this.balance = balance;
	}

	public Account(int accountNo, String name) {
		this(accountNo, name, 0);
	}

	public static void showSelectAccounts(Account[] accounts) {
		showSelectAccounts(accounts, null);
	}

	public static void showSelectAccounts(Account[] accounts, Account me) {
		StringBuilder msg = new StringBuilder();
		for (Account acc : accounts) {
			int no = acc.getAccountNo();
			if (me != null && no == me.getAccountNo()) {
				continue;
			}
			String name = acc.getName();
			if (msg.isEmpty()) {
				msg.append(" (%d:%s".formatted(no, name));
			} else {
				msg.append(", %d:%s".formatted(no, name));
			}
		}
		msg.append("): ");
		System.out.print(msg);
	}

	public int getAccountNo() {
		return accountNo;
	}

	public String getName() {
		return name;
	}

	public double getBalance() {
		return balance;
	}

	private void deposit() {
		System.out.print("입금할 금액은? ");
		double amt = scan.nextDouble();
		this.balance += amt;
		System.out.printf("%.1f원이 입금되었습니다!\n", amt);
		this.checkBalance();
	}

	private void withdraw() {
		System.out.print("출금할 금액은? ");
		double amt = scan.nextDouble();
		if (this.balance < amt) {
			System.out.println("\n잔액이 부족합니다!!");
			return;
		}
		this.balance -= amt;
		System.out.printf("%.1f원이 출금되었습니다!\n", amt);
		this.checkBalance();
	}

	public void checkBalance() {
		System.out.printf("%s님의 잔액은 %.1f원 입니다.\n\n", this.name, this.balance);
	}

	private void display() {
		// String.format()
		String output = """
			------------------------------
			계좌번호: %d
			예금주: %s
			잔액: %.1f원
			------------------------------
			""".formatted(this.accountNo, this.name, this.balance);
		final int hyphenCnt = 15;
		System.out.println(output);
	}

	public void transfer(Account[] accounts) {
		if (this.isNotValidScan()) {
			return;
		}
		System.out.println("누구에게 송금하시겠어요? ");
		Account.showSelectAccounts(accounts, this);
		int selectedAccNo = this.scan.nextInt();
		Account toAccount = accounts[selectedAccNo - 1];

		System.out.print("얼마를 송금하시겠어요? ");
		double transAmount = this.transferTo(toAccount, this.scan.nextDouble());

		System.out.printf("transAmount = %,.1f\n", transAmount);

	}

	public double transferTo(Account another, double amount) {
		System.out.printf("%s이 %s에게 %,.1f원 송금 시도!\n", this.getName(), another.getName(), amount);
		if (this.balance < amount) {
			System.out.println("잔액이 부족합니다!");
			return 0;
		}

		this.balance -= amount;
		another.balance += amount;

		// System.out.println("송금 완료!!");
		System.out.printf("%s이 %s에게 %,.1f원 송금 완료!\n", this.getName(), another.getName(), amount);

		this.checkBalance();
		another.checkBalance();

		return this.balance;
	}

	public void login() {
		this.login(null);
	}

	public void login(Scanner scan) {
		if (this.scan == null) {
			if (scan != null) {
				this.scan = scan;
			} else {
				this.scan = new Scanner(System.in);
			}
		}

		// this.action();
		this.display();
	}

	public void action() {
		if (isNotValidScan()) {
			return;
		}

		while (true) {
			System.out.print("\nCommand(+:입금, -:출금, q:종료) : ");
			String cmd = scan.next();
			scan.skip(".*");

			switch (cmd) {
				case "+" -> this.deposit();
				case "-" -> this.withdraw();
				case "q" -> {
					return;
				}

				default -> System.out.println("잘 못된 명령입니다!");
			}
		}
	}

	private boolean isNotValidScan() {
		if (this.scan == null) {
			System.out.println("먼저 로그인하세요!");
			return true;
		}

		return false;
	}

	public void logout() {
		if (this.scan != null) {
			this.scan.close();
		}
		this.display();
	}

	@Override
	public String toString() {
		return "Account[id=%s, name=%s, balance=%,1f]".formatted(getAccountNo(), getName(), getBalance());
	}

}

class T {
	public static void main(String[] args) throws Exception {
		Account accConan = new Account(1, "코난", 100000);
		Account accRose = new Account(2, "장미", 100000);
		Account accMiran = new Account(3, "미란", 100000);

		Account[] accounts = new Account[] {accConan, accRose, accMiran};

		Scanner scan = new Scanner(System.in);
		System.out.println("계좌를 선택하세요:");
		Account.showSelectAccounts(accounts);
		int selectedAccNo = scan.nextInt();
		Account workingAccount = accounts[selectedAccNo - 1];
		workingAccount.login(scan);
		workingAccount.transfer(accounts);
		workingAccount.logout();

		// acc.login();
		// acc.action();
		// acc.logout();

	}
}
