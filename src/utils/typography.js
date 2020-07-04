import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

const $backgroundColor = 'white'
const $fontColor = '#333'

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 600,
    },
    h1: {},
    img: {
      background: '#fff',
      padding: '5px',
    },
    body: {
      backgroundColor: $backgroundColor,
      color: $fontColor,
      fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif',
      fontWeight: 400,
      fontStyle: 'normal',
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
