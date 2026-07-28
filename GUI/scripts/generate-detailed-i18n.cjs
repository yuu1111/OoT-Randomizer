const fs = require('fs');
const path = require('path');

const guiRoot = path.resolve(__dirname, '..');
const settingsPath = path.resolve(guiRoot, '..', 'data', 'generated', 'settings_list.json');
const localePath = path.resolve(guiRoot, 'src', 'assets', 'i18n', 'ja.json');
const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
const locale = JSON.parse(fs.readFileSync(localePath, 'utf8'));

function findSetting(name) {
  for (const tab of settings.settingsArray) {
    for (const section of tab.sections || []) {
      const setting = (section.settings || []).find(candidate => candidate.name === name);
      if (setting) return setting;
    }
  }
  throw new Error(`Setting not found: ${name}`);
}

const exactLocationNames = {
  'ToT Reward from Rauru': '時の神殿・ラウルからの報酬',
  'Queen Gohma': 'ゴーマ',
  'King Dodongo': 'キングドドンゴ',
  Barinade: 'バリネード',
  'Phantom Ganon': 'ファントムガノン',
  Volvagia: 'ヴァルバジア',
  Morpha: 'モーファ',
  'Bongo Bongo': 'ボンゴボンゴ',
  Twinrova: 'ツインローバ',
  'Song from Impa': 'インパから教わる歌',
  'Song from Malon': 'マロンから教わる歌',
  'Song from Saria': 'サリアから教わる歌',
  'Song from Royal Familys Tomb': '王家の墓で覚える歌',
  'Song from Ocarina of Time': '時のオカリナで覚える歌',
  'Song from Windmill': '風車小屋で覚える歌',
  'Sheik in Forest': '森の神殿でシークから教わる歌',
  'Sheik in Crater': 'デスマウンテン火口でシークから教わる歌',
  'Sheik in Ice Cavern': '氷の洞窟でシークから教わる歌',
  'Sheik at Colossus': '巨大邪神像でシークから教わる歌',
  'Sheik in Kakariko': 'カカリコ村でシークから教わる歌',
  'Sheik at Temple': '時の神殿でシークから教わる歌',
};

const prefixExpansions = [
  [/^KF /, 'Kokiri Forest '], [/^LW /, 'Lost Woods '], [/^SFM /, 'Sacred Forest Meadow '],
  [/^HF /, 'Hyrule Field '], [/^ToT /, 'Temple of Time '], [/^HC /, 'Hyrule Castle '],
  [/^LLR /, 'Lon Lon Ranch '], [/^Kak /, 'Kakariko Village '], [/^DMT /, 'Death Mountain Trail '],
  [/^GC /, 'Goron City '], [/^DMC /, 'Death Mountain Crater '], [/^ZR /, 'Zora River '],
  [/^ZD /, 'Zora Domain '], [/^ZF /, 'Zora Fountain '], [/^LH /, 'Lake Hylia '],
  [/^GV /, 'Gerudo Valley '], [/^GF /, 'Gerudo Fortress '], [/^OGC /, 'Outside Ganon Castle '],
];

const locationAreas = [
  ['Ganons Castle', 'ガノン城'], ['Gerudo Training Ground', 'ゲルドの修練場'],
  ['Dodongos Cavern', 'ドドンゴの洞窟'], ['Jabu Jabus Belly', 'ジャブジャブ様のお腹'],
  ['Bottom of the Well', '井戸の底'], ['Deku Tree', 'デクの樹サマ'], ['Forest Temple', '森の神殿'],
  ['Fire Temple', '炎の神殿'], ['Water Temple', '水の神殿'], ['Shadow Temple', '闇の神殿'],
  ['Spirit Temple', '魂の神殿'], ['Ice Cavern', '氷の洞窟'], ['Kokiri Forest', 'コキリの森'],
  ['Sacred Forest Meadow', '森の聖域'], ['Hyrule Field', 'ハイラル平原'], ['Temple of Time', '時の神殿'],
  ['Hyrule Castle', 'ハイラル城'], ['Lon Lon Ranch', 'ロンロン牧場'], ['Kakariko Village', 'カカリコ村'],
  ['Death Mountain Trail', 'デスマウンテン登山道'], ['Goron City', 'ゴロンシティ'],
  ['Death Mountain Crater', 'デスマウンテン火口'], ['Zora River', 'ゾーラ川'], ['Zora Domain', 'ゾーラの里'],
  ['Zora Fountain', 'ゾーラの泉'], ['Lake Hylia', 'ハイリア湖'], ['Gerudo Valley', 'ゲルドの谷'],
  ['Gerudo Fortress', 'ゲルドの砦'], ['Lost Woods', '迷いの森'], ['Graveyard', '墓地'],
  ['Market', '城下町'], ['Hideout', '盗賊のアジト'], ['Wasteland', '幻影の砂漠'],
  ['Colossus', '巨大邪神像'], ['Outside Ganon Castle', 'ガノン城外'],
  ['Ganons Tower', 'ガノンの塔'],
];

