import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ========================
// MYTHOLOGY DATA — 55 entries
// ========================
const mythData = [
  // ── EUROPE ──
  { id:'greek',      region:'古希腊',           title:'奥林匹斯众神',       icon:'⚡', lat:40.0, lon:22.3,
    summary:'宙斯统治奥林匹斯山，十二主神各司其职，开创西方神话之源。',
    story:'在古希腊神话中，世界从混沌（Chaos）中诞生。天神乌拉诺斯与大地女神盖亚结合，生出泰坦巨神族。宙斯率领奥林匹斯众神推翻父亲克洛诺斯，在泰坦之战后成为众神之王。十二主神各司其职：雅典娜司智慧，阿波罗驭日车，波塞冬掌海洋。英雄赫拉克勒斯完成十二试炼，奥德修斯历经十年才回到伊萨卡。' },
  { id:'norse',      region:'北欧斯堪的纳维亚', title:'诸神的黄昏',           icon:'🔨', lat:61.0, lon:8.0,
    summary:'奥丁、托尔与洛基的传说，以及诸神末日之战——Ragnarök。',
    story:'世界树尤克特拉希尔连接九大世界。众神之父奥丁倒挂世界树九天，献出一眼换取符文智慧。托尔手持妙尔尼尔神锤守护人界，诡计之神洛基先后助神后叛神。命运不可逆转——芬里尔巨狼吞噬奥丁，世界蛇与托尔同归于尽，巨人与诸神在维格里德平原决战。然而毁灭后，新世界从海中升起，巴尔德尔复活，生命再次开始。' },
  { id:'celtic',     region:'凯尔特·爱尔兰',    title:'图阿哈·德·达南',     icon:'🍀', lat:53.3, lon:-8.0,
    summary:'爱尔兰神族与失落乐土提尔纳诺格的传奇。',
    story:'图阿哈·德·达南从天空之城降临爱尔兰，带来四件神器：命运之石、光明之矛、达格达的大锅和努阿达的银手剑。他们被米列西亚人击败，退入地下王国希德，化身仙灵。英雄库丘林半神之身以一人之力守卫故土，而永恒乐土提尔纳诺格里没有死亡与衰老，时间在青春的欢笑中永远停驻。' },
  { id:'slavic',     region:'斯拉夫·俄罗斯',    title:'巴巴雅加与火鸟',     icon:'🔥', lat:55.7, lon:37.6,
    summary:'巴巴雅加女巫与火鸟传说，斯拉夫的神秘魔法世界。',
    story:'斯拉夫神话中，巴巴雅加住在鸡腿小屋，集智慧与威胁于一身。勇敢者通过她的考验，便能获得指引。传说中的火鸟（Zhar-Ptitsa）羽毛如金焰，每根都能照亮黑暗。英雄伊万必须捕获它才能拯救王国。雷神佩伦掌管风暴，黑暗之神韦莱斯统治死亡与财富，两者永恒对抗，塑造了大地的四季更迭。' },
  { id:'roman',      region:'古罗马',           title:'朱庇特与罗马诸神',   icon:'🏛️', lat:41.9, lon:12.5,
    summary:'朱庇特、战神马尔斯与罗穆卢斯创建罗马的史诗传说。',
    story:'罗马神话融合希腊传统却独具特色。朱庇特手持雷霆，是众神之主。战神马尔斯是罗马城之父，他与雷娅·西尔维亚之子罗穆卢斯和雷慕斯被狼哺育。罗穆卢斯建立罗马，成为第一位国王。爱神维纳斯、智慧女神密涅瓦、商神墨丘利共同守护这片永恒之城。' },
  { id:'germanic',   region:'日耳曼·德国',      title:'齐格弗里德与尼伯龙根', icon:'🗡️', lat:50.9, lon:10.4,
    summary:'屠龙英雄齐格弗里德与尼伯龙根宝藏的不朽传奇。',
    story:'《尼伯龙根之歌》是中世纪德语史诗。英雄齐格弗里德沐浴在龙血中刀枪不入，唯有肩胛上一片菩提树叶处是弱点。他赢得勃艮第公主克里姆希尔德，并帮助哈根获得尼伯龙根宝藏。由于后宫争执，哈根趁机刺入那唯一弱点，齐格弗里德倒下。克里姆希尔德苦等二十年终于复仇，整个王族在血与火中覆灭。' },
  { id:'finnish',    region:'芬兰',             title:'卡勒瓦拉创世',       icon:'🎵', lat:64.0, lon:26.0,
    summary:'英雄韦纳莫宁与世界从鸭蛋中诞生的芬兰民族史诗。',
    story:'芬兰史诗《卡勒瓦拉》记载，世界从天鸭在原初之海上产下的七枚蛋中诞生。英雄韦纳莫宁是诗歌与魔法之父，他用古坎特勒琴的旋律移山填海。铁匠伊尔玛利宁锻造了神奇的磨粉机"桑波"，带来无尽财富。洛希女巫统治北方黑暗王国，英雄们为夺回桑波历尽艰险。' },
  { id:'baltic',     region:'波罗的海·立陶宛',  title:'珀尔库纳斯雷神',     icon:'⛈️', lat:55.2, lon:24.0,
    summary:'波罗的海神话中的雷神珀尔库纳斯与古老的橡树崇拜。',
    story:'古立陶宛和拉脱维亚人崇拜雷神珀尔库纳斯（Perkūnas），他骑着天马，以斧劈断魔龙，维持天地秩序。农神泽米尼克斯守护丰收，命运女神莱玛以布谷鸟之声预告每人命运。橡树是神圣之树，永恒圣火在其下燃烧。波罗的海神话是欧洲最古老的信仰形态之一。' },
  { id:'basque',     region:'巴斯克·西班牙',    title:'玛丽女神与巨人',     icon:'⛰️', lat:43.0, lon:-2.0,
    summary:'巴斯克独特神话中的太阳女神玛丽与山中巨人。',
    story:'巴斯克人的神话体系在欧洲独一无二，不属于印欧语系。太阳女神玛丽（Mari）居住在山巅，她的丈夫是雷神苏加尔，外形为蛇。他们的孩子是狂暴的风暴神。山中生活着巨人洛尔图和地下侏儒拉米尼亚。巴斯克神话是欧洲前印欧文化的珍贵遗存。' },
  { id:'albanian',   region:'阿尔巴尼亚',       title:'贝萨与山鹰精神',     icon:'🦅', lat:41.3, lon:20.0,
    summary:'阿尔巴尼亚神话中的命运女神与山鹰图腾精神。',
    story:'阿尔巴尼亚神话中，命运女神佐亚在每个孩子出生时降临，编织其命运丝线。天神宰伊姆支撑苍穹，蛇形恶龙库皮是黑暗之力。英雄史诗颂扬了维持部落荣誉的"贝萨"誓言文化——一旦许诺，哪怕牺牲性命也必须履行。山鹰是民族图腾，今天依然飞翔在阿尔巴尼亚国旗之上。' },

  // ── MIDDLE EAST & CENTRAL ASIA ──
  { id:'mesopotamian', region:'美索不达米亚·伊拉克', title:'吉尔伽美什史诗', icon:'🏺', lat:32.5, lon:44.4,
    summary:'人类最古老的史诗——英雄吉尔伽美什寻找永生的旅程。',
    story:'《吉尔伽美什史诗》约公元前2100年成书于苏美尔，是人类已知最早的文学作品。乌鲁克国王吉尔伽美什三分之二神明、三分之一人类，与野人恩奇都结为挚友，共同斩杀雪松林守护者胡姆巴巴。挚友逝世后，他踏上寻访不死秘密的旅程，历尽艰辛得到不死仙草，却被蛇偷走。最终他领悟：不朽在于人类伟大的事业，而非肉体的永续。' },
  { id:'egyptian',  region:'古埃及',           title:'奥西里斯与冥界审判', icon:'𓂀', lat:30.0, lon:31.2,
    summary:'太阳神拉、冥王奥西里斯，以及亡灵的心脏称量仪式。',
    story:'太阳神拉每日驾船横越天空，夜晚与混沌巨蛇阿波菲斯激战。奥西里斯原是伟大法老，被弟弟赛特谋杀，妻子伊西斯以魔法将他复活成冥界之主。儿子荷鲁斯击败赛特，夺回王位。亡灵在冥界须经"心脏称量"仪式——若心脏比玛阿特的羽毛轻，则进入乐土；若更重，则被怪兽吞噬。这套死亡观念塑造了古埃及文明三千年。' },
  { id:'persian',   region:'波斯·伊朗',        title:'阿胡拉·马兹达与善恶之战', icon:'🔆', lat:32.4, lon:53.7,
    summary:'光明神与黑暗神的永恒对决，人类最早的善恶二元论。',
    story:'琐罗亚斯德教是世界最古老的一神论之一。光明智慧之神阿胡拉·马兹达代表善与真理，黑暗破坏之神安格拉·曼纽代表谎言与邪恶。宇宙是两种力量永恒对抗的战场，人类有自由意志选择站哪一边。英雄鲁斯塔姆是波斯最伟大的战士，他的传奇收录于菲尔多西十一世纪巨著《列王纪》，融合神话与历史，影响深远。' },
  { id:'arabic',    region:'阿拉伯·沙特',      title:'一千零一夜',         icon:'🌙', lat:24.7, lon:46.7,
    summary:'舍赫拉查德的故事魔法，辛巴达与阿拉丁的传奇世界。',
    story:'《一千零一夜》汇聚了波斯、阿拉伯、印度的故事传统。聪慧的舍赫拉查德用每夜一个故事赢得了苏丹的宽恕。水手辛巴达历经七次海上冒险；阿拉丁借魔灯召唤巨灵实现愿望；阿里巴巴喊出"芝麻开门"进入强盗宝窟。故事中的精灵（Jinn）、魔法飞毯和神秘宝藏，成为东方文化想象力的象征。' },
  { id:'turkish',   region:'突厥·土耳其',      title:'腾格里与草原诸神',   icon:'🐺', lat:38.9, lon:35.2,
    summary:'天神腾格里、祖先狼图腾，以及突厥人的萨满宇宙观。',
    story:'突厥神话以天神腾格里（Tengri）为至高神，蓝天即神明的居所。大地之母乌麦是丰收与孩童的守护神。突厥人以狼为神圣图腾——相传他们的祖先是被狼哺育的孤儿。萨满（Kam）能在不同世界间游历，与神灵沟通。英雄史诗《奥尔忽斯传》描述了英雄的冒险，是中亚草原文明的代表性文学作品。' },
  { id:'armenian',  region:'亚美尼亚',         title:'阿拉和阿拉维克',     icon:'🏔️', lat:40.2, lon:44.5,
    summary:'亚美尼亚古神话中的爱情悲剧与创世诸神。',
    story:'亚美尼亚神话融合了伊朗、希腊与本土传统。至高神阿拉玛兹德是众神之父，金发女神阿斯提克是爱与美的化身，战神瓦哈格诞生于火焰。美丽的阿拉被亚述女王沙米拉姆爱上，拒绝后遭到侵略杀害。沙米拉姆以魔法欲复活他却失败，化作百鸟哀鸣于战场。山神与龙的战争象征了亚美尼亚的地理与历史命运。' },
  { id:'georgian',  region:'格鲁吉亚',         title:'阿米拉尼与高加索',   icon:'⛓️', lat:41.7, lon:44.8,
    summary:'高加索版盗火英雄阿米拉尼与格鲁吉亚山地神话。',
    story:'格鲁吉亚有其本土版普罗米修斯——英雄阿米拉尼（Amirani）从神那里偷取火种赐予人类，被铁链锁在高加索山巅。他的巨犬每夜舔舐铁链，链条越来越细，据说当完全磨断之日，阿米拉尼将得自由，世界将翻新。格鲁吉亚神话还有守护神圣剑的传说，以及被龙劫持的公主被圣徒解救的古老故事。' },

  // ── SOUTH ASIA ──
  { id:'hindu',     region:'印度教·印度',       title:'梵天、毗湿奴与湿婆', icon:'🪷', lat:20.6, lon:78.9,
    summary:'宇宙三相神与史诗《摩诃婆罗多》《罗摩衍那》的宏大世界。',
    story:'印度神话中，梵天创造，毗湿奴维持，湿婆毁灭与重生。毗湿奴化身罗摩是史诗《罗摩衍那》主角——他与妻子悉多的爱情、与魔王罗波那的决战，成为善战胜恶的永恒象征。《摩诃婆罗多》中，克里希纳向阿周那讲述《薄伽梵歌》，揭示宇宙真理。湿婆的宇宙之舞在创造与毁灭之间维持永恒平衡。' },
  { id:'buddhist',  region:'佛教·尼泊尔',       title:'须弥山与轮回宇宙',   icon:'☸️', lat:28.3, lon:84.1,
    summary:'须弥山宇宙观、六道轮回与众多护法天神的佛教神话体系。',
    story:'佛教宇宙论中，宇宙由无数世界轮盘组成，中央是须弥山，四大洲环绕其周。生命在六道中轮回——天、阿修罗、人、畜生、饿鬼、地狱。帝释天统帅天军，四大天王守护四方。菩提萨埵们为普度众生而推迟成佛，文殊菩萨司智慧，观世音菩萨司慈悲。这套宇宙观深刻影响了亚洲数十亿人口的世界认知。' },
  { id:'dravidian', region:'泰米尔·南印度',     title:'穆鲁干战神',         icon:'🏹', lat:11.1, lon:78.7,
    summary:'泰米尔神话中的战神穆鲁干与古老的德拉维达神话传统。',
    story:'泰米尔人崇拜战神穆鲁甘（Murugan），他骑孔雀、持战矛，是美与战争的守护神，在南印度被尊为最高神。他与两位妻子的故事象征了来自天界的精神之爱和来自大地的世俗之爱的结合。南印度神话体系独立于北方的梵文传统，保留了大量古老的德拉维达崇拜形态。' },
  { id:'sikh',      region:'锡克教·旁遮普',     title:'天地合一的瓦赫古鲁', icon:'🌸', lat:31.1, lon:75.3,
    summary:'锡克教的独特神学宇宙观与圣典《古鲁·格兰特·萨希卜》。',
    story:'锡克教由古鲁那纳克（1469-1539）创立于旁遮普，融合印度教和伊斯兰教精华。至高无上的创造者瓦赫古鲁存在于万事万物之中，无形无象。十位古鲁的生命故事充满神话色彩——第五代古鲁被迫害殉道，第十代古鲁哥宾德·辛格创建圣剑勇士团，每位成员饮"甘露"圣水，化为不惧死亡的勇士。' },

  // ── EAST ASIA ──
  { id:'chinese',   region:'中国',             title:'盘古开天辟地',       icon:'🐉', lat:35.9, lon:104.2,
    summary:'盘古劈开混沌，女娲造人补天，中华文明的宇宙起源传说。',
    story:'远古之初，宇宙如一只混沌巨卵，盘古孕育其中一万八千年后挥斧劈开。清者上升为天，浊者下沉为地。盘古倒下后，气息化为风云，声音化为雷霆，左眼成太阳，右眼成月亮，身躯化为山川，血液化为江河。女娲用黄土捏人，炼五彩石补天。后羿射下九日，嫦娥奔月长居广寒宫，精卫衔石填海永不停歇。' },
  { id:'japanese',  region:'日本',             title:'天照大神与日本创世', icon:'⛩️', lat:36.2, lon:138.3,
    summary:'伊邪那岐伊邪那美创造日本列岛，天照大神隐入天岩户的传说。',
    story:'伊邪那岐和伊邪那美搅动混沌之海，滴落的盐水凝结成日本列岛。伊邪那岐从黄泉归来后洗涤污秽，左眼诞生太阳女神天照大神，右眼诞生月读命，鼻孔诞生须佐之男。须佐之男肆意妄为，天照躲入天岩户，世界陷入永夜。众神在洞口歌舞，好奇的天照推开岩户，光明重归大地。' },
  { id:'korean',    region:'韩国',             title:'檀君神话与朝鲜半岛', icon:'🐯', lat:36.5, lon:127.5,
    summary:'熊化为女人嫁给天神之子檀君，开创韩民族的神话起源。',
    story:'天神桓因之子桓雄携风伯、雨师、云师三臣下降到白头山，建立神市，传授人类农业、医术与法律。彼时有熊和虎祈求化为人形，桓雄给予它们蒜和艾草，令其百日不见阳光。虎中途放弃，熊坚持百日化为熊女。熊女与桓雄婚配，生下檀君王俭，约公元前2333年建立古朝鲜。今天的韩国人每年十月三日庆祝开天节。' },
  { id:'mongolian', region:'蒙古',             title:'腾格里与成吉思汗天命', icon:'🐎', lat:46.8, lon:103.8,
    summary:'永恒蓝天腾格里赋予成吉思汗统一草原的天命，蒙古萨满教宇宙观。',
    story:'蒙古人的"蒙古宝格达腾格里"（永恒蓝天）是最高神明，他赋予成吉思汗统一草原、征服世界的天命。铁木真统一蒙古诸部后，大萨满称其为上天之子，正式赐名成吉思汗（宇宙之王）。蒙古萨满（博）能与山神、水神及祖灵沟通，敖包（石堆祭坛）至今是祭祀天地的场所。' },
  { id:'tibetan',   region:'西藏',             title:'格萨尔王传',         icon:'🏔️', lat:29.6, lon:91.1,
    summary:'世界上最长的史诗——格萨尔王的神圣降生与征战传奇。',
    story:'《格萨尔王传》是世界上最长的史诗，超过一百二十万行，千年来以口传形式流传。英雄格萨尔是天神之子降生人间，从被家族遗弃的孤儿成长为岭国国王，一生征战魔域，保护弱小。在藏传佛教的框架里，他是莲花生大师的化身。如今世界各地仍有说唱格萨尔的艺人，被认为在神灵附体时进入恍惚状态。' },

  // ── SOUTHEAST ASIA ──
  { id:'javanese',   region:'爪哇·印度尼西亚', title:'巴塔拉·古鲁与神圣克里斯', icon:'🌋', lat:-7.6, lon:110.7,
    summary:'爪哇-巴厘岛的印度化神话，神王与克里斯短剑的灵魂力量。',
    story:'爪哇神话深受印度影响，最高神巴塔拉·古鲁（湿婆的化身）居住在神山之巅。神圣的短剑克里斯（Keris）被认为有活的灵魂，能保护主人也能为祸。巴厘岛神话中，善神与恶神每年在奥戈-奥戈节中对决——村民制作巨型纸塑恶魔游行后烧毁，象征净化。皮影戏（Wayang）是传播神话故事的重要媒介。' },
  { id:'philippine', region:'菲律宾',          title:'巴泰拉与菲律宾诸神', icon:'🐊', lat:12.9, lon:121.8,
    summary:'菲律宾原住民神话中的天神巴泰拉与各岛创世传说。',
    story:'菲律宾神话因岛屿众多而极为多元。马来人带来了宇宙分为天界、人界、地界三层的观念。上界神明巴泰拉（Bathala）创造大地，他的女儿嫁给大蛇产下星星。太阳神阿波罗托与月亮女神迪安·玛萨拉格特兄妹相争，造成日月不能同时现于天空。维萨亚斯地区的英雄史诗《阿格尤》描述了第一对人类由芦苇出生的故事。' },
  { id:'thai',       region:'泰国',            title:'拉玛坚·猴神哈努曼', icon:'🐘', lat:13.7, lon:100.5,
    summary:'泰国版印度神话史诗，托萨坎魔王与猴神哈努曼的征战传说。',
    story:'《拉玛坚》是泰国版的《罗摩衍那》，是泰国的国家级神话史诗。英雄拉玛（毗湿奴化身）的妻子西妲被十面魔王托萨坎劫走，猴神哈努曼率领猴兵大军协助营救。哈努曼能变化无穷，英勇忠诚，成为泰国文化中最受喜爱的神话英雄。故事被雕刻于曼谷玉佛寺的壁廊上，全长逾400米。' },
  { id:'vietnamese', region:'越南',            title:'龙王与仙女的子孙',   icon:'🐲', lat:16.0, lon:108.0,
    summary:'百越之祖为龙王与仙女所生，越南民族神话起源。',
    story:'越南人自称是龙子仙孙。传说中，龙王之子雒龙君娶了仙女姬嫦，生下一个百枚卵的卵囊，孵出百子。长子成为雄王，开创最早的越南王国——文郎国。另一个脍炙人口的故事是还剑湖传说：黎利王在湖中得到宝剑，用它驱逐了明朝军队后，神龟在湖中索回宝剑，任务已完成，神器应归还神明。' },
  { id:'malay',      region:'马来西亚',        title:'汉都亚英雄与森林精灵', icon:'⚓', lat:3.1, lon:101.7,
    summary:'马来民族英雄汉都亚与神秘的奥朗邦安森林精灵传说。',
    story:'汉都亚（Hang Tuah）是马来人最伟大的武士英雄，他的忠诚与武艺至今被奉为圭臬。马来神话中，精灵分为热带雨林守护者（Orang Bunian），他们美丽而危险，与人类世界并行存在。海洋精灵、河神与大地之母之间的神话关系，构建了东南亚岛屿文明最深层的世界观——人与自然的边界是模糊的。' },
  { id:'burmese',    region:'缅甸',            title:'纳特神灵崇拜',       icon:'🌺', lat:19.7, lon:96.1,
    summary:'缅甸三十七尊纳特神灵与独特的本土信仰体系。',
    story:'缅甸的纳特（Nat）崇拜是独特的本土宗教，三十七位官方认可的纳特神灵大多是历史人物死于非命后成神。民间每年举行盛大的纳特祭典，萨满女巫会被神灵附体起舞。最著名的纳特之一是王子马哈吉里，他被国王杀害后化为守护家宅的神灵。纳特信仰与佛教共存于缅甸社会，形成独特的宗教双轨体系。' },

  // ── NORTH/CENTRAL ASIA ──
  { id:'siberian',  region:'西伯利亚·萨满',    title:'世界树与萨满飞行',   icon:'🦅', lat:62.0, lon:105.0,
    summary:'西伯利亚萨满教的宇宙树与灵魂旅行，人类最古老的宗教形态之一。',
    story:'西伯利亚萨满教将宇宙分为三界：上界是神明与灵鸟居所，中界是人类大地，下界是亡灵领域。连接三界的是宇宙世界树。萨满在鼓声催眠下进入恍惚状态，灵魂飞离肉体游历三界，与神灵交涉以治病或猎获。"Shaman"一词本来就是通古斯语。西伯利亚原住民雅库特人、鄂温克人的熊图腾崇拜，至今仍在北方森林中传承。' },
  { id:'kazakh',    region:'哈萨克斯坦',       title:'英雄阿尔帕米斯',     icon:'🦁', lat:48.0, lon:68.0,
    summary:'中亚草原英雄史诗阿尔帕米斯与哈萨克人的草原神话传统。',
    story:'哈萨克民族英雄史诗《阿尔帕米斯》讲述了草原英雄为拯救被掳走的妻子和部族，历经重重险阻的故事。他被囚七年后重返故乡，杀死仇人，恢复秩序。哈萨克神话还有英雄科布兰德骑着会说话的神马泰布里尔，与强敌展开殊死之战的故事。腾格里的天命、祖先的灵魂构成了哈萨克游牧民族的精神世界。' },

  // ── AFRICA ──
  { id:'yoruba',    region:'约鲁巴·尼日利亚',  title:'奥里沙众神与命运',   icon:'🥁', lat:7.5, lon:4.5,
    summary:'西非约鲁巴人的诸神奥里沙与命运之神奥鲁米拉的奥义体系。',
    story:'约鲁巴神话中，最高神奥洛杜玛雷通过中间神奥巴塔拉创造了人类形体，再赋予生命。雷电神尚戈是历史上真实存在过的奥约帝国国王，死后封神。爱与河流女神奥逊（Oshun）美丽而强大，当众神的计划失败时，只有奥逊被邀请才能解决困局。这套奥里沙神系随奴隶贸易传至美洲，演变为桑特利亚、坎东布雷等宗教，影响了数千万人。' },
  { id:'akan',      region:'阿散蒂·加纳',      title:'安纳西蜘蛛神',       icon:'🕸️', lat:6.7, lon:-1.6,
    summary:'掌管世间所有故事的蜘蛛神安纳西，西非最著名的神话形象之一。',
    story:'在加纳阿坎族神话中，安纳西（Anansi）是智慧蜘蛛，也是故事之主。所有故事曾被天神尼亚梅锁藏。安纳西提出交换条件，用机智捕获胡蜂、蟒蛇和豹子，赢得了人间所有的故事。安纳西的智慧故事随大西洋奴隶贸易传至加勒比和北美，演变为美国南方黑人故事文化的原型，至今在牙买加口述传统中鲜活流传。' },
  { id:'zulu',      region:'祖鲁·南非',        title:'安库鲁鲁与祖鲁创世', icon:'🌾', lat:-28.3, lon:30.7,
    summary:'祖鲁人的创世之神安库鲁鲁从芦苇中出现，开创人类文明。',
    story:'祖鲁创世神话中，安库鲁鲁（Unkulunkulu）从原初芦苇丛中出现，他把人、动物和植物从芦苇中拔出，创造了现实世界。他教导人们生火、耕种、建造，给予人类所有的知识。他派遣变色龙传递"人将永生"的消息，但变色龙走得太慢；蜥蜴先到传递"人将死亡"——于是人类有了死亡。祖鲁人相信祖先的灵魂持续存在并保护生者。' },
  { id:'dogon',     region:'多贡·马里',        title:'多贡天文神话',       icon:'⭐', lat:14.4, lon:-3.0,
    summary:'西非多贡人关于天狼星双星系统的惊人神话宇宙观。',
    story:'马里多贡人的神话令现代天文学家震惊——他们在没有望远镜的情况下，神话中就记录了天狼星有一颗伴星（天狼星B），并准确描述了其运行周期约50年。他们说这一知识来自诺摩神（Nommo）——从天上降临的两栖人形存在，他们来自天狼星系。多贡创世神话中，阿玛神创造宇宙，但最初的受孕不完美，造成了世间的混乱与死亡。' },
  { id:'san',       region:'布须曼·博茨瓦纳',  title:'卡根蜘蛛创世',       icon:'🦛', lat:-22.3, lon:24.7,
    summary:'南非最古老的民族布须曼人的神话，月亮、死亡与蜘蛛的哲学。',
    story:'布须曼人（桑人）是地球上最古老的人类群体之一。半人半螳螂的神明卡根（Kaggen）是宇宙的创造者，他从旧鞋底创造了月亮，又用沙尘创造了彩虹。死亡在桑人神话中是可以逆转的——月亮死去又复生，象征所有生命的循环。岩画记录了萨满在恍惚状态下所见的幻象，这可能是人类最早的宗教艺术，超过六万五千年历史。' },
  { id:'malagasy',  region:'马达加斯加',        title:'扎那哈里与第一批人类', icon:'🦎', lat:-18.8, lon:46.9,
    summary:'马达加斯加的创世神话，天神与大地之神共同创造人类的传说。',
    story:'马达加斯加的马尔加什神话将宇宙分为天神扎那哈里（Zanahary）和大地之神拉提亚纳纳哈里。他们共同合作创造了人类：地神从大地塑造出人形泥偶，但无法赋予生命；天神注入生命，但要求人死后灵魂归还给他。岛屿的独特生态——狐猴、变色龙、猴面包树——在神话中都有相应的守护神灵和禁忌（Fady）。' },

  // ── AMERICAS ──
  { id:'aztec',     region:'阿兹特克·墨西哥',  title:'五个太阳纪元',       icon:'🌞', lat:19.4, lon:-99.1,
    summary:'诸神自我牺牲点燃宇宙，太阳需要人类心脏才能升起的史诗传说。',
    story:'阿兹特克神话中，世界经历了四个太阳纪元，每个都以灾难告终。诸神在特奥蒂瓦坎聚集，最弱小的神纳纳瓦特辛勇敢跃入熊熊烈火，化身第五个太阳。但太阳需要血液为食才能每日升起——这便是阿兹特克祭祀的神话根源。羽蛇神奎查尔科亚特尔曾教导人类农业和历法，后被对手迫走，誓言将从东方海上归来。西班牙征服者到来时，历史与神话在此交汇。' },
  { id:'mayan',     region:'玛雅·危地马拉',    title:'波波尔·乌与玉米人', icon:'🌽', lat:15.8, lon:-90.2,
    summary:'玛雅创世圣典——神明用玉米创造人类，英雄双胞胎的冥界之旅。',
    story:'《波波尔·乌》记载了玛雅创世神话。多次造人失败后——泥人无法站立，木人无灵魂——神明最终用白色和黄色的玉米制成了真正的人类，玉米因此成为生命与人性的象征。英雄双胞胎胡纳普和克斯巴兰克跌入死亡之地西巴尔巴，在那里击败了死亡神，奠定了英雄战胜死亡的主题。奇琴伊察春秋分时的蛇影奇观，是玛雅天文学与建筑学的绝妙结合。' },
  { id:'inca',      region:'印加·秘鲁',        title:'维拉科查与太阳帝国', icon:'🦙', lat:-13.5, lon:-72.0,
    summary:'印加帝国的创世神维拉科查与太阳神因蒂，黄金权杖的故事。',
    story:'印加神话中，宇宙创造者维拉科查从的的喀喀湖升起，创造了太阳、月亮和星星，再创造了人类。太阳神因蒂是印加皇帝的父神，皇帝被称为"因蒂之子"，是地球上太阳的代理人。传说中第一位印加国王曼科·卡帕克和他的姐妹妻子玛玛·奥克略被因蒂送到人间，手持黄金权杖，命令他们在权杖插入大地之处建城——这就是库斯科的起源。' },
  { id:'navajo',    region:'纳瓦霍·美国西南',  title:'彩虹之路与第五世界', icon:'🌈', lat:36.1, lon:-108.7,
    summary:'纳瓦霍人的创世旅程——从第一世界爬升到第五世界的神话。',
    story:'纳瓦霍神话描述人类从第一个地下黑暗世界，历经水灾和混乱，逐层攀升，最终进入第五世界（现实世界）。第一男人和第一女人是祖先神明，他们与蜘蛛祖母一起教导人类。圣山（Sacred Mountains）标志着纳瓦霍土地的四个方向。沙画（Sand Painting）是治愈仪式中重现神话叙事的神圣艺术，这一传统在美国西南沙漠中传承了数千年。' },
  { id:'iroquois',  region:'易洛魁·美国东北',  title:'天女与大地龟背',     icon:'🐢', lat:42.8, lon:-76.1,
    summary:'天女坠落在乌龟背上，万物从此生长的易洛魁创世神话。',
    story:'易洛魁（Haudenosaunee）创世神话中，天女不小心从宇宙大树旁坠落到下界的无尽海洋。水鸟用翅膀托住她，麝鼠带回泥土堆在大乌龟背上，天女在其上蹬踏，大地由此形成。天女生下双胞胎——善神与恶神，两者之间的永恒对立创造了光明与黑暗的世界秩序。易洛魁联盟的政治模式据说启发了美国宪法的部分设计。' },
  { id:'lakota',    region:'拉科塔·北美草原',  title:'大灵与白水牛女',     icon:'🦬', lat:43.6, lon:-100.3,
    summary:'拉科塔苏族的大灵信仰与白水牛女带来圣烟斗的故事。',
    story:'拉科塔人的宇宙观以瓦坎·腾卡（Wakan Tanka，大灵）为核心，万物皆有灵性。白水牛女（White Buffalo Calf Woman）是神圣使者，她带来神圣的圣烟斗，教导族人七大仪式，将人类与宇宙万物相连。每隔数百年，白色水牛的降生被视为圣迹显现。太阳舞（Sun Dance）是最神圣的仪式，战士在痛苦中寻求幻象和神明的指引。' },
  { id:'haida',     region:'海达·加拿大西海岸', title:'乌鸦盗来光明',      icon:'🦅', lat:53.1, lon:-131.5,
    summary:'乌鸦这一太平洋西北海岸的神圣骗术家，为人类盗来光明的传说。',
    story:'海达人和太平洋西北岸的原住民崇拜乌鸦（Raven）作为创世者和恶作剧者。最初世界一片黑暗，一位老者将太阳、月亮和星星藏在盒子里。乌鸦化为婴儿被老者收养，借机偷出盒子，飞向天空，将光明释放到世界。图腾柱是这些神话故事的三维文字，每一个雕刻都记录着家族的神圣历史与祖先的神话。' },
  { id:'amazonian', region:'亚马逊·巴西',      title:'库鲁皮拉与雨林精灵', icon:'🌿', lat:-3.7, lon:-62.2,
    summary:'守护亚马逊雨林的脚跟倒长的精灵库鲁皮拉，巴西本土神话传说。',
    story:'亚马逊原住民神话中，雨林中住着无数守护精灵。库鲁皮拉（Curupira）脚跟向前、脚趾向后，以此迷惑猎人，保护动物不被过度猎杀。巨蛇博托在月夜化为英俊男子引诱女性，被认为是河流之灵。母亲河神伊亚拉（Iara）是上半身美女、下半身鱼的美人鱼，吟唱着令人沉迷的歌声将男人拉入水底。这些神话至今在亚马逊流域小镇中口耳相传。' },
  { id:'caribbean', region:'海地·加勒比',      title:'伏都与洛瓦神灵',     icon:'🥁', lat:18.9, lon:-72.3,
    summary:'海地伏都教中的洛瓦神灵，非洲约鲁巴信仰在美洲的传承与变形。',
    story:'海地伏都（Vodou）是西非约鲁巴、丰族信仰在加勒比奴隶文化中的演变。洛瓦（Lwa）是神灵与人类之间的中间使者，每位洛瓦都有自己的颜色、食物、性格与仪式。奥贡（Ogou）是战神与铁神，象征革命力量；埃尔祖利·弗雷达是爱与奢华女神；死亡使者格德头戴大礼帽，口叼雪茄，以幽默面对死亡。海地独立革命（1804）本身就带有伏都宗教的神话色彩。' },
  { id:'mapuche',   region:'马普切·智利',      title:'大洪水与蛇神之战',   icon:'🌊', lat:-38.5, lon:-72.7,
    summary:'智利马普切人的蛇神与大洪水神话，以及不屈的战士文化。',
    story:'马普切神话中，宇宙由两条巨蛇的对决维系——陆地蛇图恩与海洋蛇开-凯的争斗造成大洪水，幸存者逃到山顶才得以存活。玛坤（Machi，女萨满）是马普切社会的神圣治愈者，她通过鼓击和致幻植物进入神界，为病人的灵魂争取生机。马普切人是西班牙征服者唯一未能彻底征服的南美洲大型民族，他们的战神与神话支撑了数百年的抵抗。' },
  { id:'guarani',   region:'瓜拉尼·巴拉圭',    title:'南帕和世界之心',     icon:'🌙', lat:-23.4, lon:-58.4,
    summary:'瓜拉尼人的神话宇宙观，月亮与森林的神圣关系。',
    story:'瓜拉尼人是南美洲最重要的原住民族之一。他们的创世神是南帕（Amandú），他从自己的心中创造出第一缕光，又从光中创造出大地。月亮神卡雷与太阳神共同守护时间的流逝。英雄孪生兄弟的神话在瓜拉尼、玛雅和阿兹特克中广泛存在，暗示了前哥伦布时代美洲各文明之间深远的神话联系。' },

  // ── OCEANIA ──
  { id:'maori',     region:'毛利·新西兰',      title:'毛伊捕获太阳',       icon:'🪝', lat:-40.9, lon:174.9,
    summary:'毛利半神英雄毛伊套住太阳，为人类赢得更长白昼的传说。',
    story:'毛利人的毛伊（Maui）是最受爱戴的半神英雄。他用祖母的下颌骨编成绳索，套住了急速奔跑的太阳，将它痛打一顿，迫使太阳慢行，白昼从此变长。毛伊还用钓钩从海底钓出了北岛——在毛利语中，北岛至今仍叫"毛伊的大鱼"（Te Ika-a-Maui）。他最后一次冒险是试图进入黑暗之母体内以获得永生，但在蜥蜴的嘲笑声中被她杀死——于是人类有了死亡。' },
  { id:'hawaiian',  region:'夏威夷·美国',      title:'火山女神培雷',       icon:'🌋', lat:19.5, lon:-155.5,
    summary:'夏威夷火山女神培雷与她兄弟的爱恨情仇，以及波利尼西亚创世神明。',
    story:'夏威夷神话中，火山女神培雷（Pele）居住在基拉韦厄火山口，掌管所有的熔岩和火焰。她与海洋之神的战争，象征火与水的永恒对立。四大神——卡内（创造）、库（战争）、洛诺（农业）、卡纳罗阿（海洋）共同维持世界。《库穆里波》创世颂诗记录了从黑暗中诞生的漫长进化过程。波利尼西亚人靠着星象导航和神话中的"祖先故土"哈瓦基的指引，发现并殖民了太平洋每一个可居住岛屿。' },
  { id:'aboriginal', region:'澳大利亚原住民',  title:'梦世纪与歌之线路',   icon:'🦘', lat:-25.3, lon:133.8,
    summary:'澳大利亚原住民的"梦世纪"创世观，祖灵之歌织成的神圣大地。',
    story:'澳大利亚原住民神话中，"梦世纪"（Dreamtime）是超越时间的创世时代，也是永恒存在的精神实相。在这个时代，彩虹蛇（Rainbow Serpent）从大地中苏醒，游走并塑造了河流、山脉和峡谷。祖灵们唱出"歌之线路"（Songlines），将整个澳大利亚大陆编织成一张无形的神圣地图。每一座山、每一块岩石都有其神圣故事。原住民的仪式舞蹈、岩石绘画，是联结当代人与梦世纪的永恒纽带——这是地球上延续时间最长的宗教传统，超过六万五千年。' },
  { id:'papua',     region:'巴布亚新几内亚',   title:'阿斯马特的祖先雕刻', icon:'🗿', lat:-6.3, lon:143.9,
    summary:'巴布亚新几内亚阿斯马特人的祖先崇拜与神秘神话。',
    story:'巴布亚新几内亚约有800种语言，每个部落都有独特神话。阿斯马特人是著名的木雕师，相信祖先的灵魂居住在他们雕刻的象征性柱子中，必须通过猎头仪式为逝去祖先复仇，灵魂才能安息。塞皮克河流域的高腾族神话描述了宇宙从神秘的"母亲水"中诞生，男性割礼仪式象征从神话始祖的肚中被"重生"。' },
  { id:'samoa',     region:'萨摩亚',           title:'塔加洛阿创世',       icon:'🌊', lat:-13.8, lon:-172.0,
    summary:'萨摩亚天神塔加洛阿（波利尼西亚的最高神）从黑暗中创造宇宙。',
    story:'萨摩亚神话中，塔加洛阿（Tagaloa）是至高的创造神，他最初孤独地存在于黑暗虚空中，用意志创造了岩石、海洋和天空。他创造的蠕虫进化成了人类（这一神话与进化论的巧合令人惊叹）。萨摩亚社会组织基于阿依加（Aiga）家族制度，家族守护神从祖先中诞生，通过图腾动物与后代沟通。著名的萨摩亚纹身是将神话故事铭刻在人体上的神圣仪式，展示着一个人与祖先和神话的连接。' },
  { id:'fijian',    region:'斐济',             title:'德吉蛇神与冥界',     icon:'🐍', lat:-17.7, lon:178.1,
    summary:'斐济最高神德吉（Degei）以蛇形出现，审判亡灵进入天堂或惩罚之所。',
    story:'斐济神话中，至高神德吉（Degei）是一条巨蛇，是宇宙的创造者与审判者。他在神山（Nakauvadra Mountain）中沉睡，每当他翻身就引发地震。亡灵死后必须在德吉面前接受审判，被送入天堂（Burotu）或打入深湖惩罚。斐济还有丰富的海洋神话——大鲨鱼之神保护渔民，珊瑚礁守护者管理海底世界。' },

  // ── ARCTIC ──
  { id:'inuit',     region:'因纽特·北极',      title:'海洋女神塞德纳',     icon:'🌊', lat:68.4, lon:-95.6,
    summary:'手指化为海洋生物的塞德纳女神，是因纽特猎人最重要的庇护神。',
    story:'因纽特神话中，塞德纳（Sedna）被父亲抛入寒海，抓船边时手指被砍断，沉入海底化为掌管北冰洋的女神。她的手指化成了海豹、海象和鲸鱼——因此猎人必须向她祈祷。萨满在灵魂旅行中下潜拜访塞德纳，梳理她纠缠的头发，换取丰收的猎物。因纽特神话中，北极光是亡灵玩球的光影，熊既是猎物又是具有人性的存在。' },
  { id:'sami',      region:'萨米·斯堪的纳维亚北部', title:'萨米人的祖灵与驯鹿', icon:'🦌', lat:68.0, lon:25.0,
    summary:'斯堪的纳维亚原住民萨米人的萨满神话与驯鹿的神圣意义。',
    story:'萨米人是北欧最古老的民族之一，其神话独立于北欧维京神话之外。萨米萨满（Noaidi）使用圣鼓上绘制的宇宙地图进行仪式，鼓击声将萨满的灵魂送往灵界与神明交涉。驯鹿是神圣动物，萨米宇宙分为三界。太阳女神贝维（Beiwe）是最重要的神明，冬至祭典向她祈求光明归来和牧场丰美。' },
];

