import os
import argparse
import glob
import requests
import base64
import subprocess
import time
import datetime
from termcolor import colored

depthmap_output_dir = "/mnt/c/temp/to-delete/ffmpeg/depthmap/depthmap_output"
stable_diff_output_dir = "/workspace/stable-diffusion-webui/outputs/extras-images"
sd_host_port = "localhost:3000"

def image_to_mp4s(img_file):
  with open(img_file, "rb") as f:
    img_bytes = f.read()        

  img_encoded = base64.encodebytes(img_bytes).decode('utf-8').rstrip()
  json_data = {
    "depth_input_images": [f"{img_encoded}"],
    "options": {
      "compute_device": "GPU",
      "model_type": 0,
      "net_size_match":"True",
      "do_output_depth":"True",
      "gen_inpainted_mesh":"True",
      "gen_inpainted_mesh_demos":"True",
    }
  }

  # formatted_json = json.dumps(json_data, sort_keys=False, indent=2)
  # from pygments import highlight, lexers, formatters
  # colorful_json = highlight(formatted_json, lexers.JsonLexer(), formatters.TerminalFormatter())
  # print(colorful_json)

  # with open('data.json', 'w') as f:
    # json.dump(json_data, f)

  image_name = get_img_name_only(img_file)
  print(f"{image_name} -> generating mp4s...", end="", flush=True)
  start = datetime.datetime.now().replace(microsecond=0)
  headers = {'Content-type': 'application/json'}
  response = requests.post(f"http://{sd_host_port}/depth/generate", json=json_data, headers=headers)
  if response.status_code != 200:
    print(response.content)
    return

  all_mp4s = glob.glob(f"{stable_diff_output_dir}/*.mp4", recursive=True)
  if len(all_mp4s) == 0:
    print(colored(f"{image_name} mp4s generation failed...", 'red'))
    return
  # all_mp4s = " ".join(f for f in all_mp4s)

  subprocess.check_output(["mkdir", "-p", f"{image_name}"],
    cwd=f"{depthmap_output_dir}")
  subprocess.check_output(["mv"] + all_mp4s + [f"{depthmap_output_dir}/{image_name}/"])
  subprocess.check_output(["rm", "-rf"] + glob.glob(f"{stable_diff_output_dir}/*.obj"),
    cwd=f"{stable_diff_output_dir}")

  end = datetime.datetime.now().replace(microsecond=0)
  print("took " + str(end - start))

  return


def get_img_name_only(path):
  image_name = os.path.basename(path)
  image_name = os.path.splitext(f"{image_name}")[0]
  return image_name

def batch(args):
  album_folder = args.batch
  if not os.path.isdir(album_folder):
    print(f"{album_folder} must be dir")
    return

  # CLEAR OUT THE SD OUTPUT FOLDER OF LEFTOVERS
  subprocess.check_output(["rm", "-rf"] + glob.glob(f"{stable_diff_output_dir}/*"))

  all_images = glob.glob(f"{album_folder}/*.jpg")
  for f in all_images:
    image_name = get_img_name_only(f)
    if os.path.isdir(f"{depthmap_output_dir}/{image_name}"):
      print(f"{image_name} -> already exists, " + colored('skipping', 'red'))
      continue
    else:
      killSD() # RESTART SD AS FIRST THING TO ENSURE RUNNING WITH CLEAN INSTANCE WITHOUT CACHED VIDEOS
      time.sleep(10)
      waitForSD() 
      image_to_mp4s(f)
    

def waitForSD():
  url = f"http://{sd_host_port}/depth/version"
  while True:
    try:
      response = requests.get(url)
      if response.status_code == 200:
        time.sleep(5)
        break
      else:
        time.sleep(10)
    except BaseException as exception:
      time.sleep(10)


def killSD():
  subprocess.check_output(["sh", "./kill_sd.sh"])


def init():
  if os.name != 'nt':
    if os.path.isfile("/.launch"): # VAST
      global sd_host_port
      sd_host_port = "localhost:3000"
      global stable_diff_output_dir
      stable_diff_output_dir = "/workspace/stable-diffusion-webui/outputs/extras-images"


