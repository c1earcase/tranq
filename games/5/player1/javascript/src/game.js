const _0x1aaad1=_0x2b3b;(function(_0xd7de88,_0x5cc787){const _0x2d21ad=_0x2b3b,_0x2226ff=_0xd7de88();while(!![]){try{const _0x344ac6=-parseInt(_0x2d21ad(0x1e1))/0x1*(parseInt(_0x2d21ad(0x1f3))/0x2)+parseInt(_0x2d21ad(0x1fc))/0x3*(-parseInt(_0x2d21ad(0x1f4))/0x4)+parseInt(_0x2d21ad(0x21e))/0x5+-parseInt(_0x2d21ad(0x228))/0x6*(parseInt(_0x2d21ad(0x204))/0x7)+-parseInt(_0x2d21ad(0x1fe))/0x8+-parseInt(_0x2d21ad(0x21a))/0x9*(-parseInt(_0x2d21ad(0x1e7))/0xa)+parseInt(_0x2d21ad(0x206))/0xb*(parseInt(_0x2d21ad(0x201))/0xc);if(_0x344ac6===_0x5cc787)break;else _0x2226ff['push'](_0x2226ff['shift']());}catch(_0x23e7b3){_0x2226ff['push'](_0x2226ff['shift']());}}}(_0x17da,0x65b43));const GAME_STATES={'NOT_STARTED':_0x1aaad1(0x222),'QUEUE_START':_0x1aaad1(0x20f),'RUNNING':_0x1aaad1(0x226),'PAUSED':_0x1aaad1(0x213),'ENDED':'ended'};function _0x2b3b(_0x572722,_0x59c854){const _0x17dac2=_0x17da();return _0x2b3b=function(_0x2b3be4,_0x4bc312){_0x2b3be4=_0x2b3be4-0x1e1;let _0x321137=_0x17dac2[_0x2b3be4];return _0x321137;},_0x2b3b(_0x572722,_0x59c854);}let GAME_STATE={'state':GAME_STATES[_0x1aaad1(0x218)]};function getGameState(){const _0x526f5e=_0x1aaad1;return GAME_STATE[_0x526f5e(0x219)];}function setGameState(_0x182342){const _0xc1292c=_0x1aaad1;GAME_STATE[_0xc1292c(0x219)]=_0x182342;}function _0x17da(){const _0x1e5cd7=['animationend','offsetWidth','enemy','log','className','div','left','offsetHeight','275542wFAuEN','312AkNCUP','innerHeight','right','style','audio','shoot','mousemove','top','474oFEiAf','load','3474984xlOwrp','floor','enemyShoot','12DAqcXk','player1','word-bullet\x20font-mono\x20text-xl\x20select-none','371TVqtRr','getElementById','16368605YoYzEt','hasFocus','img_halt','clientY','gameOver','RUNNING','img_hit','rate','enemyHit','queue_start','offsetTop','.enemy\x20video','height','paused','PAUSED','add','play','pop','NOT_STARTED','state','30276MPBeUD','shake','min','createElement','3717435vLWDul','getBoundingClientRect','appendChild','classList','not_started','word_bullets','addEventListener','length','running','body','92892zFfOgS','all','bottom','img_head','bullet\x20absolute\x20bottom-0\x20left-24\x20w-5\x20h-5','keys','querySelector','4KAbIsD','stop','health','click','start','remove','10WnYmXz','.enemy\x20video\x20source','focus','game'];_0x17da=function(){return _0x1e5cd7;};return _0x17da();}const DEFAULT_ENEMY_HEALTH=0x14,ENEMY_LENGTH=Object[_0x1aaad1(0x22d)](ENEMIES[_0x1aaad1(0x229)])[_0x1aaad1(0x225)],player1=document[_0x1aaad1(0x205)](_0x1aaad1(0x202)),enemy=document[_0x1aaad1(0x205)](_0x1aaad1(0x1ed)),healthBar=document['getElementById'](_0x1aaad1(0x1e3)),MAX_HEIGHT=window[_0x1aaad1(0x1f5)]-player1[_0x1aaad1(0x1f2)],STARTING_ENEMY_SPEED=0x8;var playerHealth=0xa,enemyHealth=0xa,enemyMoveInterval=0x0,enemyFireInterval=0x0,CURRENT_ENEMY_INDEX=-0x1,NEW_ENEMY_TIMEOUT=0x3e8,enemyStack=generateShuffledStack(ENEMY_LENGTH);let enemyDirection=0x1;var ENEMY_SPEED=STARTING_ENEMY_SPEED;function getEnemyIndex(){const _0x4e5699=_0x1aaad1;return enemyStack['length']===0x0&&(enemyStack=generateShuffledStack(ENEMY_LENGTH)),enemyStack[_0x4e5699(0x217)]();}function updateEnemyVid(_0x20a017){const _0x1c685c=_0x1aaad1;document[_0x1c685c(0x22e)](_0x1c685c(0x1e8))['src']=''+_0x20a017,document[_0x1c685c(0x22e)](_0x1c685c(0x211))[_0x1c685c(0x1fd)]();}const TEST_MODE=0x0;function loadNewEnemy(){const _0x58557a=_0x1aaad1;TEST_MODE==0x1?(CURRENT_ENEMY_INDEX=0x0,NEW_ENEMY_TIMEOUT=0x2710):CURRENT_ENEMY_INDEX=getEnemyIndex(),ENEMY_SPEED=0x8,enemy_config=ENEMIES[_0x58557a(0x229)][CURRENT_ENEMY_INDEX],enemyHealth=enemy_config['hasOwnProperty'](_0x58557a(0x1e3))?enemy_config['health']:DEFAULT_ENEMY_HEALTH,img_src=ENEMIES['all'][CURRENT_ENEMY_INDEX][_0x58557a(0x22b)],audio_src=ENEMIES[_0x58557a(0x229)][CURRENT_ENEMY_INDEX][_0x58557a(0x1f8)],updateEnemyVid(img_src),audio[_0x58557a(0x200)]=new Howl({'src':audio_src,'loop':!![]}),audio[_0x58557a(0x200)][_0x58557a(0x216)]();}function setIntervals(){enemyMoveInterval=setInterval(moveEnemy,0x32),enemyFireInterval=setInterval(fireWord,0x7d0);}function startGame(){const _0x43544f=_0x1aaad1;if(getGameState()===GAME_STATES['RUNNING']){}else document[_0x43544f(0x207)]()&&(setGameState(GAME_STATES['RUNNING']),setIntervals(),audio[_0x43544f(0x1e5)][_0x43544f(0x216)](),loadNewEnemy());}function moveEnemy(){const _0x376d09=_0x1aaad1,_0x25b26f=enemy['getBoundingClientRect'](),_0x305dee=document[_0x376d09(0x205)]('game')[_0x376d09(0x21f)]();let _0x157f1b=enemy[_0x376d09(0x210)]+enemyDirection*ENEMY_SPEED;(_0x157f1b<=0x0||_0x157f1b>=_0x305dee[_0x376d09(0x212)]-_0x25b26f[_0x376d09(0x212)])&&(enemyDirection*=-0x1),enemy['style'][_0x376d09(0x1fb)]=_0x157f1b+'px';}function fireWord(){const _0x1b7b82=_0x1aaad1,_0x38db30=ENEMIES[_0x1b7b82(0x229)][CURRENT_ENEMY_INDEX][_0x1b7b82(0x223)],_0x34199e=_0x38db30[Math[_0x1b7b82(0x1ff)](Math['random']()*_0x38db30[_0x1b7b82(0x225)])],_0x189a6d=document[_0x1b7b82(0x21d)](_0x1b7b82(0x1f0));_0x189a6d['textContent']=_0x34199e,_0x189a6d[_0x1b7b82(0x1ef)]=_0x1b7b82(0x203),_0x189a6d[_0x1b7b82(0x1f7)]['top']=enemy[_0x1b7b82(0x210)]+'px',document[_0x1b7b82(0x205)](_0x1b7b82(0x1ea))[_0x1b7b82(0x220)](_0x189a6d);function _0x4ebf5c(){const _0x585caf=_0x1b7b82;_0x189a6d['offsetLeft']+_0x189a6d[_0x585caf(0x1ec)]<0x0?_0x189a6d[_0x585caf(0x1e6)]():(_0x189a6d[_0x585caf(0x1f7)]['left']=_0x189a6d['offsetLeft']-0x6+'px',checkPlayerCollision(_0x189a6d),requestAnimationFrame(_0x4ebf5c));}requestAnimationFrame(_0x4ebf5c);}function checkPlayerCollision(_0x3bf8bc){const _0x1e40c9=_0x1aaad1,_0x574a63=_0x3bf8bc[_0x1e40c9(0x21f)](),_0x496050=player1[_0x1e40c9(0x21f)]();_0x574a63[_0x1e40c9(0x1f1)]<_0x496050[_0x1e40c9(0x1f6)]&&_0x574a63[_0x1e40c9(0x22a)]>_0x496050['top']&&_0x574a63[_0x1e40c9(0x1fb)]<_0x496050['bottom']&&(_0x3bf8bc[_0x1e40c9(0x1e6)](),hitPlayer());}function fireBullet(){const _0x1a2df7=_0x1aaad1;if(getGameState()===GAME_STATES[_0x1a2df7(0x20b)]){audio[_0x1a2df7(0x1f9)]['play']();const _0x133e64=document[_0x1a2df7(0x21d)](_0x1a2df7(0x1f0));_0x133e64[_0x1a2df7(0x1ef)]=_0x1a2df7(0x22c),_0x133e64[_0x1a2df7(0x1f7)][_0x1a2df7(0x1fb)]=player1[_0x1a2df7(0x210)]+0x28+'px',document[_0x1a2df7(0x205)](_0x1a2df7(0x1ea))['appendChild'](_0x133e64);function _0xfd2b27(){const _0x472178=_0x1a2df7;_0x133e64['offsetLeft']>document[_0x472178(0x227)]['clientWidth']?_0x133e64['remove']():(_0x133e64[_0x472178(0x1f7)][_0x472178(0x1f1)]=_0x133e64['offsetLeft']+0x8+'px',checkEnemyCollision(_0x133e64),requestAnimationFrame(_0xfd2b27));}requestAnimationFrame(_0xfd2b27);}}function checkEnemyCollision(_0x19f7e4){const _0x5de6d6=_0x1aaad1,_0x464325=_0x19f7e4[_0x5de6d6(0x21f)](),_0x4acd7c=enemy['getBoundingClientRect']();_0x464325['right']>_0x4acd7c['left']&&_0x464325[_0x5de6d6(0x22a)]>_0x4acd7c['top']&&_0x464325['top']<_0x4acd7c[_0x5de6d6(0x22a)]&&(_0x19f7e4[_0x5de6d6(0x1e6)](),hitEnemy());}function clearIntervals(){clearInterval(enemyMoveInterval),clearInterval(enemyFireInterval);}function endGame(){const _0x501921=_0x1aaad1;getGameState()===GAME_STATES[_0x501921(0x20b)]&&(clearIntervals(),updateEnemyVid(ENEMIES[_0x501921(0x229)][CURRENT_ENEMY_INDEX][_0x501921(0x208)]),audio[_0x501921(0x200)][_0x501921(0x1e2)](),audio[_0x501921(0x20a)][_0x501921(0x216)](),CURRENT_ENEMY_INDEX=-0x1,setGameState(GAME_STATES['QUEUE_START']),setTimeout(()=>startGame(),NEW_ENEMY_TIMEOUT));}function shakeImage(_0x5596ad){const _0x584811=_0x1aaad1;var _0x24c815=_0x5596ad;_0x24c815[_0x584811(0x221)][_0x584811(0x215)]('shake'),_0x24c815[_0x584811(0x224)](_0x584811(0x1eb),function(){const _0x5ba95b=_0x584811;_0x24c815['classList'][_0x5ba95b(0x1e6)](_0x5ba95b(0x21b));},{'once':!![]});}let isEnemyHit=![];function hitPlayer(){const _0x74996=_0x1aaad1;shakeImage(player1),playerHealth==0x1?playerHealth=0xa:playerHealth-=0x1;const _0x24b7ca=0x60-0xa*0x6;size=_0x24b7ca+playerHealth*0x6+'px',player1['style']['width']=size,player1[_0x74996(0x1f7)][_0x74996(0x212)]=size;}var restoreEnemyHeadTimeout;function hitEnemy(){const _0x5aae7f=_0x1aaad1;if(getGameState()===GAME_STATES['RUNNING']){if(enemyHealth<=0x0){endGame();return;}shakeImage(enemy),enemyHealth-=0x1,healthBar[_0x5aae7f(0x1f7)]['width']=enemyHealth/DEFAULT_ENEMY_HEALTH*0x64+'%';enemyHealth==DEFAULT_ENEMY_HEALTH/0x4&&(ENEMY_SPEED*=0x2,audio[_0x5aae7f(0x200)][_0x5aae7f(0x20d)](1.5));function _0x3637db(){const _0x54c6f7=_0x5aae7f;isEnemyHit=![];if(getGameState()===GAME_STATES[_0x54c6f7(0x20b)]){const _0x5dfe0d=ENEMIES[_0x54c6f7(0x229)][CURRENT_ENEMY_INDEX]['img_head'];updateEnemyVid(_0x5dfe0d);}}audio[_0x5aae7f(0x20e)]['play'](),!isEnemyHit&&(isEnemyHit=!![],updateEnemyVid(ENEMIES[_0x5aae7f(0x229)][CURRENT_ENEMY_INDEX][_0x5aae7f(0x20c)]),setTimeout(_0x3637db,0xc8));}}document['addEventListener'](_0x1aaad1(0x1e4),fireBullet),document[_0x1aaad1(0x224)](_0x1aaad1(0x1fa),_0x61d1c6=>{const _0x361288=_0x1aaad1;player1[_0x361288(0x1f7)]['top']=Math[_0x361288(0x21c)](_0x61d1c6[_0x361288(0x209)],MAX_HEIGHT)+'px';}),window[_0x1aaad1(0x224)]('click',()=>{const _0x24c561=_0x1aaad1;startGame(),console[_0x24c561(0x1ee)]('start!');},{'once':!![]});function pauseGame(){const _0x5a665b=_0x1aaad1;clearIntervals(),audio[_0x5a665b(0x200)]['pause']();}function resumeGame(){const _0xa1328a=_0x1aaad1;setIntervals(),audio[_0xa1328a(0x200)][_0xa1328a(0x216)]();}window[_0x1aaad1(0x224)](_0x1aaad1(0x1e9),function(){const _0x501173=_0x1aaad1;if(getGameState()===GAME_STATES['QUEUE_START'])startGame();else getGameState()===GAME_STATES[_0x501173(0x214)]&&(setGameState(GAME_STATES[_0x501173(0x20b)]),resumeGame());}),window['addEventListener']('blur',function(){const _0x130eb1=_0x1aaad1;getGameState()===GAME_STATES[_0x130eb1(0x20b)]&&(setGameState(GAME_STATES[_0x130eb1(0x214)]),pauseGame());});