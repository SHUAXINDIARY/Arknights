export const data = {
  "title": "明日方舟趣味博士测试",
  "description": "回答以下问题，看看你是哪一类博士吧！",
  "questions": [
    {
      "id": 1,
      "text": "作为博士，你在作战时最关注的是什么？",
      "options": [
        {
          "id": "A",
          "text": "干员的站位要精确，容错率最低。",
          "type": "rational"
        },
        { "id": "B", "text": "队伍输出爆炸，最好能一波清图。", "type": "edgy" },
        { "id": "C", "text": "想办法苟到最后，能赢就行。", "type": "casual" },
        {
          "id": "D",
          "text": "用最喜欢的干员上场，胜负其次。",
          "type": "chaotic"
        }
      ]
    },
    {
      "id": 2,
      "text": "如果只能带一类干员去作战，你会选？",
      "options": [
        { "id": "A", "text": "先锋 → 资源就是胜利的开端", "type": "rational" },
        { "id": "B", "text": "狙击 → 稳定远程火力覆盖", "type": "edgy" },
        { "id": "C", "text": "重装 → 稳扎稳打，铁壁前行", "type": "casual" },
        {
          "id": "D",
          "text": "辅助/术师 → 用buff/debuff打出骚操作",
          "type": "chaotic"
        }
      ]
    },
    {
      "id": 3,
      "text": "活动来了，你最常见的心态是？",
      "options": [
        { "id": "A", "text": "先抄作业，效率优先。", "type": "rational" },
        { "id": "B", "text": "尝试打出自己的原创解。", "type": "edgy" },
        { "id": "C", "text": "只冲剧情/皮肤，关卡随缘。", "type": "casual" },
        { "id": "D", "text": "等别人喊“抄作业了”才开始动。", "type": "chaotic" }
      ]
    },
    {
      "id": 4,
      "text": "对于剧情里的罗德岛，你觉得它更像？",
      "options": [
        { "id": "A", "text": "军事公司 → 利益与战力至上", "type": "rational" },
        {
          "id": "B",
          "text": "游牧民族 → 哪里有感染者，就去支援",
          "type": "edgy"
        },
        { "id": "C", "text": "乌托邦 → 相信大家能找到未来", "type": "casual" },
        {
          "id": "D",
          "text": "船上大家庭 → 有点混乱，但挺温馨",
          "type": "chaotic"
        }
      ]
    },
    {
      "id": 5,
      "text": "你最喜欢哪类干员立绘风格？",
      "options": [
        { "id": "A", "text": "战术感浓厚的机能风", "type": "rational" },
        { "id": "B", "text": "中二、酷帅、暗黑风", "type": "edgy" },
        { "id": "C", "text": "可爱、温柔、治愈系", "type": "casual" },
        { "id": "D", "text": "奇怪/独特/实验性设计", "type": "chaotic" }
      ]
    }
  ],
  "results": {
    "rational": {
      "title": "理性派博士",
      "description": "你像凯尔希一样，追求精确与效率，计划周密，战术至上。你可能是朋友中‘最佳攻略搬运员’。"
    },
    "edgy": {
      "title": "中二派博士",
      "description": "你享受极限操作和爆发感，喜欢挑战模式，和陈、W这类干员最合拍。你玩游戏就是要爽！"
    },
    "casual": {
      "title": "养老派博士",
      "description": "你玩游戏更像在养老院：随缘、不急、慢慢体验剧情。你和阿米娅、芙兰卡这类有温度的干员关系最好。"
    },
    "chaotic": {
      "title": "随缘派博士",
      "description": "你喜欢用奇怪阵容过关，享受实验的乐趣。你在罗德岛里属于‘灵魂画手+气氛组’，和迷迭香、傀影很投缘。"
    }
  }
}
