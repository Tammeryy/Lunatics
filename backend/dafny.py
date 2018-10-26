# NOTE key passed in here as Dafny verifies the sorting algorithm, but
# only on ints. As we're sorting an array on a key, we need to know 
# what the key is.
def partition(a, start, end, key):
    pivot = start
    i = start + 1
    while i < end:
        if a[i][key] < a[start][key]:
            pivot += 1
            temp = a[i]
            a[i] = a[pivot]
            a[pivot] = temp
        i += 1
    temp = a[start]
    a[start] = a[pivot]
    a[pivot] = temp

    return pivot

def quicksort(arr, start, end, key):
    if end <= start:
        return
    else:
        pivot = partition(arr, start, end, key)
        quicksort(arr, start, pivot, key)
        quicksort(arr, pivot + 1, end, key)

def binarySearch(arr, value, key):
    lo = 0
    hi = len(arr)
    while lo < hi:
        mid = int(lo + hi)/2
        if value < arr[mid][key]:
            hi = mid
        elif arr[mid][key] < value:
            low = mid + 1
        else:
            return arr[mid]

def insertionSort(a, key):
    up = 1
    while up < len(a):
        val = a[up]
        down = a[down]
        while down > 0 and a[down-1] > val:
            a[down] = a[down-1]
            down -= 1
        a[down] = val
        up += 1