// ========================
// THEME & SCENE
// ========================
const getTheme = () => {
  const t = document.documentElement.getAttribute('data-theme');
  return t === 'dark' || (!t && matchMedia('(prefers-color-scheme:dark)').matches) ? 'dark' : 'light';
};
const getAccentColor = () => getTheme() === 'dark' ? 0xd4a54a : 0xa67c2e;

const canvas    = document.getElementById('globe-canvas');
const container = canvas.parentElement;
let width  = container.clientWidth  || 560;
let height = container.clientHeight || 560;

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.z = 3.2;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(width, height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping  = true;
controls.dampingFactor  = 0.05;
controls.enablePan      = false;
controls.minDistance    = 1.8;
controls.maxDistance    = 5;
controls.autoRotate     = true;
controls.autoRotateSpeed = 0.35;

// ========================
// LIGHTS
// ========================
// Sun light — gives directional shading for day/night terminator feel
const sunLight = new THREE.DirectionalLight(0xfff4e8, 2.0);
sunLight.position.set(6, 2, 4);
scene.add(sunLight);

// Ambient — faint fill so night side isn't pure black
scene.add(new THREE.AmbientLight(0x111122, 0.6));

// ========================
// TEXTURE LOADER
// ========================
const loader = new THREE.TextureLoader();

// We bundle the textures locally (downloaded into /textures/)
const earthDayTex  = loader.load('./textures/earth_day.jpg');
const earthNightTex = loader.load('./textures/earth_night.jpg');
const earthCloudTex = loader.load('./textures/earth_clouds.jpg');

earthDayTex.colorSpace   = THREE.SRGBColorSpace;
earthNightTex.colorSpace = THREE.SRGBColorSpace;

// ========================
// EARTH — Custom GLSL Shader (day/night mix + specular water)
// ========================
const EARTH_VERT = /* glsl */`
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vUv      = uv;
    vNormal  = normalize(normalMatrix * normal);
    vec4 wp  = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const EARTH_FRAG = /* glsl */`
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform vec3      uSunDir;
  uniform float     uTime;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3  N   = normalize(vNormal);
    vec3  sun = normalize(uSunDir);
    float NdL = dot(N, sun);

    // Day/night colour
    vec3 dayCol   = texture2D(uDay,   vUv).rgb;
    vec3 nightCol = texture2D(uNight, vUv).rgb;

    // Smooth terminator: -0.1 → 0.1
    float blend = smoothstep(-0.1, 0.15, NdL);
    vec3  color = mix(nightCol * 0.85, dayCol, blend);

    // Simple Phong specular on ocean (heuristic: dark green/blue = ocean)
    float ocean = 1.0 - smoothstep(0.0, 0.3,
                    max(dayCol.r - dayCol.b, 0.0) + max(dayCol.g - dayCol.b, 0.0) * 0.5);
    vec3  viewDir = normalize(cameraPosition - vWorldPos);
    vec3  halfV   = normalize(sun + viewDir);
    float spec    = pow(max(dot(N, halfV), 0.0), 64.0) * ocean * max(NdL, 0.0) * 1.5;
    color += vec3(spec * 0.7, spec * 0.85, spec);

    // Subtle atmosphere limb tint on day side
    float fresnel = 1.0 - max(dot(N, viewDir), 0.0);
    float atmBlend = smoothstep(0.6, 1.0, fresnel);
    vec3 atmColor  = vec3(0.3, 0.55, 1.0);
    color = mix(color, atmColor, atmBlend * 0.35 * blend);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const earthMat = new THREE.ShaderMaterial({
  vertexShader:   EARTH_VERT,
  fragmentShader: EARTH_FRAG,
  uniforms: {
    uDay:    { value: earthDayTex  },
    uNight:  { value: earthNightTex },
    uSunDir: { value: new THREE.Vector3(6, 2, 4).normalize() },
    uTime:   { value: 0 },
  },
});
const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(1.0, 64, 64), earthMat);
scene.add(earthMesh);