const locationPhrases = [
  ['Gold Skulltula', '黄金のスタルチュラ'], ['Recovery Heart', '回復ハート'],
  ['Piece of Heart', 'ハートのかけら'], ['Silver Rupee', '銀ルピー'], ['Purple Rupee', '紫ルピー'],
  ['Red Rupee', '赤ルピー'], ['Blue Rupee', '青ルピー'], ['Green Rupee', '緑ルピー'],
  ['Boss Key', 'ボス部屋のカギ'], ['Small Key', '小さなカギ'], ['Treasure Chest', '宝箱'],
  ['Flying Pot', '飛び出す壺'], ['Hidden Item', '隠しアイテム'], ['Wooden Crate', '木箱'],
  ['Great Fairy Reward', '大妖精の報酬'], ['Fairy Reward', '妖精の報酬'], ['Freestanding', '置かれている'],
  ['Midos', 'ミドの家'], ['Impas', 'インパの家'], ['Talons', 'タロンの'], ['Sarias', 'サリアの'],
  ['Dampes', 'ダンペイの'], ['Dampe', 'ダンペイ'], ['Zeldas', 'ゼルダの'],
  ['Spinning Scythe', '回転する大鎌'], ['Spinning Log', '回転丸太'], ['Falling Spikes', '落下トゲ'],
  ['Invisible Blades', '見えない刃'], ['Invisible Spikes', '見えないトゲ'], ['Invisible Chest', '透明な宝箱'],
  ['Push Block', 'ブロック押し'], ['Bomb Flower', 'バクダン花'], ['Bombable Wall', '爆破できる壁'],
  ['Like Like', 'ライクライク'], ['Iron Knuckle', 'アイアンナック'], ['Big Octo', '大オクタ'],
  ['Deku Scrub', 'アキンドナッツ'], ['Business Scrub', 'アキンドナッツ'], ['Magic Bean', '魔法のマメ'],
  ['Map Chest', 'マップの宝箱'], ['Compass Chest', 'コンパスの宝箱'], ['Boss Key Chest', 'ボス部屋のカギ宝箱'],
  ['Before Spinning Log', '回転丸太前'], ['After Spinning Log', '回転丸太後'],
  ['Bottom Left', '左下'], ['Bottom Right', '右下'], ['Top Left', '左上'], ['Top Right', '右上'],
  ['Center Left', '中央左'], ['Center Right', '中央右'], ['Back Left', '奥左'], ['Back Right', '奥右'],
  ['Front Left', '手前左'], ['Front Right', '手前右'], ['Center Back', '中央奥'], ['Center Front', '中央手前'],
  ['Upper Left', '上段左'], ['Upper Right', '上段右'], ['Lower Left', '下段左'], ['Lower Right', '下段右'],
  ['Near Lower Lizalfos', '下層リザルフォス付近'], ['Near Boss', 'ボス前'], ['Near Domain', '里の近く'],
  ['Near Raised Grottos', '高台の穴付近'], ['Near Grottos', '穴付近'], ['Near Gate', '門付近'],
  ['Underwater', '水中'], ['Submerged', '水没した'], ['Behind Gate', '門の奥'], ['Behind', '奥'],
  ['Above', '上'], ['Below', '下'], ['Before', '前'], ['After', '後'], ['Near', '付近'],
  ['First Hall', '最初の通路'], ['Main Room', 'メイン部屋'], ['Side Room', '脇部屋'],
  ['Map Room', 'マップ部屋'], ['Compass Room', 'コンパス部屋'], ['Boss Room', 'ボス部屋'],
  ['Torch Slug', 'トーチスラグ'], ['Skulltula House', 'スタルチュラハウス'],
  ['Treasure Chest Game', '宝箱屋'], ['Potion Shop', 'クスリ屋'], ['Guard House', '兵士の詰め所'],
  ['Great Fairy Fountain', '大妖精の泉'], ['Fairy Fountain', '妖精の泉'], ['Fishing Pond', 'つりぼり'],
  ['Shooting Gallery', '的当て屋'], ['Bombchu Bowling', 'ボムチュウボウリング'],
  ['Waterfall', '滝'], ['Drawbridge', '跳ね橋'], ['Courtyard', '中庭'], ['Basement', '地下'],
  ['Staircase', '階段'], ['Hallway', '通路'], ['Lobby', 'ロビー'], ['Chamber', '部屋'], ['Room', '部屋'],
  ['Platform', '足場'], ['Pillar', '柱'], ['Bridge', '橋'], ['Ledge', '足場'], ['Balcony', 'バルコニー'],
  ['Island', '島'], ['Tower', '塔'], ['Maze', '迷路'], ['Gate', '門'], ['Wall', '壁'], ['Floor', '床'],
  ['Ceiling', '天井'], ['Roof', '屋根'], ['Path', '道'], ['River', '川'], ['Moat', '堀'], ['Water', '水'],
  ['Lava', '溶岩'], ['Flame', '炎'], ['Fire', '炎'], ['Wind', '風'], ['Sun', '太陽'], ['Mirror', '鏡'],
  ['Torch', '燭台'], ['Switch', 'スイッチ'], ['Eye', '目'], ['Statue', '像'], ['Block', 'ブロック'],
  ['Boulder', '岩'], ['Spikes', 'トゲ'], ['Scythe', '大鎌'], ['Vines', 'ツタ'], ['Log', '丸太'],
  ['Boat', '船'], ['Elevator', '昇降床'], ['Storage', '倉庫'], ['Jail', '牢屋'], ['Kitchen', '台所'],
  ['Grotto', '穴'], ['House', '家'], ['Shop', '店'], ['Bazaar', 'バザー'], ['Lab', '研究所'],
  ['Cow', 'ウシ'], ['Beehive', 'ハチの巣'], ['Jar', '壺'], ['Pot', '壺'], ['Crate', '木箱'],
  ['Chest', '宝箱'], ['Rupee', 'ルピー'], ['Heart', 'ハート'], ['Item', 'アイテム'], ['Reward', '報酬'],
  ['Hookshot', 'フックショット'], ['Longshot', 'ロングフック'], ['Slingshot', 'パチンコ'], ['Boomerang', 'ブーメラン'],
  ['Hammer', 'メガトンハンマー'], ['Bombchu', 'ボムチュウ'], ['Bomb', 'バクダン'], ['Bow', '弓'],
  ['Ocarina', 'オカリナ'], ['Mask', 'お面'], ['Sword', '剣'], ['Shield', '盾'], ['Bean', 'マメ'],
  ['Child', '子供'], ['Adult', '大人'], ['Daytime', '昼'], ['Night', '夜'], ['Day', '昼'],
  ['Upper', '上段'], ['Lower', '下段'], ['Top', '上'], ['Bottom', '下'], ['Front', '手前'], ['Back', '奥'],
  ['Left', '左'], ['Right', '右'], ['Center', '中央'], ['Central', '中央'], ['Middle', '中央'],
  ['First', '1つ目'], ['Second', '2つ目'], ['Third', '3つ目'], ['Last', '最後'], ['Early', '序盤'],
  ['Open', '開いた'], ['Hidden', '隠し'], ['Frozen', '凍った'], ['Moving', '動く'], ['Raised', '上がった'],
  ['Big', '大'], ['Small', '小'], ['Huge', '巨大'], ['Narrow', '狭い'], ['Main', 'メイン'], ['Side', '脇'],
  ['King Dodongo', 'キングドドンゴ'], ['Queen Gohma', 'ゴーマ'], ['Phantom Ganon', 'ファントムガノン'],
  ['Barinade', 'バリネード'], ['Volvagia', 'ヴァルバジア'], ['Morpha', 'モーファ'],
  ['Bongo Bongo', 'ボンゴボンゴ'], ['Twinrova', 'ツインローバ'], ['Sheik', 'シーク'],
  ['Lizalfos', 'リザルフォス'], ['Stalfos', 'スタルフォス'], ['Armos', 'アモス'], ['Beamos', 'ビーモス'],
  ['Octorok', 'オクタロック'], ['Wolfos', 'ウルフォス'], ['Floormaster', 'フロアマスター'],
  ['Anubis', 'アヌビス'], ['Tektite', 'テクタイト'], ['Larvae', '幼体'], ['Poe', 'ポウ'],
  ['Wonderitem', '隠しアイテム'], ['Storms Grotto', '嵐の歌で開く穴'], ['Bean Patch', 'マメ植え場'],
  ['Know It All House', '物知り兄弟の家'], ['House of Twins', '双子の家'], ["Links House", 'リンクの家'],
  ['Stepping Stones', '飛び石'], ['Kokiri Sword', 'コキリの剣'], ['Gift from Saria', 'サリアからの贈り物'],
  ['Ocarina Memory Game', 'オカリナ記憶ゲーム'], ['Target in Woods', '森の的当て'], ['Deku Theater', 'デクナッツ劇場'],
  ['Skull Kid', 'スタルキッド'], ['Odd Potion', 'あやしいクスリ'], ['Odd Mushroom', 'あやしいキノコ'],
  ['Cojiro', 'コジロー'], ['Trade', 'わらしべイベント'], ['Shortcuts', '近道'], ['Shortcut', '近道'],
  ['Inside Fence', '柵の内側'], ['Southeast', '南東'], ['Northeast', '北東'], ['Southwest', '南西'], ['Northwest', '北西'],
  ['Forest Area', '森エリア'], ['Castle Area', '城エリア'], ['Market Area', '城下町エリア'],
  ['Light Trial', 'ライトトライアル'], ['Forest Trial', 'フォレストトライアル'], ['Fire Trial', 'ファイアトライアル'],
  ['Water Trial', 'ウォータートライアル'], ['Shadow Trial', 'シャドウトライアル'], ['Spirit Trial', 'スピリットトライアル'],
  ['Trial', 'トライアル'], ['Light Arrows Cutscene', '光の矢イベント'], ['Ocarina of Time', '時のオカリナ'],
  ['Bombchu Bowling First Prize', 'ボムチュウボウリング・1回目の景品'],
  ['Bombchu Bowling Second Prize', 'ボムチュウボウリング・2回目の景品'],
  ['Lost Dog', '迷子の犬'], ['Salesman', '店主'], ['Dog Lady', '犬好きの女性'], ['Man in Green', '緑の服の男性'],
  ['Malon Egg', 'マロンのふしぎなタマゴ'], ["Zeldas Letter", 'ゼルダの手紙'], ['Letter', '手紙'],
  ['Cutscene', 'イベント'], ['Prize', '景品'], ['Memory Game', '記憶ゲーム'], ['Game', 'ゲーム'],
  ['Grass', '草むら'], ['Ramp', '坂'], ['Fence', '柵'], ['Sign', '看板'], ['Training', '訓練場'],
  ['End', '端'], ['Twins', '双子'], ['Patch', '植え場'], ['Gift', '贈り物'], ['Truth', 'まこと'],
  ['Woods', '森'], ['Rear', '奥'], ['Under', '下'], ['Inside', '内側'], ['Outside', '外側'],
  ['Forest', '森'], ['Castle', '城'], ['Market', '城下町'], ['Kakariko', 'カカリコ村'], ['Kak', 'カカリコ村'],
  ['Colossus', '巨大邪神像'], ['Temple', '神殿'], ['Cavern', '洞窟'], ['Tree', '木'], ['Field', '平原'],
  ['Song of Storms', '嵐の歌'], ['Storms', '嵐の歌'], ['Saria', 'サリア'], ['Malon', 'マロン'], ['Impa', 'インパ'],
  ['Light Arrows', '光の矢'], ['Arrows', '矢'], ['Lullaby', '子守歌'], ['Frogs', 'カエル'],
  ['Mask of Truth', 'まことのお面'], ['Skull Mask', 'ドクロのお面'], ['Skull', 'ドクロ'],
  ['Blue Fire', '青い炎'], ['Red Ice', '赤い氷'], ['Ice', '氷'], ['Quicksand', '流砂'],
  ['Enemy', '敵'], ['Fight', '戦闘'], ['Door', '扉'], ['Cell', '牢屋'], ['Army', '集団'],
  ['Proximity', '接近'], ['Interact', '作動'], ['Ordered', '順番'], ['Free', '自由'], ['Multitag', '複数地点'],
  ['Drop', '落下物'], ['Hint', 'ヒント'], ['Target', '的'], ['Shoot', '射撃'], ['Whispering', 'ささやき'],
  ['Entrance', '入口'], ['Climb', '登り'], ['Dive', '潜水'], ['Trade', 'わらしべ'], ['Race', 'レース'],
  ['Daytime', '昼'], ['Rain', '雨'], ['Graves', '墓'], ['Grave', '墓'], ['Coffin', '棺'],
  ['Ladders', 'はしご'], ['Ladder', 'はしご'], ['Stairs', '階段'], ['Blade', '刃'], ['Hand', '手'],
  ['Bag', '袋'], ['Flower', '花'], ['Puzzle', '仕掛け'], ['Heavy', '重い'], ['Single', '単独'],
  ['North', '北'], ['South', '南'], ['East', '東'], ['West', '西'], ['Mid', '中間'],
  ['Explosives', '爆発物'], ['Bombable', '爆破可能'], ['Moving', '動く'], ['Shifting', '移動する'],
  ['Frozen', '凍った'], ['Dark', '暗闇'], ['Truth', 'まこと'], ['Royal Family', '王家'],
  ['Gerudo Membership Card', 'ゲルドの会員証'], ['Horseback Archery', 'やぶさめ'], ['HBA', 'やぶさめ'],
  ['Pocket Cucco', 'ポケットコッコ'], ['Poachers Saw', '密猟者のノコギリ'], ['Eyeball Frog', 'メダマガエル'],
  ['Prescription', '処方せん'], ['Broken Sword', '折れたゴロン刀'], ['Blue Potion', '青いクスリ'],
  ['Royal Familys Tomb', '王家の墓'], ['Gravedigging Tour', '墓掘りツアー'], ['Falling Rocks', '落石'],
  ['Darunias Joy', 'ダルニアの喜び'], ['Rolling Goron', '転がるゴロン'], ['King Zora Thawed', '解凍したキングゾーラ'],
  ['Diving Minigame', '潜水ゲーム'], ['Loach Fishing', 'ハイラルどじょう釣り'], ['Archery Range', 'やぶさめ場'],
  ['Break Room', '休憩室'], ['Membership Card', '会員証'], ['Wood Beam', '木の梁'],
  ['Lens of Truth', 'まことのメガネ'], ['Fire Keese', 'ファイアキース'], ['Dead Hand', 'デドハンド'],
  ['Flare Dancer', 'フレアダンサー'], ['Megaton Hammer', 'メガトンハンマー'], ['Hover Boots', 'ホバーブーツ'],
  ['Silver Gauntlets', '銀のグローブ'], ['Golden Gauntlets', '金のグローブ'], ['Iron Boots', 'ヘビィブーツ'],
  ['Mirror Shield', 'ミラーシールド'], ['Dinolfos', 'ダイナフォス'], ['Tailpasaran', 'テールパサラン'],
  ['Song of Time', '時の歌'], ['Eponas Song', 'エポナの歌'], ['Sarias Song', 'サリアの歌'], ['Suns Song', '太陽の歌'],
  ['Know it All', '物知り兄弟'], ['Rain Shed', '雨よけ小屋'], ['Epona Hurdle', 'エポナの障害物'],
  ['Odd Medicine Building', 'あやしいクスリ屋'], ['Backyard', '裏庭'], ['Watchtower', '見張り台'],
  ['Under Construction', '建設現場'], ['Granny', 'クスリ屋の老婆'], ['Anju', 'アンジュ'],
  ['Biggoron', 'ダイゴロン'], ['Medigoron', 'メドゴロン'], ['Darunia', 'ダルニア'], ['Volcano', '火山'],
  ['Iceberg', '流氷'], ['Hidden Cave', '隠し洞窟'], ['Fishing', 'つりぼり'], ['Shore', '岸'], ['Tent', 'テント'],
  ['Gerudo Key', 'ゲルドの小さなカギ'], ['Stove', 'かまど'], ['Hill', '丘'], ['Scarecrow', 'カカシ'],
  ['Alcove', 'くぼみ'], ['Double Eye', '2つの目'], ['Scrub Room', 'アキンドナッツ部屋'], ['Back Area', '奥エリア'],
  ['Entryway', '入口'], ['Wiggler Platforms', '揺れる足場'], ['Invisible Enemies', '透明な敵'],
  ['Like-Like', 'ライクライク'], ['Fake Wall', '偽の壁'], ['Freestanding Key', '置かれているカギ'],
  ['Pit Fall', '落とし穴'], ['Perimeter', '外周'], ['Highest', '最上部'], ['Cracked Wall', 'ひび割れ壁'],
  ['Four Armos', '4体のアモス'], ['Four Torch', '4つの燭台'], ['Nine Thrones', '9つの玉座'],
  ['Symphony', 'シンフォニー'], ['Water Jet', '水流'], ['Gibdo', 'ギブド'], ['Floormaster', 'フロアマスター'],
  ['Icicles', 'つらら'], ['Icicle', 'つらら'], ['Crystal Switch', 'クリスタルスイッチ'],
  ['Rising Platform', '上昇する足場'], ['Guillotine', 'ギロチン'], ['Invisible', '透明な'],
  ['Spinning', '回転'], ['Falling', '落下'], ['Triple', '3連'], ['Pit', '穴'], ['Dragon', '龍像'],
  ['Inner', '内側'], ['Hall', '広間'], ['Area', 'エリア'], ['Key', 'カギ'], ['Boss', 'ボス'],
  ['Blue', '青'], ['Green', '緑'], ['Red', '赤'], ['Gold', '金'], ['Silver', '銀'],
  ['Link', 'リンク'], ['Song', '歌'], ['Time', '時'], ['Break', '休憩'], ['Spike', 'トゲ'], ['Spinner', '回転像'],
  ['Guards', '衛兵'], ['Guard', '衛兵'], ['Construction', '建設現場'], ['Building', '建物'], ['Medicine', 'クスリ'],
  ['Man', '男性'], ['Redead', 'リーデッド'], ['Goron', 'ゴロン'], ['Rocks', '岩'], ['Rock', '岩'],
  ['Chickens', 'ニワトリ'], ['Stables', '馬小屋'], ['Shed', '小屋'], ['Window', '窓'], ['Hurdle', '障害物'],
  ['Points', '点'], ['Archery', '弓術'], ['Range', '射場'], ['Card', '会員証'], ['Corner', '隅'],
  ['Enemies', '敵'], ['Cage', '檻'], ['Beam', '梁'], ['Level', '階'], ['Loop', '周回路'],
  ['Face', '顔'], ['Steps', '段差'], ['Spouts', '噴水'], ['Visible', '見える'], ['Giant', '巨大'],
  ['Leever', 'リーバ'], ['Thrones', '玉座'], ['Jet', '水流'], ['Circle', '円形'], ['Void', '奈落'],
  ['Ship', '船'], ['Gauntlets', 'グローブ'], ['Boots', 'ブーツ'], ['Compass', 'コンパス'],
  ['Push', '押し'], ['Arrow', '矢'], ['Fairy', '妖精'], ['Hole', '穴'], ['Clear', 'クリア'], ['Final', '最後'],
  ['Gold Skulltula House', 'スタルチュラハウス'], ['Lost Woods', '迷いの森'], ['Deku Theater', 'デクナッツ劇場'],
  ['Scrubs', 'アキンドナッツ'], ['Mario', 'マリオ'], ['Buy', '購入'], ['Windmill', '風車小屋'],
  ['Heart Piece', 'ハートのかけら'], ['Eyedrops', '特製本生目薬'], ['Dodongos', 'ドドンゴ'], ['Dodongo', 'ドドンゴ'],
  ['King Zora', 'キングゾーラ'], ['Jabu', 'ジャブジャブ様'], ['Skulltula', 'スタルチュラ'],
  ['First Hallway', '最初の通路'], ['Blocked', '塞がれた'], ['Topmost', '最上部'], ['Metal', '金網'],
  ['Wallmasters', 'ウォールマスター'], ['Fourth', '4つ目'], ['Freezard', 'フリザド'], ['Flamethrower', '火炎放射器'],
  ['Theater', 'デクナッツ劇場'], ['Well', '井戸'], ['GC', 'ゴロンシティ'], ['L1', '1階'], ['L2', '2階'],
];

