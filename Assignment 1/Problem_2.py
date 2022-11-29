import hashlib

block_version = "02000000"
genesis_root = hashlib.md5("coinbase".encode('utf-8')).hexdigest()
block_hash = hashlib.md5((block_version + genesis_root).encode('utf-8')).hexdigest()

t = int(input())
while t > 0:
    n = int(input())
    ar = []
    
    for i in range(n):
        transactions = input()
        ar.append(transactions)
    
    prev_block_hash = input()
    
    if block_hash == prev_block_hash:
        print("Valid")
    else:
        print("Invalid")
    
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
    
    merkle_root_hash = ar[0]
    block_hash = hashlib.md5((block_version + block_hash + merkle_root_hash).encode('utf-8')).hexdigest()
        
    t-=1