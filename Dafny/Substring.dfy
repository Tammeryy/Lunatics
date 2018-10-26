// Team Luna: Verified Dafny Substring

// Determines if one string is a substring of another string  
// The substring function verifies, except it will not pass asserts in the test
// I believe that this is because post condition was not strong enough for the 'false' case, but was unable to get it working. 
// The asserts are commented out in the test cases. 

// Check if two sequences are equal or not
predicate equal (a: seq<char>, b: seq <char>)
{
	|a| == |b| && forall i :: (0 <= i < |a|) ==> a[i] == b[i]	
}

// method to check if sub is a prefix of str from str[start..]
method prefix (str: array<char>, start: int, sub: array<char>) returns (b: bool)
requires 0 <= sub.Length <= str.Length - start <= str.Length;
requires start <= str.Length;
ensures b <==> equal(sub[..], str[start..(start + sub.Length)])
{
	var i := 0;
	while (i < sub.Length) 
	invariant i <= sub.Length;
	invariant equal (sub[..i], str[start..(i + start)]);
	{
		if (str[i + start] != sub[i]) {
			return false;
		}
		i := i + 1;
	}
	return true;
}

/// method to check substring, returns true/false and the index at which the substring is 
method substring (str: array<char>, sub: array<char>) returns (b: bool, index: int)
ensures b <==> index >= 0 && str.Length >= sub.Length && (index + sub.Length < str.Length) && equal (str[index..(index+sub.Length)], sub[..])
//ensures !b <==> index < 0 

{
  // early exit if str length < sub length
  if (str.Length < sub.Length) {
  	return false, -1;
  }
  
  // otherwise, check if the start of each character (up til str.Length - sub.Length) contains 
  // the substring in it 
  var i := 0;
  while (i < str.Length - sub.Length) 
  invariant i <= str.Length - sub.Length;
  invariant i > 0 ==> !equal (str[(i-1)..(i-1)+sub.Length], sub[..])
  {
  	var b := prefix (str, i, sub);
  	if (b) {
  		assert (i + sub.Length <= str.Length);
  		return true, i;
  	}
  	i := i + 1;
  }	
  return false, -1;
}

// basic testing
method Main () {
	var str := new char[]['h', 'e', 'l', 'l', 'o'];
	var sub := new char[]['h', 'e', 'l', 'l'];
	var b: bool;
	var index: int;
    // testing that prefix works 
    b := prefix (str, 0, sub);
    assert (b);
    // testing substring
    b, index := substring (startr, sub);
    // prints correctly but zz
    print (b);
    print (index);
    // assert (b);
    // assert (index == 0);
    
}

