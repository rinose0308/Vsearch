export type VTuberGroup = "ホロライブ" | "にじさんじ" | "VShojo" | "個人勢" | "ぶいすぽっ！" | "NIJISANJI EN";

export type VTuberTag =
  | "歌"
  | "ゲーム"
  | "雑談"
  | "料理"
  | "お絵描き"
  | "ASMR"
  | "英語"
  | "ホラー"
  | "音楽";

export interface VTuberEntry {
  channelId: string;
  name: string;
  group: VTuberGroup;
  tags: VTuberTag[];
}

export const VTUBERS: VTuberEntry[] = [
  // ホロライブ
  { channelId: "UCp6993wxpyDPHUpavwDFqgg", name: "博衣こより", group: "ホロライブ", tags: ["雑談", "ゲーム"] },
  { channelId: "UCdn5BQ06XqgXoAxIhbqw5Rg", name: "兎田ぺこら", group: "ホロライブ", tags: ["ゲーム", "雑談"] },
  { channelId: "UC1DCedRgGHBdm81E1llLhOQ", name: "百鬼あやめ", group: "ホロライブ", tags: ["歌", "雑談"] },
  { channelId: "UCQ0UDLQCjY0rmuxCDE38FGg", name: "湊あくあ", group: "ホロライブ", tags: ["ゲーム", "歌"] },
  { channelId: "UCyl1z3jo3XHR1riLFKG5UAg", name: "白上フブキ", group: "ホロライブ", tags: ["ゲーム", "歌", "雑談"] },
  { channelId: "UCa9Y57gfeY0Zro_noHRVrnw", name: "宝鐘マリン", group: "ホロライブ", tags: ["雑談", "歌", "お絵描き"] },
  { channelId: "UC5CwaMl1eIgY8h02uZw7u8A", name: "不知火フレア", group: "ホロライブ", tags: ["ゲーム", "歌"] },
  { channelId: "UCvzGlP9oQwU--Y0r9id_jnA", name: "角巻わため", group: "ホロライブ", tags: ["歌", "雑談"] },
  { channelId: "UCs9_O1tRPMQTHQ-N_L6FU2g", name: "戌神ころね", group: "ホロライブ", tags: ["ゲーム", "雑談"] },
  { channelId: "UCZlDXzGoo7d44bwdNObFacg", name: "常闇トワ", group: "ホロライブ", tags: ["ゲーム", "歌"] },
  { channelId: "UCUZ5AlC3rTlM-rA2cj5RP6w", name: "ラプラス・ダークネス", group: "ホロライブ", tags: ["ゲーム", "歌"] },
  { channelId: "UCENwRMx5Yh42zWpzURebzTw", name: "鷹嶺ルイ", group: "ホロライブ", tags: ["料理", "雑談"] },
  { channelId: "UC6eWCld0KwmyHFbAqK3V-Rw", name: "海洋ファウナ", group: "ホロライブ", tags: ["ASMR", "ゲーム", "英語"] },
  { channelId: "UCO_aKKYxn4tvrqPjcTzZ6EQ", name: "博衣こより", group: "ホロライブ", tags: ["雑談", "ゲーム"] },

  // にじさんじ
  { channelId: "UCjXBuHmPYzgDysgg8QMpH3A", name: "月ノ美兎", group: "にじさんじ", tags: ["雑談", "ゲーム"] },
  { channelId: "UC0YaFGSMo9XZ4Gwj2cFKnKw", name: "葛葉", group: "にじさんじ", tags: ["ゲーム"] },
  { channelId: "UCgWqfdbYHQP8LBT7L71wblw", name: "叶", group: "にじさんじ", tags: ["ゲーム"] },
  { channelId: "UC9mf_ZVpouoILRY9NUIaK-w", name: "剣持刀也", group: "にじさんじ", tags: ["雑談", "ゲーム"] },
  { channelId: "UCvInZx9h3jSpiVNKMdaGGGg", name: "椎名唯华", group: "にじさんじ", tags: ["雑談"] },
  { channelId: "UCAWSdLFdFB30HOc7DI1iipg", name: "黛灰", group: "にじさんじ", tags: ["ゲーム", "音楽"] },
  { channelId: "UCF9JSqD_A2F9NpSqkj2S5Rw", name: "笹木咲", group: "にじさんじ", tags: ["ゲーム", "雑談"] },

  // ぶいすぽっ！
  { channelId: "UCNEZSqxYtHOBdILJNiIL7cg", name: "橘ひなの", group: "ぶいすぽっ！", tags: ["ゲーム"] },
  { channelId: "UCQEt3HF4_h8HmZVYw66mQfA", name: "花芽すみれ", group: "ぶいすぽっ！", tags: ["ゲーム", "歌"] },
  { channelId: "UCK8kkpRetGbGrn7aN7y7_eg", name: "一ノ瀬うるは", group: "ぶいすぽっ！", tags: ["ゲーム", "歌"] },
  { channelId: "UCVj9NG2Eg3tFvAERmHa_0cg", name: "兎咲ミミ", group: "ぶいすぽっ！", tags: ["ゲーム"] },

  // 個人勢
  { channelId: "UCu2-Jnf7GS3_RqeEJVpJsXQ", name: "フィリップ", group: "個人勢", tags: ["ゲーム", "英語"] },
  { channelId: "UCabcTSfRHos0rXBncM0AFAQ", name: "天開司", group: "個人勢", tags: ["ゲーム", "雑談"] },
];

export const ALL_GROUPS: VTuberGroup[] = [
  "ホロライブ",
  "にじさんじ",
  "ぶいすぽっ！",
  "個人勢",
  "VShojo",
  "NIJISANJI EN",
];

export const ALL_TAGS: VTuberTag[] = [
  "ゲーム",
  "歌",
  "雑談",
  "ASMR",
  "お絵描き",
  "料理",
  "英語",
  "ホラー",
  "音楽",
];
