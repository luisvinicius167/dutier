export default handler => {
  return new Promise((resolve, reject) => {
    handler(resolve)
  })
}