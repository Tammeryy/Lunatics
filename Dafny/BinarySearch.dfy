
predicate sorted (a: array<int>, lo: int, hi: int) 
reads a;
requires 0 <= lo <= hi <= a.Length;
{
	forall i, j :: (lo <= i <= j < hi) ==> a[i] <= a[j]
}

predicate uniq (a: seq<int>) 
{
	forall i :: (0 <= i < |a|) ==> 
	((forall j :: (0 <= j < i) ==> a[i] != a[j]) && 
	(forall j :: (i+1 <= j < |a|) ==> a[i] != a[j]))
}

method BinarySearch(a: array<int>, key: int) returns (res: int)
requires sorted (a, 0, a.Length);
requires uniq (a[..]);
// if i put this into a predicate, it doesn't verify anymore :( 
ensures res < 0 ==> key !in a[..] 
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

// some tests 
method Main () 
{
	var a := new int[][0,1,2,3,4,5,6,7,8,9,10]; // testcase 1
	var msa := multiset(a[..]);
	var res : int;
	res := BinarySearch (a, 0);
	assert (res == 0);
	res := BinarySearch (a, 5);
	assert (res == 5);
	var msa' := multiset(a[..]);
	assert msa == msa';
}
