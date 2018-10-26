// Team Luna: Dafny Verified Bubble Sort 

// This version of bubblesort bubbles the largest value up to the end of the array
// And continues doing so until the array is sorted

// Checks that an array is sorted 
predicate sorted (a: array<int>, lo: int, hi: int) 
reads a;
requires 0 <= lo <= hi <= a.Length;
{
	forall i, j :: (lo <= i <= j < hi) ==> a[i] <= a[j]
}

method BubbleSort (a: array<int>) 
requires a.Length >= 0;
modifies a;
ensures sorted (a, 0, a.Length);
ensures multiset (a[..]) == multiset (old(a[..]));
{
	var outer := a.Length;
	while (outer > 0) 
	invariant outer >= 0;
	// elements above outer are always sorted
	invariant sorted (a, outer, a.Length);
	// elements between 0 and outer are always <= than outer 
	invariant forall j, k :: 0 <= j < outer <= k < a.Length ==> a[j] <= a[k] 
	invariant multiset (old(a[..])) == multiset (a[..]);
	decreases outer;
	{
		var inner := 1;
		while (inner < outer) 
		invariant 1 <= inner <= outer <= a.Length;
		invariant sorted (a, outer, a.Length);
		// elements above outer are always sorted
		invariant forall j, k :: 0 <= j < outer <= k < a.Length ==> a[j] <= a[k] 
		// elements between 0 - inner, are always <= inner
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
	// Empty array
	var a := new int[][];
	var msa := multiset (a[..]);
	BubbleSort (a);
	assert (sorted (a, 0, a.Length));
	var msa' := multiset (a[..]);
	assert (msa == msa');

	// Sorted array 
	var b:= new int[][0,1,2,3,4,5,6,7,8,9,10];
	var msb := multiset (b[..]);
	BubbleSort (b);
	assert (sorted(b, 0, b.Length));
	var msb' := multiset (b[..]);
	assert (msb == msb');

	// Reverse sorted array 
	var c:= new int[][10,9,8,7,6,5,4,3,2,1,0];
	var msc := multiset (c[..]);
	BubbleSort (c);
	assert (sorted (c, 0, c.Length));
	var msc' := multiset (c[..]);
	assert (msc == msc');

	// Randomly unsorted array 
	var d:= new int[][6,3,4,5,8,9,10,2,1,0,7];
	var msd := multiset (d[..]);
	BubbleSort (d);
	assert (sorted (d, 0, d.Length));
	var msd' := multiset (d[..]);
	assert (msd == msd');
}