// ========================
// CLOUDS — separate sphere, slightly larger, additive blending
// ========================
const CLOUD_VERT = /* glsl */`
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  void main(){
    vUv     = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const CLOUD_FRAG = /* glsl */`
  uniform sampler2D uCloud;
  uniform vec3      uSunDir;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main(){
    vec3  N   = normalize(vNormal);
    vec3  sun = normalize(uSunDir);
    float NdL = max(dot(N, sun), 0.0);

    float alpha = texture2D(uCloud, vUv).r;  // red channel = cloud density
    // Dim clouds on night side
    float lit = mix(0.08, 1.0, smoothstep(-0.05, 0.2, dot(N, sun)));

    gl_FragColor = vec4(vec3(0.97, 0.97, 1.0) * lit, alpha * 0.72);
  }
`;

const cloudMat = new THREE.ShaderMaterial({
  vertexShader:   CLOUD_VERT,
  fragmentShader: CLOUD_FRAG,
  uniforms: {
    uCloud:  { value: earthCloudTex },
    uSunDir: { value: new THREE.Vector3(6, 2, 4).normalize() },
  },
  transparent: true,
  side: THREE.FrontSide,
  depthWrite: false,
});
const cloudMesh = new THREE.Mesh(new THREE.SphereGeometry(1.005, 64, 64), cloudMat);
scene.add(cloudMesh);

// ========================
// ATMOSPHERE GLOW (Fresnel shader on back-face sphere)
// ========================
const ATM_VERT = /* glsl */`
  varying vec3 vNormal;
  void main(){
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const ATM_FRAG = /* glsl */`
  varying vec3 vNormal;
  void main(){
    float i = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
    gl_FragColor = vec4(0.22, 0.55, 1.0, 1.0) * i * 0.6;
  }
`;
const atmosphereMat = new THREE.ShaderMaterial({
  vertexShader: ATM_VERT, fragmentShader: ATM_FRAG,
  blending: THREE.AdditiveBlending, side: THREE.BackSide, transparent: true,
});
scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.14, 64, 64), atmosphereMat));

