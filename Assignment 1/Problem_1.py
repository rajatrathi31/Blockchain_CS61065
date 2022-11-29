import hashlib

t = int(input())
while t > 0:
    n = int(input())
    ar = []
    
    for i in range(n):
        transactions = input()
        ar.append(transactions)
    
    ans = input()
    
    for i in range(n):
        ar[i] = hashlib.md5(ar[i].encode('utf-8')).hexdigest()
        
    while n != 1:
        i = 0
        j = 0
        while i < n:
            hash1 = ar[i]
            if i == n-1:
                hash2 = ar[i]
            else:
                hash2 = ar[i+1]
            add_hash = hash1 + hash2
            new_hash = hashlib.md5(add_hash.encode('utf-8')).hexdigest()
            ar[j] = new_hash
            j = j + 1
            i = i + 2
        n = j
        
    if ar[0] == ans:
        print("Valid")
    else:
        print("Invalid")
        
    t-=1