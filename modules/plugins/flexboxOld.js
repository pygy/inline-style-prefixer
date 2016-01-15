const alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple',
  flex: 'box',
  'inline-flex': 'inline-box'
}

const alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
}

const properties = Object.keys(alternativeProps).concat(['alignContent', 'alignSelf', 'display', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection']).reduce((result, prop) => ({...result, [prop]: true}), {})


export default function flexboxOld(pluginInterface) {
  const {property, value, styles, browserInfo, prefix, keepUnprefixed, forceRun} = pluginInterface
  const {browser, version} = browserInfo

  if (
    properties[property] &&
    (
    forceRun ||
    browser === 'firefox' && version < 22 ||
    browser === 'chrome' && version < 21 ||
    (browser === 'safari' || browser === 'ios_saf') && version <= 6.1 ||
    browser === 'android' && version < 4.4 ||
    browser === 'and_uc'
    )
  ) {
    if (!keepUnprefixed) {
      delete styles[property]
    }
    if (property === 'flexDirection') {
      return {
        WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
        WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
      }
    }
    if (property === 'display' && alternativeValues[value]) {
      return {
        display: prefix.css + alternativeValues[value] + (keepUnprefixed ? ';' + property + ':' + value : '')
      }
    }
    if (alternativeProps[property]) {
      return {
        [alternativeProps[property]]: alternativeValues[value] || value
      }
    }
    if (alternativeValues[value]) {
      return {
        [property]: alternativeValues[value] + (keepUnprefixed ? ';' + property + ':' + value : '')
      }
    }
  }
}
