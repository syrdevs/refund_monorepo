export default {
  required: (value: any, allValues?: any, props?: any, name?: any) => {
    let valid = false

    if (Array.isArray(value)) {
      valid = value.length > 0
    } else {
      valid = !!value
    }

    return valid ? undefined : 'Обязательное поле'
  },
}
