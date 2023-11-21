
#### generate word list for music search...
<img src="https://github.com/c1earcase/tranq/assets/8038214/4ba871e8-fcac-46ed-b2d2-ebeadf753e31" width=400>

or try: https://random-word-api.herokuapp.com/home
```
curl https://random-word-api.herokuapp.com/word?number=10
["soaps","corniest","sweethearts","swathers","trunnion","angelic","courants","permeable","stream","cloddy"]
```

#### copy and paste to [words.txt](words.txt)

<img src="https://github.com/c1earcase/tranq/assets/8038214/6956958d-6251-4a74-bef9-0c710448836f" width=200>

#### execute downloads

```
python s1TuThe0.py
```
#### check to see if you have enough, before killing the downloads script above...

```
find processed/ -name *.wav | wc -l
256                                  
```

#### save space by only keeping wavs/processed/loop

```
rm -rf wavs/processed/oneshot
rm -rf wavs/raw
```

#### generate index.html

```
python gen.py
```

#### start a simple.http sever to serve up index.html locally

```
python -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

#### open index.html in browser: http://localhost:8000/index.html
