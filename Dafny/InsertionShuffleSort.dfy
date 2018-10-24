
// true if the elements are sorted between lo and hi, false otherwise
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

method Main()
{
	// do not change this code
	var a := new int[][6,2,0,6,3,5,0,4,1,6,0]; // testcase 1
	var msa := multiset(a[..]);
	InsertionSortShuffle(a);
	assert sorted(a, 0, a.Length);
	var msa' := multiset(a[..]);
	assert msa == msa';
	var b := new int[][8,7]; // testcase 2
	InsertionSortShuffle(b);
	print a[..], b[..];
}