// ========================
// COUNTRY BORDERS (TopoJSON)
// ========================
const COUNTRY_CONTINENT = {
  ALB:'Europe',AND:'Europe',AUT:'Europe',BLR:'Europe',BEL:'Europe',BIH:'Europe',BGR:'Europe',HRV:'Europe',CZE:'Europe',DNK:'Europe',EST:'Europe',FIN:'Europe',FRA:'Europe',DEU:'Europe',GRC:'Europe',HUN:'Europe',ISL:'Europe',IRL:'Europe',ITA:'Europe',XKX:'Europe',LVA:'Europe',LIE:'Europe',LTU:'Europe',LUX:'Europe',MLT:'Europe',MDA:'Europe',MCO:'Europe',MNE:'Europe',NLD:'Europe',MKD:'Europe',NOR:'Europe',POL:'Europe',PRT:'Europe',ROU:'Europe',RUS:'Europe',SMR:'Europe',SRB:'Europe',SVK:'Europe',SVN:'Europe',ESP:'Europe',SWE:'Europe',CHE:'Europe',UKR:'Europe',GBR:'Europe',VAT:'Europe',KOS:'Europe',
  AFG:'Asia',ARM:'Asia',AZE:'Asia',BHR:'Asia',BGD:'Asia',BTN:'Asia',BRN:'Asia',KHM:'Asia',CHN:'Asia',GEO:'Asia',IND:'Asia',IDN:'Asia',IRN:'Asia',IRQ:'Asia',ISR:'Asia',JPN:'Asia',JOR:'Asia',KAZ:'Asia',KWT:'Asia',KGZ:'Asia',LAO:'Asia',LBN:'Asia',MYS:'Asia',MDV:'Asia',MNG:'Asia',MMR:'Asia',NPL:'Asia',PRK:'Asia',OMN:'Asia',PAK:'Asia',PHL:'Asia',QAT:'Asia',SAU:'Asia',SGP:'Asia',KOR:'Asia',LKA:'Asia',SYR:'Asia',TWN:'Asia',TJK:'Asia',THA:'Asia',TLS:'Asia',TUR:'Asia',TKM:'Asia',ARE:'Asia',UZB:'Asia',VNM:'Asia',YEM:'Asia',PSE:'Asia',
  DZA:'Africa',AGO:'Africa',BEN:'Africa',BWA:'Africa',BFA:'Africa',BDI:'Africa',CPV:'Africa',CMR:'Africa',CAF:'Africa',TCD:'Africa',COM:'Africa',COG:'Africa',COD:'Africa',DJI:'Africa',EGY:'Africa',GNQ:'Africa',ERI:'Africa',SWZ:'Africa',ETH:'Africa',GAB:'Africa',GMB:'Africa',GHA:'Africa',GIN:'Africa',GNB:'Africa',CIV:'Africa',KEN:'Africa',LSO:'Africa',LBR:'Africa',LBY:'Africa',MDG:'Africa',MWI:'Africa',MLI:'Africa',MRT:'Africa',MUS:'Africa',MAR:'Africa',MOZ:'Africa',NAM:'Africa',NER:'Africa',NGA:'Africa',RWA:'Africa',STP:'Africa',SEN:'Africa',SLE:'Africa',SOM:'Africa',ZAF:'Africa',SSD:'Africa',SDN:'Africa',TZA:'Africa',TGO:'Africa',TUN:'Africa',UGA:'Africa',ZMB:'Africa',ZWE:'Africa',
  ATG:'North America',BHS:'North America',BRB:'North America',BLZ:'North America',CAN:'North America',CRI:'North America',CUB:'North America',DMA:'North America',DOM:'North America',SLV:'North America',GRD:'North America',GTM:'North America',HTI:'North America',HND:'North America',JAM:'North America',MEX:'North America',NIC:'North America',PAN:'North America',KNA:'North America',LCA:'North America',VCT:'North America',TTO:'North America',USA:'North America',
  ARG:'South America',BOL:'South America',BRA:'South America',CHL:'South America',COL:'South America',ECU:'South America',GUY:'South America',PRY:'South America',PER:'South America',SUR:'South America',URY:'South America',VEN:'South America',
  AUS:'Oceania',FJI:'Oceania',KIR:'Oceania',MHL:'Oceania',FSM:'Oceania',NRU:'Oceania',NZL:'Oceania',PLW:'Oceania',PNG:'Oceania',WSM:'Oceania',SLB:'Oceania',TON:'Oceania',TUV:'Oceania',VUT:'Oceania',
  ATA:'Antarctica',
};

