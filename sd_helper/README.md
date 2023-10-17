### How I used vast.ai gpu compute to create this cool Depth Map image series video...

[![IMAGE ALT TEXT](http://img.youtube.com/vi/d6lvI_BAFOI/0.jpg)](http://www.youtube.com/watch?v=d6lvI_BAFOI "Future Earth")


check the midjourney facebook group for an inspirational image series

https://www.facebook.com/groups/officialmidjourney

download the images locally
```
mkdir -p /mnt/c/temp/to-delete/ffmpeg/midjourney/series
```

#### Create a Vast Instance with "stable-diffusion:web-ui" image

![image](https://github.com/c1earcase/tranq/assets/142124533/fda04e59-46db-47ce-bd08-b66fe098553c)

once your instance is up, we can do some damage

![image](https://github.com/c1earcase/tranq/assets/142124533/32f30205-d1e0-4d16-90f9-efd6105dbef4)

#### Locally Install the vast cli

NOTE: my environment is Windows with WSL2 and I have I have a python venv in ~/venv_3.

```
#apt install python3-venv
python3 -m venv ~/venv_3
source ~/venv_3/bin/activate
pip install --upgrade vastai;
```

https://cloud.vast.ai/cli/

#### Configure Vast Instance

I created some helper bash functions in [vast_functions](vast_functions.sh).

```
# THIS WILL ALLOW YOU TO USE THE FUNCTIONS IN BASH. ONLY MEANT TO BE USED FROM YOUR LOCAL MACHINE
# DON'T FORGET TO SOURCE THE FILE AGAIN EVERYTIME YOU CHANGE SOMETHING
source /mnt/c/temp/git_repos/c1earcase/tranq/sd_helper/vast_functions.sh
# ONLY NEED TO DO THIS ONCE TO CAPTURE YOUR INSTANCE ID IN /tmp/vast_instance
v_set_instance
# SSH TO INSTANCE
v_ssh

# INSTALL
apt install xvfb -y

# EDIT THIS FILE ON YOUR VAST INSTANCE
vi /pre_start.sh
```

Modify the second last line to use xvfb-run, otherwise you will get an EGL error during movie generation

![image](https://github.com/c1earcase/tranq/assets/142124533/02e52632-9520-4b0f-97c4-53b881a496bf)

#### Install the DepthMap Extension

```
cd /workspace/stable-diffusion-webui/extensions
git clone https://github.com/thygate/stable-diffusion-webui-depthmap-script.git
source /workspace/venv/bin/activate
pip install -r /workspace/stable-diffusion-webui/extensions/stable-diffusion-webui-depthmap-script/requirements.txt
# WE NEED TO ENABLE THE API SO ADD THESE PARAMETERS TO COMMANDLINE_ARGS SO IT LOOKS LIKE THE IMAGE BELOW
# --theme dark --api
vi /workspace/stable-diffusion-webui/webui-user.sh
```

![image](https://github.com/c1earcase/tranq/assets/142124533/898d8946-880e-4874-98e9-fd4e46352753)

```
# THESE WILL COME IN LATER...
mkdir -p /mnt/c/temp/to-delete/ffmpeg/midjourney/
mkdir -p /mnt/c/temp/git_repos/c1earcase/tranq
mkdir -p /workspace/stable-diffusion-webui/outputs/extras-images
mkdir -p /mnt/c/temp/to-delete/ffmpeg/depthmap/depthmap_output

# RETURN TO LOCAL MACHINE
exit

vast_instance=$(head -n 1 /tmp/vast_instance)
# COPY YOUR MIDJOURNEY IMAGE SERIES TO VAST INSTANCE
vastai copy /mnt/c/temp/to-delete/ffmpeg/midjourney $vast_instance:/mnt/c/temp/to-delete/ffmpeg/
# COPY THIS SOURCE CODE TO VAST INSTANCE
vastai copy /mnt/c/temp/git_repos/c1earcase/tranq/sd_helper vast_instance:/mnt/c/temp/git_repos/c1earcase/tranq/
```

```
# REBOOT YOUR VAST INSTANCE TO LET THE SETTINGS TAKE EFFECT, WAIT A FEW SECONDS
# I KNOW JUST SECONDS...IT'S FAST B/C IT'S DOCKER. I HAD TO WAIT LIKE MINUTES ON GCP. VAST.AI IS GOOD LIKE THAT...
v_reboot_instance

v_ssh
# JUMP BACK ON VAST INSTANCE AND CHECK STARTUP LOG
tail -100f /workspace/onstart.log
```

If all went well, it should look something like this...

![image](https://github.com/c1earcase/tranq/assets/142124533/d865f1d7-77be-4367-9e7d-3598e4792d44)

You may get an xvfb error. Honestly, I did a v_reboot_instance (1-3 times) and it worked

```
xvfb-run: error: Xvfb failed to start
```

You could also try and kill the the launch process, and it should relaunch...This technique is used in [sd_helper](sd_helper.py) for a different reason having to do with clearing the cache before generating new mp4s. 

![image](https://github.com/c1earcase/tranq/assets/142124533/02a1ecb9-1bc5-4d9b-a481-e58f4bc5fe7c)

```
ps -ef | grep python3 | grep -v grep
kill -9 <above pid>
```

I recommend you stick to v_reboot_instance. This is only neccessary if you are getting the above error: "Xvfb failed to start".

#### Generating DepthMap Videos / MP4s

Assuming you're in business, and the 'vast copy' of the image series and this code ended up in the right folders, you should be able to run.

```
# DON'T THINK YOU NEED A PYTHON ENV
# source /workspace/venv/bin/activate
cd /mnt/c/temp/git_repos/c1earcase/tranq/sd_helper
python sd_helper.py --batch /mnt/c/temp/to-delete/ffmpeg/midjourney/series
```

Here is one of my runs in progress (about 11 minutes per per image to 4 trajectory mp4s, that's legit. Enough time for a swim)...

![image](https://github.com/c1earcase/tranq/assets/142124533/2c470236-81e5-43b8-bdba-89d7e47dd3fa)

You can tail the sd log file (in a separate ssh session) to see how it's working...

```
tail -100f /workspace/onstart.log
tail -100f /workspace/stable-diffusion-webui/onstart.log
```

Once all the mp4s are generated, I COULD bring them back down to my machine.

```
vastai copy 7088171:/mnt/c/temp/to-delete/ffmpeg/depthmap/depthmap_output /mnt/c/temp/to-delete/ffmpeg/depthmap/
```

Then I can piece them together using some ffmpeg scripts I created. OR I could run this ffmpeg code on the Vast Instance and leverage the GPU for rendering!