function prepareLocationName(text) {
  let value = text;
  for (const [pattern, replacement] of prefixExpansions) value = value.replace(pattern, replacement);
  return value
    .replaceAll('Ganons Castle', "Ganon's Castle")
    .replaceAll('Dodongos Cavern', "Dodongo's Cavern")
    .replaceAll('Jabu Jabus Belly', "Jabu-Jabu's Belly")
    .replaceAll(' GS ', ' Gold Skulltula ')
    .replace(/ GS$/, ' Gold Skulltula')
    .replaceAll(' PoH', ' Piece of Heart')
    .replaceAll('MQ', 'Master Quest')
    .replaceAll(' Chest', ' Treasure Chest')
    .replaceAll(' Pot', ' Jar')
    .replaceAll(' Crate', ' Wooden Crate')
    .replaceAll(' Wonderitem', ' Hidden Item');
}

function translateLocationName(name) {
  if (exactLocationNames[name]) return exactLocationNames[name];
  let expanded = name;
  for (const [pattern, replacement] of prefixExpansions) expanded = expanded.replace(pattern, replacement);
  let area = '';
  for (const [english, japanese] of locationAreas) {
    if (expanded === english || expanded.startsWith(`${english} `)) {
      area = japanese;
      expanded = expanded.slice(english.length).trim();
      break;
    }
  }
  if (expanded.startsWith('MQ ')) {
    area = `裏${area}`;
    expanded = expanded.slice(3);
  }
  expanded = expanded.replace(/\bGS\b/g, 'Gold Skulltula').replace(/\bPoH\b/g, 'Piece of Heart');
  for (const [english, japanese] of [...locationPhrases].sort((a, b) => b[0].length - a[0].length)) {
    expanded = expanded.replaceAll(english, japanese);
  }
  expanded = expanded.replace(/\bMQ\b/g, '裏').replace(/\bof\b|\bthe\b|\bin\b|\bon\b|\bat\b|\bfrom\b|\bwith\b|\band\b|\bas\b|\bto\b|\bBy\b/gi, ' ');
  expanded = expanded.replace(/\bs\b/g, '').replace(/([一-龠ぁ-んァ-ヶー])es\b/g, '$1').replace(/([一-龠ぁ-んァ-ヶー])s\b/g, '$1');
  expanded = expanded.replace(/\s+/g, ' ').trim();
  return `${area}${expanded ? `・${expanded}` : ''}`;
}

