// Team Luna: Verified Dafny QuickSort 

// Quick Sort was difficult to verify: to ensure that all relevant preconditions, postcondition and invariants
// were considered, this code was used as a reference: https://rise4fun.com/Dafny/ks 
// The C code for Quick Sort was developed independently (before using online sources)
// As such, you will find that this Partition implementation is unique to the reference

// Checks that an array is sorted 
predicate sorted (a: array<int>, lo: int, hi: int) 
reads a;
requires 0 <= lo <= hi <= a.Length;
{
	forall i, j :: (lo <= i <= j < hi) ==> a[i] <= a[j]
}

// Notes:
// The preconds/invariants/postconds for QuickSort, Partition and the while loop in Partition are similar
// Each precond/invariant/postcond is described the first time it is introduced

// QuickSort Recursion
method QuickSort (a: array<int>, start: int, end: int) 
requires 0 <= start <= end <= a.Length;

// checks if everything in the array (from start to end-1) is less than a[end] and
// checks if everything in the array (from start ot end-1) is greater than a[start-1]
// i.e., affirms that the (previous) partition worked correctly
requires 0 <= start <= end < a.Length ==> forall j :: start <= j < end ==> a[j] <= a[end] 
requires 0 < start <= end <= a.Length ==> forall j :: start <= j < end ==> a[start-1] <= a[j]

modifies a;

ensures sorted (a, start, end);

// checks if everything in the array (from start to end-1) is less than the a[end] and
// checks if everything in the array (from start ot end-1) is greater than a[start-1]
// i.e., affirms that the (previous) partition (still) works correctly after Partition
ensures 0 <= start <= end < a.Length ==> forall j :: start <= j < end ==> a[j] <= a[end] 
ensures 0 < start <= end <= a.Length ==> forall j :: start <= j < end ==> a[start-1] <= a[j]

// makes sure that we didnt touch the array outside of start to end 
ensures forall j :: (0 <= j < start || end <= j < a.Length) ==> old(a[j]) == a[j];

// ensures array has not been corrupted
ensures multiset (old(a[..])) == multiset (a[..]);

// helps dafny verify termination
decreases end - start;
{
	if (end <= start || a.Length <= 1) {
		return;
	} else {
		var pivot := Partition (a, start, end);
		QuickSort (a, start, pivot);
		QuickSort (a, pivot + 1, end);
	} 
}

// Partition 
// This Partition function swaps elements that are greater than the pivot with elements that are less than the pivot
// And then places the pivot in the correct position
method Partition (a: array<int>, start: int, end: int) returns (pivot: int)
requires a.Length >= 1;
requires 0 <= start < end <= a.Length;
requires 0 <= start <= end < a.Length ==> forall j :: start <= j < end ==> a[j] <= a[end]
requires 0 < start <= end <= a.Length ==> forall j :: start <= j < end ==> a[start-1] <= a[j]

modifies a;

ensures 0 <= start <= pivot < end <= a.Length;
ensures 0 <= start <= end < a.Length ==> forall j :: start <= j < end ==> a[j] <= a[end] 
ensures 0 < start <= end <= a.Length ==> forall j :: start <= j < end ==> a[start-1] <= a[j]

// ensures that the pivot is in the correct place 
ensures forall i :: (start <= i < pivot) ==> a[i] <= a[pivot];
ensures forall i :: (pivot < i < end) ==> a[i] >= a[pivot];

ensures forall j :: (0 <= j < start || end <= j < a.Length) ==> old(a[j]) == a[j];
ensures multiset (old(a[..])) == multiset (a[..]);
{
	if (end <= start) {
		pivot := start;
	} else {
		pivot := start;
		var i := start + 1;
		while (i < end) 
		invariant start <= pivot < i <= end;

		invariant 0 <= start <= end < a.Length ==> forall j :: start <= j < end ==> a[j] <= a[end]
		invariant 0 < start <= end <= a.Length ==> forall j :: start <= j < end ==> a[start-1] <= a[j]

		invariant forall j :: (start <= j <= pivot) ==> a[j] <= a[start];
		invariant forall j :: (pivot < j < i) ==> a[j] >= a[start];

		invariant forall j :: (0 <= j < start || end <= j < a.Length) ==> old(a[j]) == a[j];
		invariant multiset (old(a[..])) == multiset (a[..]);
		{
			if (a[i] < a[start]) {
				pivot := pivot + 1;
				a[i], a[pivot] := a[pivot], a[i];
			}
			i := i + 1;
		}
		a[start], a[pivot] := a[pivot], a[start];
		assert (start <= pivot < i <= end);
	}
}

// Test Cases
method Main()
{
	// Empty array
	var a := new int[][];
	var msa := multiset (a[..]);
	QuickSort (a, 0, a.Length);
	assert (sorted (a, 0, a.Length));
	var msa' := multiset (a[..]);
	assert (msa == msa');

	// Sorted array 
	var b:= new int[][0,1,2,3,4,5,6,7,8,9,10];
	var msb := multiset (b[..]);
	QuickSort (b, 0, b.Length);
	assert (sorted(b, 0, b.Length));
	var msb' := multiset (b[..]);
	assert (msb == msb');

	// Reverse sorted array 
	var c:= new int[][10,9,8,7,6,5,4,3,2,1,0];
	var msc := multiset (c[..]);
	QuickSort (c, 0, c.Length);
	assert (sorted (c, 0, c.Length));
	var msc' := multiset (c[..]);
	assert (msc == msc');

	// Randomly unsorted array 
	var d:= new int[][6,3,4,5,8,9,10,2,1,0,7];
	var msd := multiset (d[..]);
	QuickSort (d, 0 , d.Length);
	assert (sorted (d, 0, d.Length));
	var msd' := multiset (d[..]);
	assert (msd == msd');
}