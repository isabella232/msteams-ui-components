import { style } from 'typestyle';
import { chooseStyle, Context } from '../context';
import { getReturnType } from '../get-return-type';

export interface TabColors {
  text: string;
  underline: string;
  textActive: string;
  containerUnderline: string;
  hoverUnderline: string;
  focus: string;
  focusBg: string;
}

// tslint:disable-next-line:variable-name
export const _extractingTabStyles = getReturnType(base);
export type TabStyles = typeof _extractingTabStyles;

function base(context: Context, colors: TabColors) {
  const { rem, spacing } = context;
  const containerClass = style({
    width: '100%',
    borderBottom: `${rem(0.1)} solid ${colors.containerUnderline}`,
    padding: 0,
    margin: 0,
  });

  const normalClass = style({
    $nest: {
      [`.${containerClass} &`]: {
        outline: 'none',
        background: 0,
        border: 0,
        font: 'inherit',
        margin: 0,
        marginRight: rem(2),
        padding: `${spacing.xxxSmall} ${spacing.xSmall}`,
        cursor: 'pointer',
        display: 'inline-block',
        borderBottom: `transparent ${rem(0.4)} solid`,
        color: colors.text,
        $nest: {
          '&:last-child': {
            marginRight: 0,
          },
          '&:hover': {
            borderBottomColor: colors.hoverUnderline,
          },
          '&:focus': {
            borderBottomColor: colors.focusBg,
            color: colors.focus,
            backgroundColor: colors.focusBg,
          },
        },
      },
    },
  });

  return {
    container: containerClass,
    normal: normalClass,
    active: style({
      $nest: {
        [`.${containerClass} &`]: {
          borderBottomColor: colors.underline,
          color: colors.textActive,
        },
      },
    }),
  };
}

function light(context: Context) {
  const { colors } = context;
  return base(context, {
    text: colors.light.gray02,
    textActive: colors.light.brand00,
    underline: colors.light.brand00,
    containerUnderline: colors.light.gray12,
    hoverUnderline: colors.light.brand00SemiTransparent,
    focus: colors.light.white,
    focusBg: colors.light.brand00,
  });
}

function dark(context: Context) {
  const { colors } = context;
  return base(context, {
    text: colors.dark.gray02,
    textActive: colors.dark.brand00,
    underline: colors.dark.brand00,
    containerUnderline: colors.dark.gray12,
    hoverUnderline: colors.dark.brand00SemiTransparent,
    focus: colors.dark.white,
    focusBg: colors.dark.brand00Light,
  });
}

function highContrast(context: Context) {
  const { colors } = context;
  return base(context, {
    text: colors.highContrast.white,
    textActive: colors.highContrast.white,
    underline: colors.highContrast.blue,
    containerUnderline: colors.highContrast.green,
    hoverUnderline: colors.highContrast.yellow,
    focus: colors.highContrast.black,
    focusBg: colors.highContrast.yellow,
  });
}

export function tab(context: Context) {
  return chooseStyle(context, light, dark, highContrast);
}
