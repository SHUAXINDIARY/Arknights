/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 获取角色、皮肤国际化文案
 * 1. 当前目录 git clone https://github.com/ArknightsAssets/ArknightsGamedata 
 * 2. 执行该文件
 */
import { EnCareer, Gender, JpCareer } from '../src/data/NameAvatar'
import * as ZH from './gameData/cn/gamedata/excel/character_table.json'
import * as EN from './gameData/en/gamedata/excel/character_table.json'
import * as JP from './gameData/jp/gamedata/excel/character_table.json'

import * as ZH_SKIN from './gameData/cn/gamedata/excel/skin_table.json'
import * as EN_SKIN from './gameData/en/gamedata/excel/skin_table.json'
import * as JP_SKIN from './gameData/jp/gamedata/excel/skin_table.json'

export const saveOperator = (memberNameAvatarMap) => {
    const data = [] as any[];
    const ZH_KEYS = Object.keys(ZH);
    memberNameAvatarMap.forEach(item => {
        const [key] = ZH_KEYS.filter(key => ZH[key].name === item.name)
        const baseData = ZH[key];
        if (baseData) {
            data.push({
                keyName: key,
                enName: EN?.[key]?.name || '',
                jpName: JP?.[key]?.name || '',
                // @ts-ignore
                enCareer: EnCareer[item.career],
                // @ts-ignore
                jpCareer: JpCareer[item.career],
                // @ts-ignore
                enSex: item.sex === Gender.Female ? 'Female' : 'Male',
                // @ts-ignore
                jpSex: item.sex,
                ...item
            })
        }
    })

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
    return data
}

export const saveSkin = (_skinList) => {
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

    return result
}
