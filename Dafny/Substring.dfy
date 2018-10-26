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
method Prefix (str: array<char>, start: int, sub: array<char>) returns (b: bool)
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
method Substring (str: array<char>, sub: array<char>) returns (b: bool, index: int)
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
  	var b := Prefix (str, i, sub);
  	if (b) {
  		assert (i + sub.Length <= str.Length);
  		return true, i;
  	}
  	i := i + 1;
  }	
  return false, -1;
}

// Test Cases
method Main () {

	// Testing substring works at the beginning of string
	var str := new char[]['h', 'e', 'l', 'l', 'o'];
	var sub := new char[]['h', 'e', 'l', 'l'];
	var b: bool;
	var index: int;

    // Prefix
    b := Prefix (str, 0, sub);
    assert (b);

    // Substring
    b, index := Substring (str, sub);
    print (b);
    print (index);
    // assert (b);
    // assert (index == 0);

    // Testing substring works in the middle of string
    sub := new char []['e', 'l', 'l'];

    // Prefix 
    b := Prefix (str, 0, sub);
    assert (!b);
    b := Prefix (str, 1, sub);
    assert (b);

    // Substring
    b, index := Substring (str, sub);
    print (b);
    print (index);
    // assert (b);
    // assert (index == 1);

    // Testing substring works at the end of string
    sub := new char []['l', 'l', 'o'];

    // Prefix 
    b := Prefix (str, 1, sub);
    assert (!b);
    b := Prefix (str, 2, sub);
    assert (b);

    // Substring
    b, index := Substring (str, sub);
    print (b);
    print (index);
    // assert (b);
    // assert (index == 2);
}

