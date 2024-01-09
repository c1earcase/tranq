const ENEMIES = {
  "all" : [ 
    {"img_head": "media/enemy/Rochelle_Walensky/head.webm", 
     "img_hit": "media/enemy/Rochelle_Walensky/hit.webm", 
     "img_halt": "media/enemy/Rochelle_Walensky/halt.webm", 
     "word_bullets": ["don't get sick","real world data"],
     "audio": "media/enemy/Rochelle_Walensky/audio.mp3",
    },
    {"img_head": "media/enemy/Jacinda_Ardern/head.webm", 
     "img_hit": "media/enemy/Jacinda_Ardern/hit.webm", 
     "img_halt": "media/enemy/Jacinda_Ardern/halt.webm", 
     "word_bullets": ["sustained propaganda"],
     "audio": "media/enemy/Jacinda_Ardern/audio.mp3",
    },
    {"img_head": "media/enemy/Leana_Wen/head.webm", 
     "img_hit": "media/enemy/Leana_Wen/hit.webm", 
     "img_halt": "media/enemy/Leana_Wen/halt.webm", 
     "word_bullets": ["proof of vaccination","wearing masks","support the cdc"],
     "audio": "media/enemy/Leana_Wen/audio.mp3",
    },
    {"img_head": "media/enemy/Howard_Stern/head.webm", 
     "img_hit": "media/enemy/Howard_Stern/hit.webm", 
     "img_halt": "media/enemy/Howard_Stern/halt.webm", 
     "word_bullets": ["fuck their freedom","idiots","mandatory"],
     "audio": "media/enemy/Howard_Stern/audio.mp3",
    },
    {"img_head": "media/enemy/David_Leavitt/head.webm", 
     "img_hit": "media/enemy/David_Leavitt/hit.webm", 
     "img_halt": "media/enemy/David_Leavitt/halt.webm", 
     "word_bullets": ["enough is enough","make vaccines mandatory"],
     "audio": "audio/background-music.mp3",
    },
    {"img_head": "media/enemy/Piers_Morgan/head.webm", 
     "img_hit": "media/enemy/Piers_Morgan/hit.webm", 
     "img_halt": "media/enemy/Piers_Morgan/halt.webm", 
     "word_bullets": ["science is ever evolving","evolving opinions","further studies"],
     "audio": "media/enemy/Piers_Morgan/audio_v2.mp3",
    },
    {"img_head": "media/enemy/Senator_OReilly/head.webm", 
     "img_hit": "media/enemy/Senator_OReilly/hit.webm", 
     "img_halt": "media/enemy/Senator_OReilly/halt.webm", 
     "word_bullets": ["restriction of freedoms","common good"],
     "audio": "media/enemy/Senator_OReilly/audio.mp3",
    },
    {"img_head": "media/enemy/Biden_1/head.webm", 
     "img_hit": "media/enemy/Biden_1/hit.webm", 
     "img_halt": "media/enemy/Biden_1/halt.webm", 
     "word_bullets": ["protect all americans","emergency rule","fully vaccinated","fox news"],
     "audio": "media/enemy/Biden_1/audio.mp3",
    },
    {"img_head": "media/enemy/Rachel_Maddow/head.webm", 
     "img_hit": "media/enemy/Rachel_Maddow/hit.webm", 
     "img_halt": "media/enemy/Rachel_Maddow/halt.webm", 
     "word_bullets": ["restrict freedoms","virus stops","now we know"],
     "audio": "media/enemy/Rachel_Maddow/audio.mp3",
    },
  ]
}

const slogans = 
[
"We're all in this together",
"Flatten the curve",
"You may be done with the virus but the virus isn't done with you",
"New normal",
"Follow the science",
"Safe and effective",
"Pandemic of the unvaccinated",
"6 feet apart or 6 feet under",
"Staying Apart is the Best Way to Stay Connected",
"Prevention is better than ventilation"



]

function generateShuffledStack(N) {
    // Generate an array of integers from 0 to N-1
    var stack = Array.from({length: N}, (_, index) => index);

    // Shuffle the array using Fisher-Yates algorithm
    for (let i = stack.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [stack[i], stack[j]] = [stack[j], stack[i]];
    }
    return stack;
}

function preloadImage(imgUrl) {
  let img = new Image();
  img.src = imgUrl;
}

window.ENEMIES = ENEMIES;
window.generateShuffledStack = generateShuffledStack;
window.preloadImage = preloadImage;
