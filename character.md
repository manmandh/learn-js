# Character
## A number of common character groups have their own built-in short-cuts. Digits are one of them: \d means the same thing as [0-9].

<h4 id="\d">\d</h4>
Any digit character
<h4 id="\w">\d</h4>
An alphanumeric character (“word character”)
<h4 id="\s">\d</h4>
Any whitespace character (space, tab, newline, and similar)
<h4 id="\D">\d</h4>
A character that is not a digit
<h4 id="\W">\d</h4>
A nonalphanumeric character
<h4 id="\S">\d</h4>
A nonwhitespace character


/abc/ A sequence of characters
/[abc]/ Any character from a set of characters
/[^abc]/ Any character not in a set of characters
/[0-9]/ Any character in a range of characters
/x+/ One or more occurrences of the pattern x
/x+?/ One or more occurrences, nongreedy
/x*/ Zero or more occurrences
/x?/ Zero or one occurrence
/x{2,4}/ Two to four occurrences
/(abc)/ A group
/a|b|c/ Any one of several patterns
/\d/ Any digit character
/\w/ An alphanumeric character (“word character”)
/\s/ Any whitespace character
/./ Any character except newlines
/\b/ A word boundary
/^/ Start of input
/$/ End of input