function latLonToVec3(lat, lon, r = 1.005) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta)
  );
}

// Country BORDERS only — thin white/gold lines on top of photo texture
const bordersGroup = new THREE.Group();
scene.add(bordersGroup);

function buildBorderLine(ring) {
  if (ring.length < 2) return null;
  const pts = ring.map(([lon, lat]) => latLonToVec3(lat, lon, 1.007));
  const geo  = new THREE.BufferGeometry().setFromPoints(pts);
  const mat  = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22 });
  return new THREE.Line(geo, mat);
}

function topoToGeo(topology, o) {
  const arcs = topology.arcs;
  const scale = topology.transform ? topology.transform.scale : [1, 1];
  const translate = topology.transform ? topology.transform.translate : [0, 0];

  function decodeArc(idx) {
    const rev = idx < 0;
    const arc = arcs[rev ? ~idx : idx];
    let x = 0, y = 0;
    const pts = arc.map(([dx, dy]) => {
      x += dx; y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
    return rev ? pts.reverse() : pts;
  }
  function decodeRing(ring) {
    const c = []; ring.forEach(i => c.push(...decodeArc(i))); return c;
  }
  return {
    type: 'FeatureCollection',
    features: o.geometries.map(geom => {
      let coords;
      if (geom.type === 'Polygon')      coords = geom.arcs.map(decodeRing);
      else if (geom.type === 'MultiPolygon') coords = geom.arcs.map(p => p.map(decodeRing));
      else coords = [];
      return { type:'Feature', id: geom.id, geometry:{ type: geom.type, coordinates: coords } };
    })
  };
}

function numericToA3(id) {
  const n = parseInt(id);
  const map = {
    4:'AFG',8:'ALB',12:'DZA',24:'AGO',32:'ARG',36:'AUS',40:'AUT',50:'BGD',56:'BEL',64:'BTN',
    68:'BOL',76:'BRA',100:'BGR',104:'MMR',116:'KHM',120:'CMR',124:'CAN',140:'CAF',152:'CHL',
    156:'CHN',170:'COL',180:'COD',188:'CRI',192:'CUB',203:'CZE',208:'DNK',218:'ECU',818:'EGY',
    222:'SLV',231:'ETH',246:'FIN',250:'FRA',276:'DEU',288:'GHA',300:'GRC',320:'GTM',332:'HTI',
    340:'HND',348:'HUN',356:'IND',360:'IDN',364:'IRN',368:'IRQ',372:'IRL',376:'ISR',380:'ITA',
    388:'JAM',392:'JPN',400:'JOR',398:'KAZ',404:'KEN',408:'PRK',410:'KOR',414:'KWT',418:'LAO',
    422:'LBN',434:'LBY',484:'MEX',504:'MAR',508:'MOZ',516:'NAM',524:'NPL',528:'NLD',
    554:'NZL',558:'NIC',566:'NGA',578:'NOR',586:'PAK',591:'PAN',598:'PNG',600:'PRY',604:'PER',
    608:'PHL',616:'POL',620:'PRT',634:'QAT',642:'ROU',643:'RUS',646:'RWA',682:'SAU',
    686:'SEN',694:'SLE',706:'SOM',710:'ZAF',724:'ESP',144:'LKA',729:'SDN',752:'SWE',756:'CHE',
    760:'SYR',762:'TJK',764:'THA',792:'TUR',800:'UGA',804:'UKR',784:'ARE',826:'GBR',840:'USA',
    858:'URY',860:'UZB',862:'VEN',704:'VNM',887:'YEM',894:'ZMB',716:'ZWE',
    659:'KNA',662:'LCA',670:'VCT',780:'TTO',44:'BHS',52:'BRB',214:'DOM',
    72:'BWA',90:'SLB',96:'BRN',703:'SVK',705:'SVN',191:'HRV',233:'EST',428:'LVA',440:'LTU',
    112:'BLR',498:'MDA',807:'MKD',688:'SRB',70:'BIH',499:'MNE',
    31:'AZE',268:'GEO',51:'ARM',795:'TKM',417:'KGZ',496:'MNG',
    458:'MYS',702:'SGP',626:'TLS',275:'PSE',462:'MDV',
    174:'COM',226:'GNQ',266:'GAB',270:'GMB',324:'GIN',384:'CIV',
    454:'MWI',466:'MLI',478:'MRT',480:'MUS',562:'NER',
    678:'STP',728:'SSD',768:'TGO',788:'TUN',834:'TZA',
    242:'FJI',548:'VUT',520:'NRU',512:'OMN',10:'ATA',108:'BDI',120:'CMR',178:'COG',204:'BEN',
  };
  return map[n] || 'default';
}

async function loadCountryBorders() {
  try {
    const resp = await fetch('./vendor/countries-110m.json');
    const topo  = await resp.json();
    const geo   = topoToGeo(topo, topo.objects.countries);

    geo.features.forEach(f => {
      const geom = f.geometry;
      if (!geom) return;
      const polys = geom.type === 'MultiPolygon' ? geom.coordinates : [geom.coordinates];
      polys.forEach(poly => {
        if (poly[0]) {
          const line = buildBorderLine(poly[0]);
          if (line) { line.renderOrder = 3; bordersGroup.add(line); }
        }
      });
    });
  } catch(e) {
    console.warn('Border load failed', e);
  }
}
loadCountryBorders();

// ========================
// STARS BACKGROUND
// ========================
(function addStars() {
  const positions = new Float32Array(6000);
  for (let i = 0; i < 6000; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 80 + Math.random() * 40;
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.18, sizeAttenuation: true, transparent: true, opacity: 0.7 });
  scene.add(new THREE.Points(geo, mat));
})();

// ========================
// MYTHOLOGY MARKERS
// ========================
const markerGroup = new THREE.Group();
scene.add(markerGroup);
const markers = [];

mythData.forEach((myth, idx) => {
  const pos = latLonToVec3(myth.lat, myth.lon, 1.03);

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.016, 16, 16),
    new THREE.MeshBasicMaterial({ color: getAccentColor() })
  );
  dot.position.copy(pos);
  dot.userData = { mythIndex: idx };
  markerGroup.add(dot);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.024, 0.034, 32),
    new THREE.MeshBasicMaterial({ color: getAccentColor(), transparent: true, opacity: 0.65, side: THREE.DoubleSide })
  );
  ring.position.copy(pos);
  ring.lookAt(new THREE.Vector3(0, 0, 0));
  markerGroup.add(ring);

  const pulse = new THREE.Mesh(
    new THREE.RingGeometry(0.028, 0.040, 32),
    new THREE.MeshBasicMaterial({ color: getAccentColor(), transparent: true, opacity: 0.28, side: THREE.DoubleSide })
  );
  pulse.position.copy(pos);
  pulse.lookAt(new THREE.Vector3(0, 0, 0));
  pulse.userData.pulsePhase = idx * 0.55;
  markerGroup.add(pulse);

  markers.push({ dot, ring, pulse, myth });
});

