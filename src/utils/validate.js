/**
 * 验证验证码
 */
export function validateEmail(value) {
  let reg = /^[a-z0-9]{6}$/
  // if (!reg.test(value)) {
  //   return true
  // } else {
  //   return false
  // }
  // 三元运算
  return !reg.test(value) ? true : false
}
