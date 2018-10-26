// Team Luna: Dafny Verified Linear Search

// This Linear Search returns an array of values that match the key
// Used to 'filter' elements from an array
// For example, it could be used to filter out 'Asian cuisine'/'Vegetarian catering'/'Formal event' from posts in our system

// This function is referenced from http://bighow.org/questions/MYSQL-Counting-the-occurences-of-distinct-values-depending-on-its-date
// It counts the number of keys in a sequence
function count (a: seq<int>, key: int): nat 
{  
	multiset(a)[key] 
}

// checks if the resultant array is valid --> i.e., that it only contains items with the correct key
predicate valid (a: array<int>, res_len: int, key: int) 
reads a;
requires a.Length >= 0;
requires 0 <= res_len <= a.Length;
{
	res_len <= 0 || 
	(forall i :: (0 <= i < res_len) ==> a[i] == key)
}

method LinearSearch (a: array<int>, key: int) returns (res: array<int>, res_len: int) 
requires a.Length >= 0;
ensures 0 <= res_len <= a.Length <= res.Length;
ensures valid (res, res_len, key);
ensures res_len == 0 <==> key !in a[..];
ensures res_len == count (a[..], key) && res_len == count (res[..res_len], key); 
{
	res := new int[a.Length];
	res_len := 0;	
	var i := 0;
	while (i < a.Length) 
	invariant 0 <= res_len <= i <= a.Length <= res.Length;
	invariant valid (res, res_len, key);
	invariant res_len == 0 <==> key !in a[..i];
	invariant res_len == count (a[..i], key) && res_len == count (res[..res_len], key); 
	{
		if (a[i] == key) {
			res[res_len] := a[i];
			res_len := res_len + 1;	
		}	
		i := i + 1;
	}
  assert (a[..i] == a[..]);
}

// Test cases 
method Main () 
{
	// Testing array with contiguous keys 
	var a := new int[][1,2,2,3,3,3,4,4,4,4];
	var a_res : array<int>;
	var a_res_len : int;

	// Testing keys within range 
	a_res, a_res_len := LinearSearch (a, 1);
	assert (valid(a_res, a_res_len, 1));
	assert (a_res_len == count(a[..], 1));

	a_res, a_res_len := LinearSearch (a, 2);
	assert (valid(a_res, a_res_len, 2));
	assert (a_res_len == count(a[..], 2));

	a_res, a_res_len := LinearSearch (a, 3);
	assert (valid(a_res, a_res_len, 3));
	assert (a_res_len == count(a[..], 3));

	a_res, a_res_len := LinearSearch (a, 4);
	assert (valid(a_res, a_res_len, 4));
	assert (a_res_len == count(a[..], 4));

	// Testing key outside (below) range 
	a_res, a_res_len := LinearSearch (a, 0);
	assert (valid(a_res, a_res_len, 0));
	assert (a_res_len == count(a[..], 0));

	// Testing key outside (above) range
	a_res, a_res_len := LinearSearch (a, 5);
	assert (valid(a_res, a_res_len, 5));
	assert (a_res_len == count(a[..], 5));

	// Testing array with non - contiguous keys 
	var b := new int[][4,1,2,4,3,3,4,2,3,4];
	var b_res : array<int>;
	var b_res_len : int;

	// Testing keys within range 
	b_res, b_res_len := LinearSearch (b, 1);
	assert (valid(b_res, b_res_len, 1));
	assert (b_res_len == count(b[..], 1));

	b_res, b_res_len := LinearSearch (b, 2);
	assert (valid(b_res, b_res_len, 2));
	assert (b_res_len == count(b[..], 2));

	b_res, b_res_len := LinearSearch (b, 3);
	assert (valid(b_res, b_res_len, 3));
	assert (b_res_len == count(b[..], 3));

	b_res, b_res_len := LinearSearch (b, 4);
	assert (valid(b_res, b_res_len, 4));
	assert (b_res_len == count(b[..], 4));
	
	// Testing key outside (below) range 
	b_res, b_res_len := LinearSearch (b, 0);
	assert (valid(b_res, b_res_len, 0));
	assert (b_res_len == count(b[..], 0));

	// Testing key outside (above) range
	b_res, b_res_len := LinearSearch (b, 5);
	assert (valid(b_res, b_res_len, 5));
	assert (b_res_len == count(b[..], 5));
}


