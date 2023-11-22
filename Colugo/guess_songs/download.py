from pydub import AudioSegment, effects
from yt_dlp import YoutubeDL
import glob
import os
import random
import string
 
BATCH_SIZE         = 128
MAX_SEARCH_RESULTS = 10
DOWNLOAD_DIR       = 'wavs/raw'
LOOP_OUTPUT_DIR    = 'wavs/processed/loop'
ONESHOT_OUTPUT_DIR = 'wavs/processed/oneshot'
WORD_LIST          = 'words.txt'
MIN_LENGTH = 2
MAX_LENGTH = 4
 
def read_lines(file):
  return open(file).read().splitlines()
 
class download_range_func:
  def __init__(self):
    pass
  def __call__(self, info_dict, ydl):
    timestamp = self.make_timestamp(info_dict)
    yield {
        'start_time': timestamp,
        'end_time': timestamp,
    }
  @staticmethod
  def make_timestamp(info):
      duration = info['duration']
      if duration is None:
        return 0
      return duration/random.randint(1, 10)
 
def make_random_search_phrase(word_list):
  words = random.sample(word_list, 1)
  phrase = ' '.join(words)
  print('Search phrase: "{}"'.format(phrase))
  return phrase

def make_download_options(phrase):
  safe_phrase = ''.join(x for x in phrase if x.isalnum() or x in "._- ")
  rand_str = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(2))

  return {
    'format': 'bestaudio/best',
    'paths': {'home': DOWNLOAD_DIR},
    'outtmpl': {'default': f'{safe_phrase}_{rand_str}_%(id)s.%(ext)s'},
    'download_ranges': download_range_func(),
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'wav',
    }]
  }

def make_oneshot(sound, phrase, output_filepath):
  length = random.randint(MIN_LENGTH, MAX_LENGTH) * 1000
  final_length = min(length, len(sound))
  quarter = int(final_length/4)
  sound   = sound[:final_length]
  sound   = sound.fade_out(duration=quarter)
  sound   = effects.normalize(sound)
  sound.export(output_filepath, format="wav")
 
def make_loop(sound, phrase, output_filepath):
  length = random.randint(MIN_LENGTH, MAX_LENGTH) * 1000
  final_length = min(length, len(sound))
  half         = int(final_length/2)
  fade_length  = int(final_length/4)
  beg   = sound[:half]
  end   = sound[half:]
  end   = end[:fade_length]
  beg   = beg.fade_in(duration=fade_length)
  end   = end.fade_out(duration=fade_length)
  sound = beg.overlay(end)
  sound = effects.normalize(sound)
  sound.export(output_filepath, format="wav")
 
def process_file(filepath, phrase):
  try:
    safe_phrase = ''.join(x for x in phrase if x.isalnum() or x in "._- ")
    filename                 = os.path.basename(filepath)
    output_filepath_oneshot  = os.path.join(ONESHOT_OUTPUT_DIR, f'oneshot_{safe_phrase}-{filename}')
    # output_filepath_loop     = os.path.join(LOOP_OUTPUT_DIR, f'loop_{safe_phrase}-{filename}')
    output_filepath_loop     = os.path.join(LOOP_OUTPUT_DIR, f'loop_{filename}')
    
    sound = AudioSegment.from_file(filepath, "wav")
    if (len(sound) > 500):
      # if not os.path.exists(output_filepath_oneshot):
        # make_oneshot(sound, phrase, output_filepath_oneshot)
      if not os.path.exists(output_filepath_loop):
        make_loop(sound, phrase, output_filepath_loop)
    os.remove(filepath)
  except Exception as err:
    print("Failed to process '{}' ({})".format(filepath, err))
 
def setup():
    if not os.path.exists(LOOP_OUTPUT_DIR):
      os.makedirs(LOOP_OUTPUT_DIR)
    if not os.path.exists(ONESHOT_OUTPUT_DIR):
      os.makedirs(ONESHOT_OUTPUT_DIR)
 
def main():
  try:
    setup()
    word_list = read_lines(WORD_LIST)
    for _ in range(BATCH_SIZE):
      phrase    = make_random_search_phrase(word_list)
      video_url = f'ytsearch1:"{phrase}"'
      options   = make_download_options(phrase)
      YoutubeDL(options).download([video_url])
      for filepath in glob.glob(os.path.join(DOWNLOAD_DIR, f'{phrase}-*.wav')):
        process_file(filepath, phrase)
  except Exception as err:
     print('FATAL ERROR: {}'.format(err))
  finally:
    pass
 
if __name__ == '__main__':
  main()