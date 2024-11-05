package practice;

public class SumMean {
	public static void main(String[] args) {
		int[] nums = new int[args.length];
		for (int i = 0; i < args.length; i++) {
			nums[i] = Integer.parseInt(args[i]);
		}
		int sum = 0;
		for (var num : nums) {
			sum += num;
		}
		double mean = (double)sum / nums.length;
		System.out.print("전달받은 수는 ");
		for (var num : nums) {
			System.out.print(num + " ");
		}
		System.out.println();
		System.out.println("숫자들의 합은 " + sum);
		System.out.println("숫자들의 평균은 " + mean);
	}

}