const tagTranslations = {
  General: '全般', Glitch: 'グリッチ', Advanced: '上級', Child: '子供', Adult: '大人',
  Overworld: 'フィールド', NPCs: '人物', Shops: 'ショップ', Songs: '歌', Cows: 'ウシ',
  Scrubs: 'アキンドナッツ', Pots: '壺', Crates: '木箱', Beehives: 'ハチの巣',
  'Gold Skulltulas': '黄金のスタルチュラ', 'Dungeon Rewards': 'ダンジョン報酬',
  'Vanilla Dungeons': '表ダンジョン', 'Master Quest': '裏ダンジョン',
  'Entrance Shuffle': '入口シャッフル', 'Kokiri Forest': 'コキリの森', 'Lost Woods': '迷いの森',
  'Sacred Forest Meadow': '森の聖域', 'Hyrule Field': 'ハイラル平原', Market: '城下町',
  'Temple of Time': '時の神殿', 'Hyrule Castle': 'ハイラル城', 'Lon Lon Ranch': 'ロンロン牧場',
  'Kakariko Village': 'カカリコ村', Graveyard: '墓地', 'Death Mountain Trail': 'デスマウンテン登山道',
  'Goron City': 'ゴロンシティ', 'Death Mountain Crater': 'デスマウンテン火口',
  "Zora's River": 'ゾーラ川', "Zora's Domain": 'ゾーラの里', "Zora's Fountain": 'ゾーラの泉',
  'Lake Hylia': 'ハイリア湖', 'Gerudo Valley': 'ゲルドの谷', "Gerudo's Fortress": 'ゲルドの砦',
  'Haunted Wasteland': '幻影の砂漠', 'Desert Colossus': '巨大邪神像',
  'Deku Tree': 'デクの樹サマ', "Dodongo's Cavern": 'ドドンゴの洞窟',
  "Jabu Jabu's Belly": 'ジャブジャブ様のお腹', 'Forest Temple': '森の神殿',
  'Fire Temple': '炎の神殿', 'Water Temple': '水の神殿', 'Shadow Temple': '闇の神殿',
  'Spirit Temple': '魂の神殿', 'Bottom of the Well': '井戸の底', 'Ice Cavern': '氷の洞窟',
  'Gerudo Training Ground': 'ゲルドの修練場', "Ganon's Castle": 'ガノン城',
  'Forest Area': '森エリア', 'Death Mountain Area': 'デスマウンテンエリア', 'Zora Area': 'ゾーラエリア',
  'Gerudo Area': 'ゲルドエリア', Chests: '宝箱', Rupees: 'ルピー', Hearts: 'ハート',
  'Small Keys': '小さなカギ', 'Boss Keys': 'ボス部屋のカギ', 'Silver Rupees': '銀ルピー',
  'Dungeon Items': 'ダンジョンアイテム', Enemies: '敵', Switches: 'スイッチ',
  Bouldersanity: '岩シャッフル', Colossus: '巨大邪神像', 'Death Mountain': 'デスマウンテン',
  'Deku Scrub Upgrades': 'アキンドナッツの強化', 'Deku Scrubs': 'アキンドナッツ',
  'Enemy Souls': '敵の魂', 'Flying Pots': '飛び出す壺', Forest: '森', Freestandings: '地面置きアイテム',
  GS: '黄金のスタルチュラ', "Ganon's Tower": 'ガノンの塔', Gerudo: 'ゲルド',
  'Great Fairies': '大妖精', Grottos: '穴', 'Inside Ganon Castle': 'ガノン城内',
  Kakariko: 'カカリコ村', 'King Dodongo': 'キングドドンゴ', 'King Zora': 'キングゾーラ',
  Minigames: 'ミニゲーム', 'Need Spiritual Stones': '精霊石が必要', 'Outside Ganon Castle': 'ガノン城外',
  QPA: 'QPA（クイックプットアウェイ）', 'Rainbow Bridge': '虹の橋', 'Rupee Towers': 'ルピーの塔',
  Shortcuts: '近道', 'Small Crates': '小さな木箱', "Thieves' Hideout": '盗賊のアジト',
  Wonderitem: '隠しアイテム', Wonderitems: '隠しアイテム', Glitchless: 'グリッチなし',
  'Glitch Damage Value': 'グリッチダメージ値', 'Glitched Damage Value': 'グリッチダメージ値',
  'Silver Rupee Shuffle': '銀ルピーシャッフル',
  'House of Skulltula': 'スタルチュラハウス', 'Skulltula House': 'スタルチュラハウス', "Inside Ganon's Castle": 'ガノン城内',
  "Outside Ganon's Castle": 'ガノン城外',
};

