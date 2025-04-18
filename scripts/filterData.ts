/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 获取角色、皮肤国际化文案
 * 1. 当前目录 git clone https://github.com/ArknightsAssets/ArknightsGamedata 
 * 2. 执行该文件
 */
import { EnCareer, Gender, JpCareer, memberNameAvatarMap } from '../src/data/NameAvatar'
import * as ZH from './gameData/cn/gamedata/excel/character_table.json'
import * as EN from './gameData/en/gamedata/excel/character_table.json'
import * as JP from './gameData/jp/gamedata/excel/character_table.json'
// @ts-ignore
import fs from 'fs'

import * as ZH_SKIN from './gameData/cn/gamedata/excel/skin_table.json'
import * as EN_SKIN from './gameData/en/gamedata/excel/skin_table.json'
import * as JP_SKIN from './gameData/jp/gamedata/excel/skin_table.json'
import { skinList as _skinList } from '../src/data/Skin'

const saveOperator = () => {
    const data = [] as any[];
    for (const key in ZH) {
        const item = ZH[key]
        const [baseData] = memberNameAvatarMap.filter(_item => _item.name === item.name)
        if (baseData) {
            data.push({
                keyName: key,
                enName: EN?.[key]?.name || '',
                jpName: JP?.[key]?.name || '',
                // @ts-ignore
                enCareer: EnCareer[baseData.career],
                // @ts-ignore
                jpCareer: JpCareer[baseData.career],
                // @ts-ignore
                enSex: baseData.sex === Gender.Female ? 'Female' : 'Male',
                // @ts-ignore
                jpSex: baseData.sex,
                ...baseData
            })
        }

    };

    memberNameAvatarMap.forEach(item => {
        const res = data.find(_item => _item.name === item.name)
        if (!res) {
            let member = {
                ...item,
                enCareer: EnCareer[item.career],
                jpCareer: JpCareer[item.career],
                enSex: item.sex === Gender.Female ? 'Female' : 'Male',
                jpSex: item.sex,
            } as Record<string, any>
            if (item.name.includes('阿米娅')) {
                const amiya = data.find(_item => _item.name === '阿米娅')
                member = {
                    ...member,
                    enName: `${amiya.enName}(${member.enCareer})`,
                    jpName: `${amiya.jpName}(${member.jpCareer})`,
                }
            }
            data.push(member)
        }
    })


    fs.writeFileSync('./memberRes.js', `const memberNameAvatarMap = ${JSON.stringify(data)}`)
}

const saveSkin = () => {
    const getKey = (skinNameParams: string) => {
        for (const key in ZH_SKIN.charSkins) {
            const item = ZH_SKIN.charSkins[key]
            const { skinName } = item?.displaySkin || {}
            if (skinName?.includes?.(skinNameParams)) {
                return key
            }
        }
    }
    const result = _skinList.map(item => {
        const key = getKey(item.skinName)
        const enSkinName = key ? EN_SKIN.charSkins[key]?.displaySkin?.skinName : ''
        const jpSkinName = key ? JP_SKIN.charSkins[key]?.displaySkin?.skinName : ''
        return {
            ...item,
            enSkinName,
            jpSkinName
        }
    })
    fs.writeFileSync('./skinData.js', `const _skinList = ${JSON.stringify(result)}`)

}
saveSkin()