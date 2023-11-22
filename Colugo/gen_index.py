import glob
import hashlib
import random
import string
import argparse

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument("--source")
  args = parser.parse_args()
  source = ""
  if args.source is not None:
    source = args.source + "/"
  wavs = glob.glob(f"{source}wavs/processed/loop/*wav")

  with open('head.html', 'r') as file:
    head = file.read()

  with open("index.html", "w") as index:

    index.write(head)
    index.write("\n")

    for i in range(len(wavs)):
      wav = wavs[i]
      # wav_id = hashlib.md5(open(wav,'rb').read()).hexdigest()
      # wav_id = wav_id[20:]
      # wav_id = wav[-15:-4]
      wav_id = rand_str = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(10))
      # index.writelines('<div class="row">\n')
      font_size = round(random.uniform(0.5, 4), 2)
      div_audio = f"""<div class="audio-file">
  <div style='font-size: {font_size}em'>{wav_id}</div>
  <audio src="{wav}"></audio>
</div>"""
      index.writelines(div_audio + "\n")
      # index.writelines('</div>\n')
      # if i > 3: break;

      # print(div_audio)

    with open('tail.html', 'r') as file:
      tail = file.read()

    index.write(tail)
    index.close()



if __name__ == '__main__':
    main()