// ========================
// RAYCASTING
// ========================
const raycaster = new THREE.Raycaster();
const mouse     = new THREE.Vector2();

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
  mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(markers.map(m => m.dot));
  if (hits.length > 0) openModal(mythData[hits[0].object.userData.mythIndex]);
});

// ========================
// SIDE PANEL
// ========================
const mythPanel = document.getElementById('myth-panel');
mythData.slice(0, 6).forEach(myth => {
  const card = document.createElement('div');
  card.className = 'myth-card';
  card.innerHTML = `
    <div class="myth-card-header">
      <div class="myth-icon">${myth.icon}</div>
      <div>
        <div class="myth-card-title">${myth.title}</div>
        <div class="myth-card-region">${myth.region}</div>
      </div>
    </div>
    <div class="myth-card-desc">${myth.summary}</div>
  `;
  card.addEventListener('click',      () => { openModal(myth); animateCamera(latLonToVec3(myth.lat, myth.lon, 3.2)); });
  card.addEventListener('mouseenter', () => animateCamera(latLonToVec3(myth.lat, myth.lon, 3.2)));
  mythPanel.appendChild(card);
});

function animateCamera(target) {
  const start     = camera.position.clone();
  const startTime = performance.now();
  (function step(t) {
    const e = Math.min((t - startTime) / 1000, 1);
    const ease = 1 - Math.pow(1 - e, 3);
    camera.position.lerpVectors(start, target, ease);
    camera.lookAt(0, 0, 0);
    if (e < 1) requestAnimationFrame(step);
  })(performance.now());
}

