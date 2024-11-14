package practice;

public class ArrayedGeneralBook implements GeneralBook {
	private String[] names;
	private String[] records;

	ArrayedGeneralBook(String[] names, String[] records) {
		this.names = new String[names.length];
		this.records = new String[records.length];
		for (int i = 0; i < names.length; i++) {
			this.names[i] = names[i];
			this.records[i] = records[i];
		}
	}

	@Override
	public int size() {
		return this.names.length;
	}

	@Override
	public String names() {
		StringBuilder sb = new StringBuilder();
		for (String name : names) {
			sb.append(name);
			sb.append(" ");
		}
		return sb.toString();
	}

	@Override
	public String records() {
		StringBuilder sb = new StringBuilder();
		for (String record : records) {
			sb.append(record);
			sb.append(" ");
		}
		return sb.toString();
	}

	@Override
	public boolean nameExists(String name) {
		for (int i = 0; i < names.length; i++) {
			if (name.equals(names[i])) {
				return true;
			}
		}
		return false;
	}

	@Override
	public void add(String name, String record) {
		String[] newNames = new String[this.names.length + 1];
		String[] newRecords = new String[this.records.length + 1];
		for (int i = 0; i < this.names.length; i++) {
			newNames[i] = this.names[i];
			newRecords[i] = this.records[i];
		}
		newNames[newNames.length - 1] = name;
		newRecords[newRecords.length - 1] = record;
		this.names = newNames;
		this.records = newRecords;
	}

	@Override
	public void remove(String name, String record) {
		String[] newNames = new String[this.names.length - 1];
		String[] newRecords = new String[this.records.length - 1];
		int idx = 0;
		for (int i = 0; i < this.names.length; i++) {
			if (name.equals(this.names[i])) {
				continue;
			}
			newNames[idx] = this.names[i];
			newRecords[idx] = this.records[i];
			idx++;
		}
		this.names = newNames;
		this.records = newRecords;
	}

	@Override
	public String get(String name) {
		for (int i = 0; i < this.names.length; i++) {
			if (name.equals(this.names[i])) {
				return this.records[i];
			}
		}
		return null;
	}

	@Override
	public void sort() {
		String[][] books = new String[this.names.length][2];
		for (int i = 0; i < this.names.length; i++) {
			books[i][0] = this.names[i];
			books[i][1] = this.records[i];
		}
		for (int i = 0; i < this.names.length - 1; i++) {
			for (int j = i + 1; j < this.names.length; j++) {
				if (books[i][0].compareTo(books[j][0]) > 0) {
					String[] temp = new String[2];
					temp[0] = books[i][0];
					temp[1] = books[i][1];
					books[i][0] = books[j][0];
					books[i][1] = books[j][1];
					books[j][0] = temp[0];
					books[j][1] = temp[1];
				}
			}
		}
		for (int i = 0; i < this.names.length; i++) {
			this.names[i] = books[i][0];
			this.records[i] = books[i][1];
		}
	}

	@Override
	public void print() {
		String[] previousName = new String[this.names.length];
		String[] previousRecord = new String[this.records.length];
		for (int i = 0; i < this.names.length; i++) {
			previousName[i] = this.names[i];
		}
		for (int i = 0; i < this.records.length; i++) {
			previousRecord[i] = this.records[i];
		}
		sort();
		for (int i = 0; i < this.names.length; i++) {
			System.out.println(previousName[i] + previousRecord[i]);
		}
		this.names = previousName;
		this.records = previousRecord;
	}

	public static void main(String[] args) {
		String[] names = {"Sam", "Rhee", "Kim"};
		String[] records = {"1111", "2222", "3333"};
		ArrayedGeneralBook gb = new ArrayedGeneralBook(names, records);
		System.out.println(gb.names()); //Sam Rhee Kim
		gb.add("Allan", "4444");
		gb.print();
		//Allan4444\nKim3333\nRhee2222\nSam1111
		System.out.println("현재 저장된 데이터의 크기 : " + gb.size()); //4
		gb.add("Alex", "5555");
		System.out.println("현재 저장된 데이터의 크기 : " + gb.size()); //5
		gb.print(); //Alex5555\nAllan4444\nKim3333\nRhee2222\nSam1111\n
		System.out.println(gb.nameExists("Alex")); //true
		gb.remove("Alex", "5555");
		gb.remove("Sam", "1111");
		gb.print(); //Allan4444\nKim3333\nRhee2222
		String foundRecord = gb.get("Allan");
		System.out.println(foundRecord); //4444
	}
}