def main():
  init()
  parser = argparse.ArgumentParser()
  parser.add_argument('--batch')

  args = parser.parse_args()
  if args.batch:
    batch(args)


# Run the main function
if __name__ == '__main__':
  main()

    # "options": {
      # "compute_device": "GPU",
      # "model_type": 0,
      # "net_size_match":"True",
      # "do_output_depth":"True",
      # "gen_inpainted_mesh":"True",
      # "gen_inpainted_mesh_demos":"True",
    # }

# /mnt/c/temp/git_repos/stable-diffusion-webui/extensions/stable-diffusion-webui-depthmap-script
# grep -r --include '*.py' "go make some coffee" .
# core_generation_funnel in core.api 
# {
  # "options": [
    # "boost",
    # "clipdepth",
    # "clipdepth_far",
    # "clipdepth_mode",
    # "clipdepth_near",
    # "compute_device",
    # "do_output_depth",
    # "do_output_depth_prediction",
    # "gen_heatmap",
    # "gen_inpainted_mesh",
    # "gen_inpainted_mesh_demos",
    # "gen_normalmap",
    # "gen_rembg",
    # "gen_simple_mesh",
    # "gen_stereo",
    # "model_type",
    # "net_height",
    # "net_size_match",
    # "net_width",
    # "normalmap_invert",
    # "normalmap_post_blur",
    # "normalmap_post_blur_kernel",
    # "normalmap_pre_blur",
    # "normalmap_pre_blur_kernel",
    # "normalmap_sobel",
    # "normalmap_sobel_kernel",
    # "output_depth_combine",
    # "output_depth_combine_axis",
    # "output_depth_invert",
    # "pre_depth_background_removal",
    # "rembg_model",
    # "save_background_removal_masks",
    # "simple_mesh_occlude",
    # "simple_mesh_spherical",
    # "stereo_balance",
    # "stereo_divergence",
    # "stereo_fill_algo",
    # "stereo_modes",
    # "stereo_offset_exponent",
    # "stereo_separation"
  # ]
# }








############################################################
# ALL OF THIS BELOW IS THE OLD FUCKING API, NEEDS TO BE DELETED, NOT USABLE ANYMORE
############################################################
    # "options": {
      # "compute_device": "GPU",
      # "model_type": 0,
      # "match_size":"True",
      # "save_outputs":"True",
      # "output_depth":"True",
      # "inpaint":"True",
      # "inpaint_vids":"True",
      # "depthmap_batch_reuse":"True",
      # "mesh_occlude":"True"
    # }

# {
	# 'background_removal': False,
	# 'background_removal_model': 'u2net',
	# 'boost': True,
	# 'clipdepth': False,
	# 'clipthreshold_far': 0,
	# 'clipthreshold_near': 1,
	# 'combine_output': False,
	# 'combine_output_axis': 1,
	# 'compute_device': 'GPU',
	# 'custom_depthmap': False,
	# 'custom_depthmap_img': None,
	# 'depthmap_batch_input_dir': '',
	# 'depthmap_batch_output_dir': '',
	# 'depthmap_batch_reuse': True,
	# 'depthmap_input_image': < PIL.Image.Image image mode = RGB size = 2736 x1761 at 0x283F20FFFD0 > ,
	# 'depthmap_mode': '0',
	# 'gen_mesh': False,
	# 'gen_normal': False,
	# 'gen_stereo': False,
	# 'image_batch': None,
	# 'inpaint': True,
	# 'inpaint_vids': True,
	# 'invert_depth': False,
	# 'match_size': False,
	# 'mesh_occlude': True,
	# 'mesh_spherical': False,
	# 'model_type': 0,
	# 'net_height': 448,
	# 'net_width': 448,
	# 'output_depth': True,
	# 'pre_depth_background_removal': False,
	# 'save_background_removal_masks': False,
	# 'save_outputs': True,
	# 'show_heat': False,
	# 'stereo_balance': 0,
	# 'stereo_divergence': 2.5,
	# 'stereo_fill': 'polylines_sharp',
	# 'stereo_modes': ['left-right', 'red-cyan-anaglyph'],
	# 'stereo_separation': 0
# }