// ========================
// MODAL
// ========================
let currentSpeech = null, speechInterval = null;

window.openModal = function(myth) {
  document.getElementById('modal-region').textContent     = myth.region;
  document.getElementById('modal-title').textContent      = myth.title;
  document.getElementById('modal-body').textContent       = myth.story;
  document.getElementById('audio-story-title').textContent = myth.title;
  document.getElementById('audio-progress-bar').style.width = '0%';
  if (currentSpeech) { speechSynthesis.cancel(); currentSpeech = null; clearInterval(speechInterval); }
  updateAudioIcon(false);
  document.getElementById('story-modal').classList.add('open');
  controls.autoRotate = false;
  if (window.lucide) lucide.createIcons();
};

window.closeModal = function() {
  document.getElementById('story-modal').classList.remove('open');
  controls.autoRotate = true;
  if (currentSpeech) { speechSynthesis.cancel(); currentSpeech = null; clearInterval(speechInterval); }
};
document.getElementById('story-modal').addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) closeModal();
});

// ========================
// TEXT-TO-SPEECH
// ========================
function updateAudioIcon(playing) {
  document.getElementById('audio-btn').innerHTML = playing
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
}
window.toggleAudio = function() {
  if (currentSpeech && speechSynthesis.speaking) {
    speechSynthesis.paused
      ? (speechSynthesis.resume(), updateAudioIcon(true))
      : (speechSynthesis.pause(),  updateAudioIcon(false));
    return;
  }
  const text = document.getElementById('modal-body').textContent;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN'; u.rate = 0.9; u.pitch = 1;
  const zh = speechSynthesis.getVoices().find(v => v.lang.startsWith('zh'));
  if (zh) u.voice = zh;
  currentSpeech = u;
  updateAudioIcon(true);
  const dur = text.length * 200;
  const t0  = Date.now();
  speechInterval = setInterval(() => {
    document.getElementById('audio-progress-bar').style.width =
      Math.min((Date.now() - t0) / dur * 100, 95) + '%';
  }, 200);
  u.onend  = () => { updateAudioIcon(false); document.getElementById('audio-progress-bar').style.width = '100%'; clearInterval(speechInterval); currentSpeech = null; };
  u.onerror = () => { updateAudioIcon(false); clearInterval(speechInterval); currentSpeech = null; };
  speechSynthesis.speak(u);
};

