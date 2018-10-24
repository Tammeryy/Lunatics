// this function is referenced from http://bighow.org/questions/MYSQL-Counting-the-occurences-of-distinct-values-depending-on-its-date
function sum (items: seq<int>, item: int): nat 
{  
	multiset(items)[item] 
}

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
ensures res_len == sum (a[..], key);
ensures sum (res[..res_len], key) == res_len; 
{
	res := new int[a.Length];
	res_len := 0;	
	var i := 0;
	while (i < a.Length) 
	invariant i <= a.Length;
	invariant 0 <= res_len <= i <= a.Length <= res.Length;
	invariant valid (res, res_len, key);
	invariant res_len == 0 <==> key !in a[..i];
	invariant res_len == sum (a[..i], key);
	invariant sum (res[..res_len], key) == res_len; 
	{
		if (a[i] == key) {
			// put it into the array
			res[res_len] := a[i];
			res_len := res_len + 1;	
		}	
		i := i + 1;
	}
  assert (a[..i] == a[..]);
}