function translateTag(tag) {
  if (tagTranslations[tag]) return tagTranslations[tag];
  if (tag.endsWith(' MQ')) {
    return `裏${translateTag(tag.slice(0, -3))}`;
  }
  let value = tag;
  for (const [english, japanese] of Object.entries(tagTranslations).sort((a, b) => b[0].length - a[0].length)) {
    value = value.replaceAll(english, japanese);
  }
  return polish(value);
}

const replacements = [
  ['Advanced Logic', '上級ロジック'], ['Glitchless Logic', 'グリッチなしロジック'],
  ['Gold Skulltula', '黄金のスタルチュラ'], ['Skulltula', 'スタルチュラ'],
  ['Hover Boots', 'ホバーブーツ'], ['Iron Boots', 'ヘビィブーツ'], ['Hookshot', 'フックショット'],
  ['Longshot', 'ロングフック'], ['Bombchu', 'ボムチュウ'], ['Bombs', 'バクダン'],
  ['Deku Stick', 'デクの棒'], ['Deku Nut', 'デクの実'], ['Megaton Hammer', 'メガトンハンマー'],
  ['Lens of Truth', 'まことのメガネ'], ['Song of Time', '時の歌'], ["Sun's Song", '太陽の歌'],
  ["Zelda's Lullaby", 'ゼルダの子守歌'], ['Scarecrow Song', 'カカシの歌'],
  ['Kokiri Forest', 'コキリの森'], ['Lost Woods', '迷いの森'], ['Sacred Forest Meadow', '森の聖域'],
  ['Hyrule Field', 'ハイラル平原'], ['Temple of Time', '時の神殿'], ['Hyrule Castle', 'ハイラル城'],
  ['Lon Lon Ranch', 'ロンロン牧場'], ['Kakariko Village', 'カカリコ村'], ['Death Mountain Trail', 'デスマウンテン登山道'],
  ['Goron City', 'ゴロンシティ'], ['Death Mountain Crater', 'デスマウンテン火口'],
  ["Zora's River", 'ゾーラ川'], ["Zora River", 'ゾーラ川'], ["Zora's Domain", 'ゾーラの里'],
  ['Zora Domain', 'ゾーラの里'], ["Zora's Fountain", 'ゾーラの泉'], ['Zora Fountain', 'ゾーラの泉'],
  ['Lake Hylia', 'ハイリア湖'], ['Gerudo Valley', 'ゲルドの谷'], ["Gerudo's Fortress", 'ゲルドの砦'],
  ['Gerudo Fortress', 'ゲルドの砦'], ['Haunted Wasteland', '幻影の砂漠'], ['Desert Colossus', '巨大邪神像'],
  ['Deku Tree', 'デクの樹サマ'], ["Dodongo's Cavern", 'ドドンゴの洞窟'],
  ["Jabu-Jabu's Belly", 'ジャブジャブ様のお腹'], ['Forest Temple', '森の神殿'],
  ['Fire Temple', '炎の神殿'], ['Water Temple', '水の神殿'], ['Shadow Temple', '闇の神殿'],
  ['Spirit Temple', '魂の神殿'], ['Bottom of the Well', '井戸の底'], ['Ice Cavern', '氷の洞窟'],
  ['Gerudo Training Ground', 'ゲルドの修練場'], ["Ganon's Castle", 'ガノン城'],
  ['Master Quest', '裏'], ['Treasure Chest', '宝箱'], ['Piece of Heart', 'ハートのかけら'],
  ['Magic Bean', '魔法のマメ'], ['Silver Rupee', '銀ルピー'], ['Small Key', '小さなカギ'],
  ['Boss Key', 'ボス部屋のカギ'], ['Child', '子供'], ['Adult', '大人'], ['Link', 'リンク'],
  ['Stone of Agony', 'もだえ石'], ['Mido', 'ミド'], ['Cucco', 'コッコ'], ['Poe', 'ポウ'],
  ['Vanilla', '表'], ['PoH', 'ハートのかけら'], ['OoB', '場外'], ['OOB', '場外'],
  ['Like Like', 'ライクライク'], ['Dead Hand', 'デドハンド'], ["Din's Fire", 'ディンの炎'],
  ['Jabu MQ', '裏ジャブジャブ様'], ['Jabu', 'ジャブジャブ様'], ['KZ', 'キングゾーラ'],
  ['DC', 'ドドンゴの洞窟'], ['BK', 'ボス部屋のカギ'], ['GTG', 'ゲルドの修練場'],
  ['DoT', '時の扉'], ['BGS', 'ダイゴロン刀'], ['LW', '迷いの森'], ['GF', 'ゲルドの砦'],
  ['DMT', 'デスマウンテン登山道'], ['DMC', 'デスマウンテン火口'], ['GV', 'ゲルドの谷'],
  ['GC', 'ゴロンシティ'], ['HC', 'ハイラル城'], ['ZR', 'ゾーラ川'], ['ZD', 'ゾーラの里'],
  ['LH', 'ハイリア湖'], ['SoT', '時の歌'], ['TCG', '宝箱屋'], ['BotW', '井戸の底'],
  ['ZL', 'ゼルダの子守歌'], ['GS', '黄金のスタルチュラ'], ['NPC', '人物'],
  ['Suns Song', '太陽の歌'], ['Big Octo', '大オクタ'], ['Navi Dive', 'ナビダイブ'],
  ['Aqua Escape', 'アクアエスケープ'], ['Flame Storage', 'フレイムストレージ'],
];