// ========================
// THEME OBSERVER
// ========================
new MutationObserver(() => {
  markers.forEach(m => {
    const ac = getAccentColor();
    m.dot.material.color.setHex(ac);
    m.ring.material.color.setHex(ac);
    m.pulse.material.color.setHex(ac);
  });
}).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

// ========================
// ANIMATION LOOP
// ========================
const clock = new THREE.Clock();
(function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  controls.update();

  // Slowly rotate cloud layer independently
  cloudMesh.rotation.y = t * 0.004;

  // Pulse markers
  markers.forEach(m => {
    const s = 1 + 0.35 * Math.sin(t * 2 + m.pulse.userData.pulsePhase);
    m.pulse.scale.setScalar(s);
    m.pulse.material.opacity = 0.3 * (1 - (s - 1) / 0.35);
  });

  renderer.render(scene, camera);
})();

// ========================
// RESIZE
// ========================
function onResize() {
  width  = container.clientWidth;
  height = container.clientHeight;
  if (width < 10 || height < 10) return;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
window.addEventListener('resize', onResize);
if (typeof ResizeObserver !== 'undefined') {
  new ResizeObserver(onResize).observe(container);
}
if (typeof IntersectionObserver !== 'undefined') {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        onResize();
        setTimeout(onResize, 80);
        setTimeout(onResize, 250);
      }
    });
  }, { threshold: 0.1 }).observe(container);
}
requestAnimationFrame(() => requestAnimationFrame(onResize));
setTimeout(onResize, 100);
setTimeout(onResize, 500);
setTimeout(onResize, 1500);

// ========================
// SIGNUP
// ========================
window.handleSignup = function(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  if (input.value) {
    const btn = e.target.querySelector('button');
    btn.textContent = '注册成功 ✓'; btn.style.background = '#437a22';
    input.value = '';
    setTimeout(() => { btn.textContent = '免费注册'; btn.style.background = ''; }, 3000);
  }
};
