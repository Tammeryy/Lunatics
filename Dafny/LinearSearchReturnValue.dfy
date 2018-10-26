// Team Luna: Dafny Verified Linear Search 

// Verification of a classic Linear Search that returns the index of a key 

// Checks that all the items in the array are unique 
predicate uniq (a: seq<int>) 
{
	forall i :: (0 <= i < |a|) ==> 
	((forall j :: (0 <= j < i) ==> a[i] != a[j]) && 
	(forall j :: (i+1 <= j < |a|) ==> a[i] != a[j]))
}

method LinearSearch(a: array<int>, key: int) returns (res: int)
requires uniq (a[..]);
// if i put this into a predicate, it doesn't verify anymore :( 
ensures res < 0 ==> res == -1 && key !in a[..] 
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

// Test Cases 
method Main () 
{
	// on normal array
	var a := new int[][0,1,2,3,4,5,6,7,8,9,10]; 
	var msa := multiset(a[..]);
	var res_a : int;
	
	res_a := LinearSearch (a, 0);
	assert (res_a == 0);
	
	res_a := LinearSearch (a, 5);
	assert (res_a == 5);
	
	res_a := LinearSearch (a, 10);
	assert (res_a == 10); 

	res_a := LinearSearch (a, 11);
	assert (res_a == -1);

	res_a := LinearSearch (a, 20);
	assert (res_a == -1);

	res_a := LinearSearch (a, -1);
	assert (res_a == -1);

	var msa' := multiset(a[..]);
	assert (msa == msa');

	// on empty array 
	var b := new int[][];
	var msb := multiset (b[..]);

	var res_b := LinearSearch (b, 0);
	assert (res_b == -1);

	var msb' := multiset (b[..]);
	assert (msb == msb');
}
