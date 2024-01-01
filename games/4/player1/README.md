![image](https://github.com/c1earcase/tranq/assets/8038214/ebbdaa10-30de-41d4-b5e6-2eb4e6ef5658)


















### some notes on face_mod

```
cd /mnt/c/temp/git_repos/c1earcase/tranq/games/4/player1/python/face_mod
conda activate dlib
python face_mod.py --source /mnt/c/temp/tmp/player/media/enemy/Howard_Stern/head.png --head \
--MOUTH_Y_OFFSET -10 --MOUTH_X_OFFSET -0 --SCALE 0.05 --MOUTH_ROTATION -5

```

```
############################################################
# THE FOLLOWING PASTED IN BASH WILL ACTIVATE MINICONDA
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/root/miniconda3/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/root/miniconda3/etc/profile.d/conda.sh" ]; then
        . "/root/miniconda3/etc/profile.d/conda.sh"
    else
        export PATH="/root/miniconda3/bin:$PATH"
    fi
fi
############################################################
# INSTALL DLIB, NO CUDA
# https://gist.github.com/nguyenhoan1988/ed92d58054b985a1b45a521fcf8fa781
git clone https://github.com/davisking/dlib.git
cd dlib
mkdir build
cd build
cmake .. -DDLIB_USE_CUDA=0
cmake --build .
cd ..
python setup.py install --set DLIB_USE_CUDA=0
############################################################
pip install cv2
pip install opencv-python
pip install Pillow
pip install imageio
```