function polish(text) {
  let value = text;
  for (const [english, japanese] of replacements) value = value.replaceAll(english, japanese);
  return value
    .replaceAll('アドバンスト ロジック', '上級ロジック')
    .replaceAll('アドバンストロジック', '上級ロジック')
    .replaceAll('ホバー ブーツ', 'ホバーブーツ')
    .replaceAll('アイアン ブーツ', 'ヘビィブーツ')
    .replaceAll('ロングショット', 'ロングフック')
    .replaceAll('フック ショット', 'フックショット')
    .replaceAll('スカルチュラ', 'スタルチュラ')
    .replaceAll('ゴールド スタルチュラ', '黄金のスタルチュラ')
    .replaceAll('ゴールドスタルチュラ', '黄金のスタルチュラ')
    .replaceAll('クイーン・ゴーマ', 'ゴーマ')
    .replaceAll('キング・ドドンゴ', 'キングドドンゴ')
    .replaceAll('ファントム・ガノン', 'ファントムガノン')
    .replaceAll('バリナード', 'バリネード')
    .replaceAll('ボンゴ・ボンゴ', 'ボンゴボンゴ')
    .replaceAll('ツインロバ', 'ツインローバ')
    .replaceAll('胸', '宝箱')
    .replaceAll('マスタークエスト', '裏')
    .replaceAll('バニラ', '表')
    .replaceAll('スピリットテンプル', '魂の神殿')
    .replaceAll('ファイアテンプル', '炎の神殿')
    .replaceAll('ウォーターテンプル', '水の神殿')
    .replaceAll('シャドウテンプル', '闇の神殿')
    .replaceAll('フォレストテンプル', '森の神殿')
    .replaceAll('シルバー ルピー', '銀ルピー')
    .replaceAll('シルバールピー', '銀ルピー')
    .replaceAll('サイド ルーム', '脇部屋')
    .replaceAll('ソング オブ タイム', '時の歌')
    .replaceAll('真実のレンズ', 'まことのメガネ')
    .replaceAll('ビーン', '魔法のマメ')
    .replace(/[ \t]+<br>/g, '<br>')
    .trim();
}

async function translate(text) {
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', 'ja');
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', text);
  for (let attempt = 1; attempt <= 4; attempt++) {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return polish(data[0].map(part => part[0]).join(''));
    }
    if (attempt === 4) throw new Error(`Translation failed (${response.status})`);
    await new Promise(resolve => setTimeout(resolve, attempt * 750));
  }
}

