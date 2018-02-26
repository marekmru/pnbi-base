import { uniqWith } from 'rambda'
export function tranformInConfig (config) {
  // config.targetGroupVariablesMod
  // console.time('targetGroupVariablesMod')
  const targetGroupVariablesFlat = []
  const targetGroupVariablesMod = config.targetGroupVariables.map(val => {
    val.Values = val.Values.map(val2 => {
      targetGroupVariablesFlat.push(
        Object.assign(val2, {group: val.Variable})
      )
      const source = val.Values.filter(
        val3 => val3.Pseudo_Variable_Name === val2.Pseudo_Variable_Name
      ).map(name => {
        return {
          Values: name.Values,
          Value_Code: name.Value_Code
        }
      })
      return {
        Pseudo_Variable_Name: val2.Pseudo_Variable_Name,
        Variable_Name: val2.Variable_Name,
        Variable: val2.Variable,
        Auswahltyp: val2.Auswahltyp,
        source
      }
    })
    val.Values = uniqWith(
      (x, y) => x.Pseudo_Variable_Name === y.Pseudo_Variable_Name,
      val.Values
    )
    return val
  })
  const targetGroupVariablesModResult = []
  targetGroupVariablesMod.forEach(
    val => {
      targetGroupVariablesModResult.push({header: val.Variable})
      val.Values.forEach(val2 => {
        targetGroupVariablesModResult.push({Variable: val2.Variable, group: val.Variable, Pseudo_Variable_Name: val2.Pseudo_Variable_Name, Auswahltyp: val2.Auswahltyp, disabled: false, source: val2.source})
      })
      targetGroupVariablesModResult.push({ divider: true })
    }
  )
  config.targetGroupVariablesMod = targetGroupVariablesModResult
  config.targetGroupVariablesFlat = targetGroupVariablesFlat
  // console.timeEnd('targetGroupVariablesMod')
  return config
}
export default {
  tranformInConfig
}
