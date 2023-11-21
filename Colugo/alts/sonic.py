from pydub import AudioSegment, effects
from yt_dlp import YoutubeDL
import glob
import os
import random

BATCH_SIZE = 32
MAX_SEARCH_RESULTS = 50  # You can adjust this value
DOWNLOAD_DIR = 'wav/raw'
LOOP_OUTPUT_DIR = 'wav/processed/loop'
ONESHOT_OUTPUT_DIR = 'wav/processed/oneshot'
WORD_LIST = 'words.txt'

def read_lines(file):
    return open(file).read().splitlines()

class DownloadRangeFunc:
    @staticmethod
    def __call__(info_dict, ydl):
        timestamp = DownloadRangeFunc.make_timestamp(info_dict)
        yield {
            'start_time': timestamp,
            'end_time': timestamp,
        }

    @staticmethod
    def make_timestamp(info):
        duration = info['duration']
        return 0 if duration is None else duration / 2

def make_random_search_phrase(word_list):
    words = random.sample(word_list, 2)
    phrase = ' '.join(words)
    print(f'Search phrase: "{phrase}"')
    return phrase

def make_download_options():
    return {
        'format': 'bestaudio/best',
        'paths': {'home': DOWNLOAD_DIR},
        'outtmpl': {'default': '%(id)s.%(ext)s'},
        'download_ranges': DownloadRangeFunc(),
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
        }]
    }

def make_audio(sound, output_filepath, video_title, loop=False):
    # Randomized final length between 2 and 10 seconds
    final_length = random.randint(2, 10) * 1000  # converting seconds to milliseconds

    # Short fade length (fixed at 100 milliseconds)
    fade_length = 100

    if loop:
        half = int(final_length / 2)
        beg = sound[:half]
        end = sound[half:]
        end = end[:fade_length]
        beg = beg.fade_in(duration=fade_length)
        end = end.fade_out(duration=fade_length)
        sound = beg.overlay(end)

    sound = sound[:final_length]
    sound = sound.fade_out(duration=fade_length)
    sound = effects.normalize(sound)
    sound.export(output_filepath, format="wav")

def process_file(filepath, video_title):
    try:
        filename = os.path.basename(filepath)
        output_filepath_oneshot = os.path.join(ONESHOT_OUTPUT_DIR, f'oneshot_{video_title}_{filename}')
        output_filepath_loop = os.path.join(LOOP_OUTPUT_DIR, f'loop_{video_title}_{filename}')
        
        sound = AudioSegment.from_file(filepath, "wav")
        if len(sound) > 500:
            if not os.path.exists(output_filepath_oneshot):
                make_audio(sound, output_filepath_oneshot, video_title)
            if not os.path.exists(output_filepath_loop):
                make_audio(sound, output_filepath_loop, video_title, loop=True)
        os.remove(filepath)
    except Exception as err:
        print(f"Failed to process '{filepath}' ({err})")

def setup():
    for directory in [LOOP_OUTPUT_DIR, ONESHOT_OUTPUT_DIR]:
        if not os.path.exists(directory):
            os.makedirs(directory)

def main():
    try:
        setup()
        word_list = read_lines(WORD_LIST)
        ydl = YoutubeDL(make_download_options())

        while True:
            phrase = make_random_search_phrase(word_list)
            video_url = f'ytsearch1:"{phrase}"'

            try:
                result = ydl.extract_info(video_url, download=False)
                video_title = result['entries'][0]['title']
                ydl.download([video_url])
            except Exception as download_error:
                print(f"Error downloading video {video_url}: {download_error}")

            for filepath in glob.glob(os.path.join(DOWNLOAD_DIR, '*.wav')):
                process_file(filepath, video_title)

    except Exception as err:
        print(f'FATAL ERROR: {err}')

if __name__ == '__main__':
    main()
