// Team Luna: Dafny Verified Binary Search 

// Verification of the classic binary search on a sorted array
// where we split the array in half each iteration until we find the key
// returns the index of the key, and -1 if the key was not found 

// Checks that an array is sorted 
predicate sorted (a: array<int>, lo: int, hi: int) 
reads a;
requires 0 <= lo <= hi <= a.Length;
{
	forall i, j :: (lo <= i <= j < hi) ==> a[i] <= a[j]
}

// Checks that all the items in the array are unique 
predicate uniq (a: seq<int>) 
{
	forall i :: (0 <= i < |a|) ==> 
	((forall j :: (0 <= j < i) ==> a[i] != a[j]) && 
	 (forall j :: (i+1 <= j < |a|) ==> a[i] != a[j]))
}

method BinarySearch(a: array<int>, key: int) returns (res: int)
requires sorted (a, 0, a.Length);
requires uniq (a[..]);
// if the result is -1, the key is not in array
ensures res < 0 ==> res == -1 && key !in a[..] 
// if the result is greate than zero, it is within array bounds and a[res] == key, and nothing else is equal to the key
ensures res >= 0 ==> res < a.Length && a[res] == key && forall i :: (0 <= i < a.Length && i != res) ==> a[i] != key
ensures multiset (old(a[..])) == multiset (a[..])
{
	var lo := 0;
	var hi := a.Length;
	while (lo < hi)
	invariant 0 <= lo <= hi <= a.Length;
	invariant key !in a[..lo] && key !in a[hi..];
	{
		var mid := (lo + hi) / 2;
		if key < a[mid] {
			hi := mid;
		} else if a[mid] < key {
			lo := mid + 1;
		} else {
			return mid;
		}
	}
	return -1;
}

// Test Cases 
method Main () 
{
	// on normal array
	var a := new int[][0,1,2,3,4,5,6,7,8,9,10]; 
	var msa := multiset(a[..]);
	var res_a : int;
	
	res_a := BinarySearch (a, 0);
	assert (res_a == 0);
	
	res_a := BinarySearch (a, 5);
	assert (res_a == 5);
	
	res_a := BinarySearch (a, 10);
	assert (res_a == 10); 

	res_a := BinarySearch (a, 11);
	assert (res_a == -1);

	res_a := BinarySearch (a, 20);
	assert (res_a == -1);

	res_a := BinarySearch (a, -1);
	assert (res_a == -1);

	var msa' := multiset(a[..]);
	assert (msa == msa');

	// on empty array 
	var b := new int[][];
	var msb := multiset (b[..]);

	var res_b := BinarySearch (b, 0);
	assert (res_b == -1);

	var msb' := multiset (b[..]);
	assert (msb == msb');
}
