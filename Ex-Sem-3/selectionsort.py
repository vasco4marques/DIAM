array = [10, 6, 2, 1, 9, 5, 7, 3, 8, 4]

#3.3
#a) e b)

def selection_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        min = i
        for j in range(i + 1, n):
            if arr[j] < arr[min]:
                min = j
        arr[i], arr[min] = arr[min], arr[i]

print("Lista antes da ordenação:", array)
selection_sort(array)
print("Lista depois da ordenação:", array)

