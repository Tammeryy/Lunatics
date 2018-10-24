predicate sorted (a: array<int>, lo: int, hi: int) 
reads a;
requires 0 <= lo <= hi <= a.Length;
{
	forall i, j :: (lo <= i <= j < hi) ==> a[i] <= a[j]
}

// This version of bubblesort bubbles the largest value up to the end of the array
// And continues doing so until the array is sorted
method BubbleSort (a: array<int>) 
requires a.Length >= 0;
modifies a;
ensures sorted (a, 0, a.Length);
ensures multiset (a[..]) == multiset (old(a[..]));
{
	var outer := a.Length;
	while (outer > 0) 
	invariant outer >= 0;
	// the stuff above outer is always sorted
	invariant sorted (a, outer, a.Length);
	// stuff between 0 and outer is <= outer
	invariant forall j, k :: 0 <= j < outer <= k < a.Length ==> a[j] <= a[k] 
	invariant multiset (old(a[..])) == multiset (a[..]);
	decreases outer;
	{
		var inner := 1;
		while (inner < outer) 
		invariant 1 <= inner <= outer <= a.Length;
		invariant sorted (a, outer, a.Length);
		// stuff between 0 and outer is <= outer
		invariant forall j, k :: 0 <= j < outer <= k < a.Length ==> a[j] <= a[k] 
		// between 0 - inner, inner is largest
		invariant forall j :: 0 <= j < inner ==> a[j] <= a[inner-1];
		invariant multiset (old(a[..])) == multiset (a[..]);
		{
			if (a[inner-1] > a[inner]) {
				a[inner], a[inner-1] := a[inner-1], a[inner];
			} 
			inner := inner + 1;
		}
		assert (inner == outer);
		outer := outer - 1;
	}
}
// Some test cases
method Main()
{
	// do not change this code
	var a := new int[][6,2,0,6,3,5,0,4,1,6,0]; // testcase 1
	var msa := multiset(a[..]);
	BubbleSort(a);
	assert sorted(a, 0, a.Length);
	var msa' := multiset(a[..]);
	assert msa == msa';
	var b := new int[][8,7]; // testcase 2
	BubbleSort(b);
	print a[..], b[..];
}