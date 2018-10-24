
predicate uniq (a: seq<int>) 
{
	forall i :: (0 <= i < |a|) ==> 
	((forall j :: (0 <= j < i) ==> a[i] != a[j]) && 
	(forall j :: (i+1 <= j < |a|) ==> a[i] != a[j]))
}

method LinearSearch(a: array<int>, key: int) returns (res: int)
requires uniq (a[..]);
// if i put this into a predicate, it doesn't verify anymore :( 
ensures res < 0 ==> key !in a[..] 
ensures res >= 0 ==> res < a.Length && a[res] == key && forall i :: (0 <= i < a.Length && i != res) ==> a[i] != key
ensures multiset (old(a[..])) == multiset (a[..])
{
	var i := 0;
	while (i < a.Length)
	invariant 0 <= i <= a.Length
	invariant key !in a[..i];
	{
		if (a[i] == key) {
			return i;
		} 
		i := i + 1;
	}
	return -1;
}

// some tests 
method Main () 
{
	var a := new int[][0,1,2,3,4,5,6,7,8,9,10]; // testcase 1
	var msa := multiset(a[..]);
	var res : int;
	res := LinearSearch (a, 0);
	assert (res == 0);
	res := LinearSearch (a, 5);
	assert (res == 5);
	var msa' := multiset(a[..]);
	assert msa == msa';
}