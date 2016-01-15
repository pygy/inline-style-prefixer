import calc from './plugins/calc'
import cursor from './plugins/cursor'
import flex from './plugins/flex'
import sizing from './plugins/sizing'
import gradient from './plugins/gradient'

// special flexbox specifications
import flexboxIE from './plugins/flexboxIE'
import flexboxOld from './plugins/flexboxOld'

export default [
  calc,
  cursor,
  sizing,
  gradient,
  flexboxIE,
  flexboxOld,
  // this must be run AFTER the flexbox specs
  flex
]