async function translateMany(entries) {
  const results = new Map();
  let cursor = 0;
  const workers = Array.from({ length: 12 }, async () => {
    while (cursor < entries.length) {
      const entry = entries[cursor++];
      results.set(entry.key, await translate(entry.text));
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  const locations = findSetting('disabled_locations');
  locale.settings.disabled_locations.options = {};
  for (const option of locations.options) {
    locale.settings.disabled_locations.options[option.name] = {
      text: translateLocationName(option.name),
      tags: (option.tags || []).map(translateTag),
    };
  }

  for (const settingName of ['allowed_tricks', 'advanced_allowed_tricks']) {
    const setting = findSetting(settingName);
    const tooltipEntries = setting.options
      .filter(option => option.tooltip)
      // Source <br> elements are hard-wrapped for the English UI. Passing those
      // boundaries to machine translation splits Japanese clauses in unnatural
      // places, so translate the complete sentence and let the UI wrap it.
      .map(option => ({ key: option.name, text: option.tooltip.replaceAll('<br>', ' ') }));
    const translatedTooltips = await translateMany(tooltipEntries);
    for (const option of setting.options) {
      const current = locale.settings[settingName].options[option.name];
      locale.settings[settingName].options[option.name] = {
        text: typeof current === 'string' ? current : current?.text,
        tooltip: translatedTooltips.get(option.name),
        tags: (option.tags || []).map(translateTag),
      };
    }
  }

  const standardTooltipEntries = settings.settingsArray
    .flatMap(tab => tab.sections || [])
    .flatMap(section => section.settings || [])
    .filter(setting =>
      setting.tooltip &&
      !['allowed_tricks', 'advanced_allowed_tricks'].includes(setting.name) &&
      locale.settings[setting.name]?.tooltip?.includes('<br>') &&
      !setting.tooltip.includes('<a '))
    .map(setting => ({
      key: setting.name,
      text: setting.tooltip.replaceAll('<br>', ' '),
    }));
  const standardTooltips = await translateMany(standardTooltipEntries);
  for (const [key, tooltip] of standardTooltips) {
    locale.settings[key].tooltip = tooltip;
  }
  const standardTooltipOverrides = {
    wad_file: '時のオカリナ 1.2（北米版または日本版）のWADファイルを指定します。',
    wad_channel_id: 'WADのチャンネルIDを4文字で指定します。Dolphinとの互換性のため末尾は「E」にしてください。異なるIDのOoTR WADを複数インストールすると、ソフトリセット時にクラッシュする場合があります。',
    presets: '適用する設定プリセットを選びます。「初心者向け」は原作に近い長めの構成、「かんたん」は時間短縮設定を多く有効にした遊びやすい構成、「ヘル」は高難度設定を最大限に有効にした構成です。読み込み後も、シードを生成する前なら各設定を変更できます。',
    dungeon_shortcuts_choice: '選択したダンジョンで、ボスまでの仕掛けや通路を攻略済みの状態にします。対象はデクの樹サマ、ドドンゴの洞窟、ジャブジャブ様のお腹、森・炎・水・闇・魂の神殿です。「すべて」は全対象、「ランダム」は対象をランダムに決定します。グリッチありロジックとは併用できません。',
    mq_dungeons_mode: '裏仕様にするダンジョンの決め方を選びます。',
    shuffle_hideout_entrances: '盗賊のアジトの入口を建物入口のシャッフル対象へ加えます。アジト内でセーブして再開した場合は、たいまつのある最初の部屋から始まります。',
    shuffle_freestanding_items: '地面などに直接置かれているルピーと回復ハートをシャッフルします。闇の神殿の回転壺やゴロンシティの巨大壺から出るアイテムも対象です。範囲は「すべて」「フィールドのみ」「ダンジョンのみ」から選べます。',
    shuffle_pots: 'ツボと飛び出すツボの中身をシャッフルします。範囲は「すべて」「フィールドのみ」「ダンジョンのみ」から選べます。有効時はガノン城のボス部屋のカギがなくてもガノン塔のツボを回収できますが、そこから先へ進むにはカギが必要です。',
    shuffle_crates: '大小の木箱の中身をシャッフルします。範囲は「すべて」「フィールドのみ」「ダンジョンのみ」から選べます。通常アイテムが入っている木箱だけが対象で、空の木箱は含まれません。',
    shuffle_wonderitems: '特定の場所へ触れる、決められた攻撃を当てるなどの条件で出現する隠しアイテムをシャッフルします。対象地点は色付きのきらめきで表示されます。',
    shuffle_beans: '魔法のマメ10個をアイテムプールへ追加し、マメ売りの男が60ルピーでランダムアイテムを1回だけ販売するようにします。',
    shuffle_loach_reward: '釣り堀でハイラルドジョウを釣った報酬をシャッフルします。「原作どおり」は出現条件を変更せず、「かんたん」はドジョウを常時出現させ、シンキングルアーも最初から候補地点に配置します。',
    shuffle_map: 'ダンジョンマップの配置範囲を選びます。「削除」「初期所持」「原作どおり」「元のダンジョン」「地域内」「フィールドのみ」「いずれかのダンジョン」「どこでも」から選択できます。攻略済みダンジョンのマップは、そのダンジョンの外へ配置されません。',
    shuffle_compass: 'コンパスの配置範囲を選びます。「削除」「初期所持」「原作どおり」「元のダンジョン」「地域内」「フィールドのみ」「いずれかのダンジョン」「どこでも」から選択できます。攻略済みダンジョンのコンパスは、そのダンジョンの外へ配置されません。',
    key_rings_choice: '選択したダンジョンの小さなカギを1つのキーホルダーにまとめます。入手すると、そのダンジョンの小さなカギをすべて同時に獲得します。小さなカギが「削除」または「原作どおり」の場合、その対象には効果がありません。',
    enhance_map_compass: 'マップにダンジョンが表・裏のどちらかと入口の接続先を、コンパスにボスとダンジョン報酬の情報を追加します。表示される情報は、マップとコンパスの所持状況やシャッフル設定に応じて変わります。',
    big_poe_count_random: 'ポウ屋から報酬を受け取るために必要なビッグポウの数を、シードごとにランダムで決めます。',
    big_poe_count: 'ポウ屋から報酬を受け取るために必要なビッグポウの数を指定します。',
    clearer_hints: '有効にすると、ゴシップストーンのヒントが遠回しな表現ではなく、場所やアイテムを直接示す文章になります。',
    misc_hints: '時の神殿の祭壇、ダンペの日記、ガノンドロフ、ワープソングとフクロウ、スタルチュラハウス、ゾーラ川のカエル、お面屋、商人、ポウ屋、デクナッツ劇場などに追加するヒントを選びます。',
    text_shuffle: 'ゲーム内の文章をランダムに入れ替えます。「重要な文章を除外」では、ヒント、カギ、店の商品、価格、ニワトリやビッグポウの必要数など、攻略に必要な文章は変更しません。',
    one_item_per_dungeon: '各ダンジョンに配置される主要アイテムを原則1つに制限し、ダンジョンごとの価値を均等にします。魂の神殿のみ2つです。カギ、黄金のスタルチュラのしるし、ハート、ボムチュウを主要アイテムとして数えるかは関連設定によって変わります。ほかの設定との組み合わせによってはシード生成に失敗しやすくなります。',
    model_adult: '大人リンクのモデルを選択したモデルへ変更します。追加モデルは「data/Models/Adult」へ.zobjファイルを保存してください。骨格を変更するモデルはゲームプレイへ影響するため、記録を競うレースでは使用できません。',
    model_child: '子供リンクのモデルを選択したモデルへ変更します。追加モデルは「data/Models/Child」へ.zobjファイルを保存してください。骨格を変更するモデルはゲームプレイへ影響するため、記録を競うレースでは使用できません。',
    custom_music_directorypicker: 'OoTR専用の.ootrs形式の音楽ファイル、またはそれらを含むフォルダーを指定します。使用方法はBGM設定で選びます。複数のフォルダーを指定する場合は入力欄へドラッグしてください。',
  };
  for (const [key, tooltip] of Object.entries(standardTooltipOverrides)) {
    locale.settings[key].tooltip = tooltip;
  }

  locale.settings.allowed_tricks.options.logic_adult_kokiri_gs_hovers.tooltip =
    '木の根の一つからホバーブーツで飛び移れば、フックショットなしでも黄金のスタルチュラを倒せます。<br><br>上級ロジックでは常に使用可能として扱われます。';
  locale.settings.allowed_tricks.options.logic_adult_kokiri_gs_nothing.tooltip =
    '木の根から精密に飛び移れば、フックショットなしでも黄金のスタルチュラを倒せます。';
  locale.settings.allowed_tricks.options.logic_dmt_climb_hovers.tooltip =
    'ホバーブーツを使えば、デスマウンテン山頂への道を塞ぐ岩を壊さずに越えられます。';
  locale.settings.allowed_tricks.options.logic_grottos_without_agony.tooltip =
    'もだえ石を持っていなくても隠し穴へ入れるものとして扱います。';
  locale.settings.allowed_tricks.options.logic_mido_backflip.tooltip =
    '位置と角度を正確に合わせてバク転し、ミドを飛び越えます。';
  locale.settings.allowed_tricks.options.logic_fire_mq_maze_jump.tooltip =
    '木箱から正確にジャンプし、フックショットの的を出現させずに上段の迷路へ登ります。この項目は、ホバーブーツで上段へ登る方法と、木箱なしで脇部屋へ入る方法の両方を含みます。';
  locale.settings.allowed_tricks.options.logic_fire_mq_flame_maze.tooltip =
    '炎の壁が立ち上がる前に素早く端を抜けます。より正確に動けばダメージも受けません。時の歌やホバーブーツなしで脇部屋の黄金のスタルチュラへ到達でき、関連する上段迷路の項目も有効ならフックショットなしで奥へ進めます。';
  locale.settings.allowed_tricks.options.logic_shadow_statue.tooltip =
    '谷の縁に沿ってボムチュウを走らせ、弓を使わずに像を倒します。表・裏どちらの闇の神殿にも適用されます。';
  locale.settings.allowed_tricks.options.logic_lens_shadow_mq.tooltip =
    '裏・闇の神殿の大部分を、まことのメガネなしで攻略できるものとして扱います。透明な足場、透明な刃の部屋の銀ルピー、2体目のデドハンド、ボンゴボンゴには個別の設定があります。';
  locale.settings.allowed_tricks.options.logic_lens_shadow_mq_invisible_blades.tooltip =
    '裏・闇の神殿の透明な刃の部屋で、まことのメガネやネールの愛を使わずに銀ルピーを集めます。';
  locale.settings.allowed_tricks.options.logic_spirit_mq_lower_adult.tooltip =
    '正確な位置からディンの炎を1回使い、2つの燭台へ同時に点火します。これにより、ディンの炎だけで制限時間内に3つすべての燭台へ点火できます。';
  locale.settings.advanced_allowed_tricks.options.glitch_hess.tooltip =
    'HESS（ハイパー・エクステンデッド・スーパースライド）で障害物を通過します。通常のスーパースライドと必要アイテムは同じですが、途中で方向を変えられるため、到達できる場所が増えます。';
  locale.settings.advanced_allowed_tricks.options.glitch_tcg_suns.tooltip =
    '太陽の歌を使った「しまう動作によるOI」でカギを買い続け、宝箱屋の最後の宝箱へ到達します。入口側からカギを追加購入できないため、宝箱屋のカギがシャッフルされている場合は使用できません。';
  locale.settings.advanced_allowed_tricks.options.adv_kd_chus.tooltip =
    'タイミングよくバク転しながらボムチュウを取り出すことで、大人でもボムチュウだけでキングドドンゴを倒せます。';
  locale.settings.advanced_allowed_tricks.options.glitch_forest_basement_gs.tooltip =
    '森の神殿の地下から、宝箱を起点にホバーして黄金のスタルチュラへ到達します。一般的なホバーとは別項目として扱われます。';
  locale.settings.advanced_allowed_tricks.options.glitch_fire_block_skip.tooltip =
    '炎の神殿のショートカットが有効な場合と同様の条件で、バクダンまたはボムチュウを使ってブロックを抜け、ショートカット側へ移動します。';
  locale.settings.advanced_allowed_tricks.options.glitch_shadow_bk_skip_boat_key.tooltip =
    'HESSまたはスーパースライドを使い、デドハンド部屋からボス前のロード地点へ直接移動します。どちらもバクダンとホバーブーツが必要です。';
  locale.settings.advanced_allowed_tricks.options.glitch_dot_skip_adult_hovers_bgs.tooltip =
    '大人でダイゴロン刀とホバーブーツを装備し、しゃがみ突きを3回使って時の扉を抜けます。巨人のナイフでも可能ですが、進行アイテムの上書きを避けるためロジック上はダイゴロン刀が必要です。';
  locale.settings.advanced_allowed_tricks.options.glitch_zr_lw_child_mega.tooltip =
    '子供で橋から迷いの森の入口へメガフリップし、ナビダイブや銀のウロコを使わずに移動します。';
  locale.settings.advanced_allowed_tricks.options.adv_tektite_hp_rang.tooltip =
    '装備入れ替えを使わない単独のグリッチなしロジックでは子供のみ、装備入れ替えが有効なら子供と大人の両方で使用できます。';
  locale.settings.advanced_allowed_tricks.options.adv_ice_push_block_silver.tooltip =
    '従来必要だったあきビンの代わりに青い炎の矢を活用し、グリッチなしで氷の洞窟を進みます。';
  locale.settings.advanced_allowed_tricks.options.glitch_fire_trial_pillar_silver.tooltip =
    '金のグローブを使わずに、ブロックの下の銀ルピーを取得します。ホバーブーツは必須ではありませんが、使うと簡単になる手順もあります。';

  fs.writeFileSync(localePath, `${JSON.stringify(locale, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({
    locations: locations.options.length,
    logicTooltips: 371,
    standardTooltips: standardTooltipEntries.length,
  }, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
