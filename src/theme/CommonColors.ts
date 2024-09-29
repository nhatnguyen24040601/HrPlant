import {ThemeName} from 'utils/enum';

export const ColorsLightTheme: IColors = {
    transparent: 'transparent',

    white: '#ffffff',
    white1: '#ffffff25',

    black: '#000000',
    black1: '#333342',

    grey1: '#666C7E',
    grey2: '#EDEDED',
    grey3: '#F3F6F5',
    grey4: '#E3E6EC',
    grey5: '#8C8C8C',
    grey6: '#F1F4F9',
    grey7: '#E4E8F1',
    grey8: '#8B95AA',
    grey9: '#78797E',
    grey10: '#D9D9D9',
    grey11: '#414146',
    grey12: '#F6F6F6',
    grey13: '#D3D7E0',
    grey14: '#EDEFEE',
    grey15: '#F1F1F1',
    grey16: '#DCDCDC',
    grey17: '#FCFCFC',

    green1: '#0FAE7F',
    green2: '#063927',
    green3: '#F1FDF6',
    green4: '#40BE6B',
    green5: '#D8FFF4',
    green6: '#19D79E',
    green7: '#10211B',
    green8: '#F3FDF8',
    green9: '#BAFFD6',
    green10: '#205F44',
    green11: '#3AAB53',
    green12: '#67D6B5',

    blue1: '#142F53',
    blue2: '#F3F8FF',
    blue3: '#2D7CE5',
    blue4: '#2E78F5',
    blue5: '#0756FF',

    red1: '#F64949',
    red2: '#DD4242',
    red3: '#FFF1F1',
    red4: '#FFFCF8',
    red5: '#7B2424',

    purple1: '#5543C5',
    purple2: '#F4F2FF',

    yellow1: '#E08907',
    yellow2: '#FFF8DF',
    yellow3: '#E4AF0B',
    yellow4: '#FFECA9',
    yellow5: '#FEF2C7',

    brown1: '#CD8032',
    brown2: '#DA9755',

    pink: '#FFC1C1',
};

export const ColorsDarkTheme: IColors = {
    transparent: 'transparent',

    white: '#000000',
    white1: '#ffffff25',

    black: '#ffffff',
    black1: '#333342',

    grey1: '#666C7E',
    grey2: '#EDEDED',
    grey3: '#F3F6F5',
    grey4: '#E3E6EC',
    grey5: '#8C8C8C',
    grey6: '#F1F4F9',
    grey7: '#E4E8F1',
    grey8: '#8B95AA',
    grey9: '#78797E',
    grey10: '#D9D9D9',
    grey11: '#414146',
    grey12: '#F6F6F6',
    grey13: '#D3D7E0',
    grey14: '#EDEFEE',
    grey15: '#F1F1F1',
    grey16: '#DCDCDC',
    grey17: '#FCFCFC',

    green1: '#0FAE7F',
    green2: '#063927',
    green3: '#F1FDF6',
    green4: '#40BE6B',
    green5: '#D8FFF4',
    green6: '#19D79E',
    green7: '#10211B',
    green8: '#F3FDF8',
    green9: '#BAFFD6',
    green10: '#205F44',
    green11: '#3AAB53',
    green12: '#67D6B5',

    blue1: '#142F53',
    blue2: '#F3F8FF',
    blue3: '#2D7CE5',
    blue4: '#2E78F5',
    blue5: '#0756FF',

    red1: '#F64949',
    red2: '#DD4242',
    red3: '#FFF1F1',
    red4: '#FFFCF8',
    red5: '#7B2424',

    purple1: '#5543C5',
    purple2: '#F4F2FF',

    yellow1: '#E08907',
    yellow2: '#FFF8DF',
    yellow3: '#E4AF0B',
    yellow4: '#FFECA9',
    yellow5: '#FEF2C7',

    brown1: '#CD8032',
    brown2: '#DA9755',

    pink: '#FFC1C1',
};

export interface IColors {
    transparent: string;

    white: string;
    white1: string;

    black: string;
    black1: string;

    grey1: string;
    grey2: string;
    grey3: string;
    grey4: string;
    grey5: string;
    grey6: string;
    grey7: string;
    grey8: string;
    grey9: string;
    grey10: string;
    grey11: string;
    grey12: string;
    grey13: string;
    grey14: string;
    grey15: string;
    grey16: string;
    grey17: string;

    green1: string;
    green2: string;
    green3: string;
    green4: string;
    green5: string;
    green6: string;
    green7: string;
    green8: string;
    green9: string;
    green10: string;
    green11: string;
    green12: string;

    blue1: string;
    blue2: string;
    blue3: string;
    blue4: string;
    blue5: string;

    red1: string;
    red2: string;
    red3: string;
    red4: string;
    red5: string;

    purple1: string;
    purple2: string;

    yellow1: string;
    yellow2: string;
    yellow3: string;
    yellow4: string;
    yellow5: string;

    brown1: string;
    brown2: string;

    pink: string;
}

class CTheme {
    currentTheme: ThemeName = ThemeName.LIGHT;
    setTheme(theme: ThemeName) {
        this.currentTheme = theme;
    }
}

const colorInstance = new CTheme();
export {colorInstance};

export function getColors() {
    return colorInstance.currentTheme === ThemeName.DARK ? ColorsDarkTheme : ColorsLightTheme;
}

declare module 'styled-components' {
    export interface DefaultTheme extends IColors {}
}
