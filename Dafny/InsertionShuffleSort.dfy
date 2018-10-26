// Team Luna: Dafny Verified Insertion Shuffle Sort 

// Taken from Assignment 2 Exercise 6
// This insertion sort 'shuffles' each element in the array
// to the correct position until the array is sorted 

// Checks that an array is sorted 
predicate sorted (a: array<int>, lo: int, hi: int) 
reads a;
requires 0 <= lo <= hi <= a.Length;
{
	forall i, j :: (lo <= i <= j < hi) ==> a[i] <= a[j]
}

// true if the elements are sorted between 0 and up
// and the shuffled element is ok -> in the right place
predicate ShuffleOK (a: array<int>, up: int, down: int, val: int) 
reads a;
requires 0 <= down <= up < a.Length;
{
	(forall i, j :: (0 <= i < j <= up && j != down) ==> a[i] <= a[j]) &&
	(forall k :: (down <= k < up) ==> a[k] >= val)
}

// insertion sort shuffle
method InsertionSortShuffle (a: array<int>)
requires a.Length > 1;
ensures sorted (a, 0, a.Length);
ensures multiset (a[..]) == multiset (old(a[..]));
modifies a;
{
	var up := 1;
	while (up < a.Length)
	invariant up <= a.Length;	
	invariant sorted (a, 0, up);
	invariant multiset (a[..]) == multiset (old(a[..]));
	{
		var val := a[up];
		var down := up;
		while (down > 0 && a[down-1] > val) 
		invariant 0 <= down <= up;
		invariant ShuffleOK (a, up, down, val);
		invariant multiset (a[..][down:=val]) == multiset (old(a[..]));
		{
			a[down] := a[down-1];
			down := down - 1;
		}
		a[down] := val;
		up := up + 1;
	}
}

// Test Cases
method Main()
{
	// Empty array
	var a := new int[][];
	var msa := multiset (a[..]);
	InsertionSortShuffle (a);
	assert (sorted (a, 0, a.Length));
	var msa' := multiset (a[..]);
	assert (msa == msa');

	// Sorted array 
	var b:= new int[][0,1,2,3,4,5,6,7,8,9,10];
	var msb := multiset (b[..]);
	InsertionSortShuffle (b);
	assert (sorted(b, 0, b.Length));
	var msb' := multiset (b[..]);
	assert (msb == msb');

	// Reverse sorted array 
	var c:= new int[][10,9,8,7,6,5,4,3,2,1,0];
	var msc := multiset (c[..]);
	InsertionSortShuffle (c);
	assert (sorted (c, 0, c.Length));
	var msc' := multiset (c[..]);
	assert (msc == msc');

	// Randomly unsorted array 
	var d:= new int[][6,3,4,5,8,9,10,2,1,0,7];
	var msd := multiset (d[..]);
	InsertionSortShuffle (d);
	assert (sorted (d, 0, d.Length));
	var msd' := multiset (d[..]);
	assert (msd == msd');
}